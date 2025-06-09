import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  Modal,
  ActivityIndicator,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const Maps = () => {
  // State management
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [currentLocation, setCurrentLocation] = useState(null);
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
  const insets = useSafeAreaInsets();

  // Debug mode - set to false to disable all console logs
  const DEBUG_MODE = false; // Change to true if you want to see logs

  const debugLog = (message, data = null) => {
    if (DEBUG_MODE) {
      console.log(message, data || '');
    }
  };

  // Get user's current location
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const userLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setCurrentLocation(userLocation);
      setRegion({
        ...userLocation,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      debugLog('Error getting location:', error);
      Alert.alert('Error', 'Could not get current location');
    }
  };

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
        color: '#007AFF',
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
        color: '#007AFF',
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
      color: '#007AFF',
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
      style={[styles.routeOption, isSelected && styles.selectedRouteOption]}
      onPress={() => onSelect(route.id)}
    >
      <View style={styles.routeHeader}>
        <View style={styles.routeTypeContainer}>
          <View style={[styles.routeColorIndicator, { backgroundColor: route.color }]} />
          <Text style={styles.routeType}>{route.routeType}</Text>
          {route.isFastest && <Text style={styles.fastestBadge}>FASTEST</Text>}
        </View>
        <Text style={styles.routeTime}>{route.durationWithTraffic} min</Text>
      </View>

      <View style={styles.routeDetails}>
        <Text style={styles.routeDistance}>{route.distance} km</Text>
        <View style={styles.routeFeatures}>
          {route.tollFree && <Text style={styles.featureBadge}>Toll-free</Text>}
          <View
            style={[
              styles.trafficIndicator,
              {
                backgroundColor:
                  route.traffic === 'clear' ? '#34C759' : 
                  route.traffic === 'light' ? '#FF9500' : 
                  route.traffic === 'heavy' ? '#FF3B30' : '#666666',
              },
            ]}
          >
            <Text style={styles.trafficText}>
              {route.traffic === 'clear' ? 'Clear' : 
               route.traffic === 'light' ? 'Light traffic' : 
               route.traffic === 'heavy' ? 'Heavy traffic' : 'Unknown'}
            </Text>
          </View>
        </View>
      </View>

      {route.duration !== route.durationWithTraffic && (
        <Text style={styles.normalTime}>{route.duration} min without traffic</Text>
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
    <SafeAreaView style={styles.container}>
      {/* Status Bar Configuration */}
      <StatusBar
        barStyle={navigationPhase === 'navigating' ? 'dark-content' : 'light-content'}
        backgroundColor={navigationPhase === 'navigating' ? '#FFFFFF' : 'transparent'}
        translucent={true}
      />

      {/* Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsTraffic={isNavigating}
      >
        {currentLocation && (
          <Marker coordinate={currentLocation} title="Your Location" anchor={{ x: 0.5, y: 0.5 }}>
            <View style={styles.currentLocationMarker}>
              <View style={styles.currentLocationDot} />
            </View>
          </Marker>
        )}

        {destination && (
          <Marker coordinate={destination} title="Destination" description={destination.name}>
            <View style={styles.destinationMarker}>
              <Ionicons name="location" size={30} color="#FF3B30" />
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
        <SafeAreaView style={[styles.searchContainer, { paddingTop: insets.top }]}>
          <Text style={styles.screenTitle}>Search Location</Text>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
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
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                  setShowSearchResults(false);
                }}
                style={styles.clearButton}
              >
                <Ionicons name="close" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>

          {showSearchResults && (
            <View style={styles.searchResultsContainer}>
              {loading ? (
                <ActivityIndicator size="small" color="#007AFF" style={styles.loader} />
              ) : (
                <FlatList
                  data={searchResults}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.searchResultItem} onPress={() => selectSearchResult(item)}>
                      <MaterialIcons name="place" size={20} color="#666" />
                      <View style={styles.searchResultTextContainer}>
                        <Text style={styles.searchResultTitle}>{item.shortName}</Text>
                        <Text style={styles.searchResultSubtitle} numberOfLines={1}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  style={styles.searchResultsList}
                />
              )}
            </View>
          )}

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.currentLocationButton} onPress={centerOnUser}>
              <Ionicons name="locate" size={20} color="#007AFF" />
              <Text style={styles.currentLocationText}>Your current location</Text>
            </TouchableOpacity>

            {destination && (
              <TouchableOpacity style={styles.startTripButton} onPress={startRoutePlanning}>
                <Text style={styles.startTripButtonText}>Start Trip</Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      )}

      {/* Route Selection Interface */}
      {navigationPhase === 'route-selection' && (
        <View style={[styles.routeSelectionContainer, { paddingBottom: insets.bottom }]}>
          <SafeAreaView edges={['top']}>
            <View style={styles.routeSelectionHeader}>
              <TouchableOpacity onPress={resetToSearch} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#007AFF" />
              </TouchableOpacity>
              <Text style={styles.screenTitle}>Choose Your Route</Text>
            </View>
          </SafeAreaView>

          <ScrollView style={styles.routesList} showsVerticalScrollIndicator={false}>
            {getDisplayedRoutes().map((route) => (
              <RouteOption
                key={route.id}
                route={route}
                isSelected={selectedRoute === route.id}
                onSelect={setSelectedRoute}
              />
            ))}
          </ScrollView>

          <View style={styles.routeButtonsContainer}>
            <TouchableOpacity style={styles.startNavigationButton} onPress={startNavigation}>
              <Text style={styles.startNavigationButtonText}>Start Trip</Text>
            </TouchableOpacity>

            {routes.length > 1 && (
              <TouchableOpacity
                style={[styles.alternateRouteButton, showingAlternateRoutes && styles.alternateRouteButtonActive]}
                onPress={handleAlternateRoutes}
              >
                <Text
                  style={[styles.alternateRouteButtonText, showingAlternateRoutes && styles.alternateRouteButtonTextActive]}
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
        <SafeAreaView style={[styles.navigationContainer, { paddingTop: insets.top }]}>
          <View style={styles.navigationHeader}>
            <View style={styles.navigationInfo}>
              <Text style={styles.navigationTime}>{routes[selectedRoute]?.durationWithTraffic} min</Text>
              <Text style={styles.navigationDistance}>{routes[selectedRoute]?.distance} km</Text>
            </View>
            <TouchableOpacity onPress={completeTrip} style={styles.endTripButton}>
              <Text style={styles.endTripButtonText}>End Trip</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}

      {/* Trip Completion Interface */}
      {navigationPhase === 'completed' && (
        <View style={[styles.completionContainer, { paddingBottom: insets.bottom }]}>
          <SafeAreaView edges={['top']}>
            <View style={styles.completionContent}>
              <View style={styles.completionIcon}>
                <Ionicons name="checkmark-circle" size={60} color="#34C759" />
              </View>
              <Text style={styles.completionTitle}>Trip Completed!</Text>
              <Text style={styles.completionSubtitle}>You have arrived at your destination</Text>

              <View style={styles.tripSummary}>
                <Text style={styles.tripSummaryText}>Distance: {routes[selectedRoute]?.distance} km</Text>
                <Text style={styles.tripSummaryText}>Time: {routes[selectedRoute]?.durationWithTraffic} min</Text>
              </View>

              <TouchableOpacity style={styles.doneButton} onPress={resetToSearch}>
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      )}

      {/* Location Button */}
      {(navigationPhase === 'route-selection' || navigationPhase === 'search') && (
        <TouchableOpacity
          style={[
            styles.locationButton,
            navigationPhase === 'route-selection' && styles.locationButtonRouteSelection,
          ]}
          onPress={centerOnUser}
        >
          <Ionicons name="locate" size={24} color="#007AFF" />
        </TouchableOpacity>
      )}

      {/* Loading Overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  map: {
    flex: 1,
  },

  // Markers (unchanged)
  currentLocationMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 122, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentLocationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  destinationMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Search Interface
  searchContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: "#F1F1F1",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 5,
  },
  searchResultsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    maxHeight: 200,
    marginBottom: 20,
  },
  searchResultsList: {
    maxHeight: 200,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchResultTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  searchResultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  searchResultSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  loader: {
    padding: 20,
  },
  actionButtonsContainer: {
    gap: 10,
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: "#F1F1F1",
    padding: 15,
    borderRadius: 25,
  },
  currentLocationText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#007AFF',
  },
  startTripButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  startTripButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Route Selection Interface
  routeSelectionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  routeSelectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    paddingTop: 20,
  },
  backButton: {
    marginRight: 15,
  },
  routesList: {
    paddingHorizontal: 20,
    maxHeight: 300,
  },
  routeOption: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedRouteOption: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeColorIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginRight: 10,
  },
  routeType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  fastestBadge: {
    backgroundColor: '#34C759',
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  routeTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeDistance: {
    fontSize: 14,
    color: '#666',
  },
  routeFeatures: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureBadge: {
    backgroundColor: '#e8f5e8',
    color: '#34C759',
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trafficIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trafficText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  normalTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  routeButtonsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
  },
  startNavigationButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  startNavigationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  alternateRouteButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  alternateRouteButtonActive: {
    backgroundColor: '#007AFF',
  },
  alternateRouteButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  alternateRouteButtonTextActive: {
    color: 'white',
  },

  // Navigation Interface
  navigationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navigationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navigationInfo: {
    flex: 1,
  },
  navigationTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  navigationDistance: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
  },
  endTripButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  endTripButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  // Trip Completion Interface
  completionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completionContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  completionIcon: {
    marginBottom: 20,
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  completionSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  tripSummary: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 30,
  },
  tripSummaryText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  doneButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Location Button
  locationButton: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  locationButtonRouteSelection: {
    bottom: 420,
  },

  // Loading Overlay
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Maps;