import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  Modal,
  ActivityIndicator,
  Platform,
  ScrollView,
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Import custom components and styles
import SafeAreaWrapper from '../../components/common/SafeAreaWrapper';
import { useLocation } from '../../hooks/useLocation';
import theme from '../../styles/theme';
import { mapStyles } from '../../styles/components/mapStyles';
import { globalStyles } from '../../styles/globalStyles';

const Maps = () => {
  // State management
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
  const [destination, setDestination] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showRouteOptions, setShowRouteOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tripCompleted, setTripCompleted] = useState(false);
  const [navigationPhase, setNavigationPhase] = useState('search');
  const [showingAlternateRoutes, setShowingAlternateRoutes] = useState(false);

  const mapRef = useRef(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  
  // Custom hooks
  const { location: currentLocation, getCurrentLocation } = useLocation();

  // Debug mode - set to false to disable all console logs
  const DEBUG_MODE = false;

  const debugLog = (message, data = null) => {
    if (DEBUG_MODE) {
      console.log(message, data || '');
    }
  };

  // Update region when current location changes
  useEffect(() => {
    if (currentLocation) {
      setRegion({
        ...currentLocation,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [currentLocation]);

  // Debounced search
  const debouncedSearch = (query) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      searchPlaces(query);
    }, 800);

    setSearchTimeout(timeout);
  };

  const searchPlaces = async (query) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1&countrycodes=&dedupe=1`,
        {
          method: 'GET',
          headers: {
            'User-Agent': 'WayWatch_V2.0/1.0.0',
            'Accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.9',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Invalid response format');
      }

      const results = data
        .map((item) => ({
          id: item.place_id || Math.random().toString(),
          name: item.display_name || 'Unknown location',
          shortName: item.display_name ? item.display_name.split(',')[0] : 'Unknown location',
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.lon),
        }))
        .filter((item) => !isNaN(item.latitude) && !isNaN(item.longitude));

      setSearchResults(results);
      setShowSearchResults(true);
    } catch (error) {
      debugLog('Search error:', error);

      try {
        await fallbackSearch(query);
      } catch (fallbackError) {
        debugLog('Fallback search failed:', fallbackError);
        Alert.alert('Search Error', 'Unable to search locations. Please check your internet connection and try again.');
        setSearchResults([]);
        setShowSearchResults(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const fallbackSearch = async (query) => {
    const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`, {
      method: 'GET',
      headers: {
        'User-Agent': 'WayWatch_V2.0/1.0.0',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Fallback HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.features || !Array.isArray(data.features)) {
      throw new Error('Invalid fallback response format');
    }

    const results = data.features
      .map((item) => ({
        id: item.properties.osm_id || Math.random().toString(),
        name: item.properties.name || item.properties.street || 'Unknown location',
        shortName: item.properties.name || item.properties.street || 'Unknown location',
        latitude: item.geometry.coordinates[1],
        longitude: item.geometry.coordinates[0],
      }))
      .filter((item) => !isNaN(item.latitude) && !isNaN(item.longitude));

    setSearchResults(results);
    setShowSearchResults(true);
  };

  // Updated routing function with clean error handling
  const getMultipleRoutes = async (start, end) => {
    try {
      setLoading(true);

      // Try GraphHopper first (silent failure)
      const graphHopperSuccess = await getRoutesFromGraphHopper(start, end);
      if (graphHopperSuccess) return;

      // Try Valhalla as fallback (silent failure)
      const valhallaSuccess = await getRoutesFromValhalla(start, end);
      if (valhallaSuccess) return;

      // Final fallback: Create a simple straight-line route
      createStraightLineRoute(start, end);

    } catch (error) {
      debugLog('General Route error:', error);
      Alert.alert('Error', 'Failed to get routes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // GraphHopper routing with silent error handling
  const getRoutesFromGraphHopper = async (start, end) => {
    try {
      const graphHopperUrl = `https://graphhopper.com/api/1/route?point=${start.latitude},${start.longitude}&point=${end.latitude},${end.longitude}&vehicle=car&locale=en&calc_points=true&debug=false&elevation=false&points_encoded=false&type=json`;
      
      debugLog('Trying GraphHopper...');

      const response = await fetch(graphHopperUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'WayWatch_V2.0/1.0.0',
        },
      });

      if (!response.ok) {
        debugLog(`GraphHopper unavailable (${response.status}), trying next service...`);
        return false;
      }

      const data = await response.json();

      if (!data.paths || data.paths.length === 0) {
        debugLog('GraphHopper: No routes found, trying next service...');
        return false;
      }

      const route = data.paths[0];
      const coordinates = route.points.coordinates.map((coord) => ({
        latitude: coord[1],
        longitude: coord[0],
      }));

      const processedRoutes = [{
        id: 0,
        coordinates,
        distance: (route.distance / 1000).toFixed(1),
        duration: Math.round(route.time / 60000), // Convert from milliseconds to minutes
        durationWithTraffic: Math.round(route.time / 60000),
        traffic: 'clear',
        routeType: 'Best Route',
        color: theme.colors.primary[500],
        isFastest: true,
        tollFree: true,
      }];

      setRoutes(processedRoutes);
      setSelectedRoute(0);
      setShowRouteOptions(true);
      setNavigationPhase('route-selection');
      setShowingAlternateRoutes(false);

      if (mapRef.current) {
        mapRef.current.fitToCoordinates(coordinates, {
          edgePadding: { top: 100, right: 50, bottom: 350, left: 50 },
          animated: true,
        });
      }

      debugLog('✅ Route loaded successfully via GraphHopper');
      return true;

    } catch (error) {
      debugLog('GraphHopper service unavailable, trying next service...');
      return false;
    }
  };

  // Valhalla routing with silent error handling
  const getRoutesFromValhalla = async (start, end) => {
    try {
      const valhallaUrl = `https://valhalla1.openstreetmap.de/route?json={"locations":[{"lat":${start.latitude},"lon":${start.longitude}},{"lat":${end.latitude},"lon":${end.longitude}}],"costing":"auto","directions_options":{"units":"kilometers"}}`;
      
      debugLog('Trying Valhalla...');

      const response = await fetch(valhallaUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'WayWatch_V2.0/1.0.0',
        },
      });

      if (!response.ok) {
        debugLog(`Valhalla unavailable (${response.status}), using fallback route...`);
        return false;
      }

      const data = await response.json();

      if (!data.trip || !data.trip.legs || data.trip.legs.length === 0) {
        debugLog('Valhalla: No routes found, using fallback route...');
        return false;
      }

      const leg = data.trip.legs[0];
      
      // Decode the shape (polyline)
      const coordinates = decodePolyline(leg.shape);

      const processedRoutes = [{
        id: 0,
        coordinates,
        distance: leg.summary.length.toFixed(1),
        duration: Math.round(leg.summary.time / 60), // Convert from seconds to minutes
        durationWithTraffic: Math.round(leg.summary.time / 60),
        traffic: 'clear',
        routeType: 'Best Route',
        color: theme.colors.primary[500],
        isFastest: true,
        tollFree: true,
      }];

      setRoutes(processedRoutes);
      setSelectedRoute(0);
      setShowRouteOptions(true);
      setNavigationPhase('route-selection');
      setShowingAlternateRoutes(false);

      if (mapRef.current) {
        mapRef.current.fitToCoordinates(coordinates, {
          edgePadding: { top: 100, right: 50, bottom: 350, left: 50 },
          animated: true,
        });
      }

      debugLog('✅ Route loaded successfully via Valhalla');
      return true;

    } catch (error) {
      debugLog('Valhalla service unavailable, using fallback route...');
      return false;
    }
  };

  // Decode polyline function for Valhalla
  const decodePolyline = (encoded) => {
    const points = [];
    let index = 0;
    const len = encoded.length;
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      
      const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      
      const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({
        latitude: lat / 1e6,
        longitude: lng / 1e6,
      });
    }

    return points;
  };

  // Final fallback: Create a straight-line route with estimated time/distance
  const createStraightLineRoute = (start, end) => {
    const coordinates = [start, end];
    
    // Calculate approximate distance using Haversine formula
    const R = 6371; // Earth's radius in km
    const dLat = (end.latitude - start.latitude) * Math.PI / 180;
    const dLon = (end.longitude - start.longitude) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(start.latitude * Math.PI / 180) * Math.cos(end.latitude * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    // Estimate driving time (assuming average speed of 50 km/h)
    const estimatedTime = Math.round((distance / 50) * 60);

    const fallbackRoute = {
      id: 0,
      coordinates,
      distance: distance.toFixed(1),
      duration: estimatedTime,
      durationWithTraffic: estimatedTime,
      traffic: 'unknown',
      routeType: 'Direct Route',
      color: theme.colors.primary[500],
      isFastest: true,
      tollFree: true,
    };

    setRoutes([fallbackRoute]);
    setSelectedRoute(0);
    setShowRouteOptions(true);
    setNavigationPhase('route-selection');
    setShowingAlternateRoutes(false);

    if (mapRef.current) {
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 100, right: 50, bottom: 350, left: 50 },
        animated: true,
      });
    }

    // Only show this alert if no other service worked
    Alert.alert(
      'Limited Route Information', 
      'Detailed routing services are temporarily unavailable. Showing approximate direct route.'
    );
  };

  const selectSearchResult = (result) => {
    setDestination(result);
    setSearchQuery(result.shortName);
    setShowSearchResults(false);
    setSearchResults([]);
    setNavigationPhase('search');

    setRegion({
      latitude: result.latitude,
      longitude: result.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const startRoutePlanning = async () => {
    if (!currentLocation || !destination) {
      Alert.alert('Error', 'Please select a destination');
      return;
    }

    await getMultipleRoutes(currentLocation, destination);
  };

  const handleAlternateRoutes = () => {
    setShowingAlternateRoutes(!showingAlternateRoutes);
  };

  const startNavigation = () => {
    setIsNavigating(true);
    setShowRouteOptions(false);
    setNavigationPhase('navigating');
  };

  const completeTrip = () => {
    setIsNavigating(false);
    setTripCompleted(true);
    setNavigationPhase('completed');
  };

  const resetToSearch = () => {
    setDestination(null);
    setSearchQuery('');
    setRoutes([]);
    setSelectedRoute(0);
    setShowRouteOptions(false);
    setIsNavigating(false);
    setTripCompleted(false);
    setNavigationPhase('search');
    setShowingAlternateRoutes(false);
  };

  const centerOnUser = () => {
    if (currentLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        ...currentLocation,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } else if (!currentLocation) {
      Alert.alert('Location not available', 'Unable to get your current location');
    }
  };

  const RouteOption = ({ route, isSelected, onSelect }) => (
    <TouchableOpacity
      style={[mapStyles.routeOption, isSelected && mapStyles.selectedRouteOption]}
      onPress={() => onSelect(route.id)}
      activeOpacity={0.8}
    >
      <View style={mapStyles.routeHeader}>
        <View style={mapStyles.routeTypeContainer}>
          <View style={[mapStyles.routeColorIndicator, { backgroundColor: route.color }]} />
          <Text style={mapStyles.routeType}>{route.routeType}</Text>
          {route.isFastest && <Text style={mapStyles.fastestBadge}>FASTEST</Text>}
        </View>
        <Text style={mapStyles.routeTime}>{route.durationWithTraffic} min</Text>
      </View>

      <View style={mapStyles.routeDetails}>
        <Text style={mapStyles.routeDistance}>{route.distance} km</Text>
        <View style={mapStyles.routeFeatures}>
          {route.tollFree && <Text style={mapStyles.featureBadge}>Toll-free</Text>}
          <View
            style={[
              mapStyles.trafficIndicator,
              {
                backgroundColor:
                  route.traffic === 'clear' ? theme.colors.trafficClear : 
                  route.traffic === 'light' ? theme.colors.trafficLight : 
                  route.traffic === 'heavy' ? theme.colors.trafficHeavy : theme.colors.neutral[600],
              },
            ]}
          >
            <Text style={mapStyles.trafficText}>
              {route.traffic === 'clear' ? 'Clear' : 
               route.traffic === 'light' ? 'Light traffic' : 
               route.traffic === 'heavy' ? 'Heavy traffic' : 'Unknown'}
            </Text>
          </View>
        </View>
      </View>

      {route.duration !== route.durationWithTraffic && (
        <Text style={mapStyles.normalTime}>{route.duration} min without traffic</Text>
      )}
    </TouchableOpacity>
  );

  const getDisplayedRoutes = () => {
    if (showingAlternateRoutes || routes.length <= 1) {
      return routes;
    }
    return routes.filter((route, index) => index === 0);
  };

  return (
    <SafeAreaWrapper 
      style={mapStyles.container}
      statusBarStyle={navigationPhase === 'navigating' ? 'dark-content' : 'light-content'}
      statusBarBackgroundColor={navigationPhase === 'navigating' ? theme.colors.white : 'transparent'}
      edges={[]}
    >
      {/* Map */}
      <MapView
        ref={mapRef}
        style={mapStyles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsTraffic={isNavigating}
      >
        {currentLocation && (
          <Marker coordinate={currentLocation} title="Your Location" anchor={{ x: 0.5, y: 0.5 }}>
            <View style={mapStyles.currentLocationMarker}>
              <View style={mapStyles.currentLocationDot} />
            </View>
          </Marker>
        )}

        {destination && (
          <Marker coordinate={destination} title="Destination" description={destination.name}>
            <View style={mapStyles.destinationMarker}>
              <Ionicons name="location" size={30} color={theme.colors.error[500]} />
            </View>
          </Marker>
        )}

        {(showingAlternateRoutes ? routes : routes.filter((_, index) => index === selectedRoute)).map((route) => (
          <Polyline
            key={route.id}
            coordinates={route.coordinates}
            strokeColor={route.color}
            strokeWidth={selectedRoute === route.id ? 6 : 4}
            strokeOpacity={selectedRoute === route.id ? 1 : 0.7}
            lineDashPattern={selectedRoute === route.id ? [0] : [5, 5]}
          />
        ))}
      </MapView>

      {/* Search Interface */}
      {navigationPhase === 'search' && (
        <SafeAreaWrapper 
          style={mapStyles.searchContainer}
          edges={['top']}
          backgroundColor={theme.colors.white}
        >
          <Text style={mapStyles.searchTitle}>Search Location</Text>
          <View style={mapStyles.searchBar}>
            <Ionicons name="search" size={20} color={theme.colors.neutral[600]} style={mapStyles.searchIcon} />
            <TextInput
              style={mapStyles.searchInput}
              placeholder="Enter destination"
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                if (text.length >= 3) {
                  debouncedSearch(text);
                } else {
                  setSearchResults([]);
                  setShowSearchResults(false);
                }
              }}
              placeholderTextColor={theme.colors.neutral[500]}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                  setShowSearchResults(false);
                }}
                style={mapStyles.clearButton}
              >
                <Ionicons name="close" size={20} color={theme.colors.neutral[600]} />
              </TouchableOpacity>
            )}
          </View>

          {showSearchResults && (
            <View style={mapStyles.searchResultsContainer}>
              {loading ? (
                <ActivityIndicator size="small" color={theme.colors.primary[500]} style={mapStyles.loader} />
              ) : (
                <FlatList
                  data={searchResults}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity 
                      style={mapStyles.searchResultItem} 
                      onPress={() => selectSearchResult(item)}
                      activeOpacity={0.8}
                    >
                      <MaterialIcons name="place" size={20} color={theme.colors.neutral[600]} />
                      <View style={mapStyles.searchResultTextContainer}>
                        <Text style={mapStyles.searchResultTitle}>{item.shortName}</Text>
                        <Text style={mapStyles.searchResultSubtitle} numberOfLines={1}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  style={mapStyles.searchResultsList}
                />
              )}
            </View>
          )}

          <View style={mapStyles.actionButtonsContainer}>
            <TouchableOpacity style={mapStyles.currentLocationButton} onPress={centerOnUser}>
              <Ionicons name="locate" size={20} color={theme.colors.primary[500]} />
              <Text style={mapStyles.currentLocationText}>Your current location</Text>
            </TouchableOpacity>

            {destination && (
              <TouchableOpacity style={mapStyles.startTripButton} onPress={startRoutePlanning}>
                <Text style={mapStyles.startTripButtonText}>Start Trip</Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaWrapper>
      )}

      {/* Route Selection Interface */}
      {navigationPhase === 'route-selection' && (
        <View style={[mapStyles.routeSelectionContainer, { paddingBottom: theme.layout.safeArea.bottom }]}>
          <SafeAreaWrapper edges={['top']} backgroundColor="transparent">
            <View style={mapStyles.routeSelectionHeader}>
              <TouchableOpacity onPress={resetToSearch} style={globalStyles.backButton}>
                <Ionicons name="arrow-back" size={24} color={theme.colors.primary[500]} />
              </TouchableOpacity>
              <Text style={mapStyles.searchTitle}>Choose Your Route</Text>
            </View>
          </SafeAreaWrapper>

          <ScrollView style={mapStyles.routesList} showsVerticalScrollIndicator={false}>
            {getDisplayedRoutes().map((route) => (
              <RouteOption
                key={route.id}
                route={route}
                isSelected={selectedRoute === route.id}
                onSelect={setSelectedRoute}
              />
            ))}
          </ScrollView>

          <View style={mapStyles.routeButtonsContainer}>
            <TouchableOpacity style={mapStyles.startNavigationButton} onPress={startNavigation}>
              <Text style={mapStyles.startNavigationButtonText}>Start Trip</Text>
            </TouchableOpacity>

            {routes.length > 1 && (
              <TouchableOpacity
                style={[
                  mapStyles.alternateRouteButton, 
                  showingAlternateRoutes && mapStyles.alternateRouteButtonActive
                ]}
                onPress={handleAlternateRoutes}
              >
                <Text
                  style={[
                    mapStyles.alternateRouteButtonText, 
                    showingAlternateRoutes && mapStyles.alternateRouteButtonTextActive
                  ]}
                >
                  {showingAlternateRoutes ? 'Hide Alternatives' : 'Show Alternate Routes'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Navigation Interface */}
      {navigationPhase === 'navigating' && (
        <SafeAreaWrapper 
          style={mapStyles.navigationContainer}
          edges={['top']}
          backgroundColor={theme.colors.white}
        >
          <View style={mapStyles.navigationHeader}>
            <View style={mapStyles.navigationInfo}>
              <Text style={mapStyles.navigationTime}>{routes[selectedRoute]?.durationWithTraffic} min</Text>
              <Text style={mapStyles.navigationDistance}>{routes[selectedRoute]?.distance} km</Text>
            </View>
            <TouchableOpacity onPress={completeTrip} style={mapStyles.endTripButton}>
              <Text style={mapStyles.endTripButtonText}>End Trip</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaWrapper>
      )}

      {/* Trip Completion Interface */}
      {navigationPhase === 'completed' && (
        <View style={[mapStyles.completionContainer, { paddingBottom: theme.layout.safeArea.bottom }]}>
          <SafeAreaWrapper edges={['top']} backgroundColor="transparent">
            <View style={mapStyles.completionContent}>
              <View style={mapStyles.completionIcon}>
                <Ionicons name="checkmark-circle" size={60} color={theme.colors.success[500]} />
              </View>
              <Text style={mapStyles.completionTitle}>Trip Completed!</Text>
              <Text style={mapStyles.completionSubtitle}>You have arrived at your destination</Text>

              <View style={mapStyles.tripSummary}>
                <Text style={mapStyles.tripSummaryText}>Distance: {routes[selectedRoute]?.distance} km</Text>
                <Text style={mapStyles.tripSummaryText}>Time: {routes[selectedRoute]?.durationWithTraffic} min</Text>
              </View>

              <TouchableOpacity style={mapStyles.doneButton} onPress={resetToSearch}>
                <Text style={mapStyles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaWrapper>
        </View>
      )}

      {/* Location Button */}
      {(navigationPhase === 'route-selection' || navigationPhase === 'search') && (
        <TouchableOpacity
          style={[
            mapStyles.locationButton,
            navigationPhase === 'route-selection' && mapStyles.locationButtonRouteSelection,
          ]}
          onPress={centerOnUser}
        >
          <Ionicons name="locate" size={24} color={theme.colors.primary[500]} />
        </TouchableOpacity>
      )}

      {/* Loading Overlay */}
      {loading && (
        <View style={mapStyles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme.colors.primary[500]} />
        </View>
      )}
    </SafeAreaWrapper>
  );
};

export default Maps;