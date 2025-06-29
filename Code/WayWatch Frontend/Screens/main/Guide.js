import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { Search, Heart, ChevronLeft, Bookmark, ArrowRight, BookOpen } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import custom components and styles
import SafeAreaWrapper from '../../components/common/SafeAreaWrapper';
import ModalWrapper from '../../components/common/ModalWrapper';
import theme from '../../styles/theme';
import { guideStyles } from '../../styles/components/guideStyles';

const API_BASE_URL = 'https://backend-qcus.onrender.com/api/v1';

// Categories for filtering
const CATEGORIES = ['All', 'Regulatory', 'Warning', 'Informational', 'Temporary', 'Prohibition'];

// Difficulty color mapping
const getDifficultyColor = (category) => {
  switch (category?.toLowerCase()) {
    case 'regulatory': 
      return theme.colors.success[500];
    case 'warning': 
      return theme.colors.warning[500];
    case 'informational': 
      return theme.colors.primary[500];
    case 'temporary':
      return theme.colors.warning[600];
    case 'prohibition':
      return theme.colors.error[500];
    default: 
      return theme.colors.neutral[500];
  }
};

const Guide = () => {
  // State management
  const [activeTab, setActiveTab] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [roadSigns, setRoadSigns] = useState([]);
  const [loading, setLoading] = useState(false); // For initial road signs list loading
  const [refreshing, setRefreshing] = useState(false);
  const [preModalLoading, setPreModalLoading] = useState(false); // New state for loading before modal opens

  // Load data on component mount
  useEffect(() => {
    loadRoadSigns();
    loadFavorites();
  }, []);

  // Get JWT token from AsyncStorage
  const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  };

  // Capitalize first letter
  const capitalizeFirst = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
  };

  // Helper to generate importance array
  const generateImportance = (description, imageUrl, category) => {
    return [
      { 
        text: description.substring(0, Math.min(description.length, 100)) + (description.length > 100 ? '...' : ''), 
        icon: imageUrl
      },
      { 
        text: `This ${category} sign helps ensure road safety and proper traffic flow.`, 
        icon: imageUrl
      },
      { 
        text: `Understanding this sign is essential for all drivers and road users.`, 
        icon: imageUrl
      }
    ];
  };

  // Load road signs from backend
  const loadRoadSigns = async () => {
    try {
      setLoading(true);
      
      const response = await fetch(`${API_BASE_URL}/roadsign`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        const transformedSigns = data.data.map(sign => ({
          id: sign._id,
          title: sign.name,
          category: 'Road Signs',
          subcategory: capitalizeFirst(sign.category),
          image: sign.imageUrl,
          isFavorite: favorites.includes(sign._id),
          difficulty: capitalizeFirst(sign.category),
          duration: `${Math.ceil(sign.description.split(' ').length / 50)} min read`,
          description: sign.description,
          importance: generateImportance(sign.description, sign.imageUrl, capitalizeFirst(sign.category)),
          originalData: sign,
        }));

        setRoadSigns(transformedSigns);
      } else {
        throw new Error(data.message || 'Failed to load road signs');
      }
    } catch (error) {
      console.error('Error loading road signs:', error);
      Alert.alert('Error', 'Failed to load road signs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load a single road sign with auth (for detailed view)
  const loadSingleRoadSign = async (id) => {
    try {
      const token = await getAuthToken();
      if (!token) {
        Alert.alert('Error', 'Authentication required to view detailed information.');
        return null;
      }

      const response = await fetch(`${API_BASE_URL}/roadsign/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to load road sign details');
      }
    } catch (error) {
      console.error('Error loading road sign details:', error);
      Alert.alert('Error', 'Failed to load detailed information.');
      return null;
    }
  };

  // Refresh road signs
  const onRefresh = async () => {
    setRefreshing(true);
    await loadRoadSigns();
    setRefreshing(false);
  };

  // Load favorites from AsyncStorage
  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('roadSignFavorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  // Save favorites to AsyncStorage
  const saveFavorites = async (updatedFavorites) => {
    try {
      await AsyncStorage.setItem('roadSignFavorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  // Toggle favorite
  const toggleFavorite = (itemId) => {
    const updatedFavorites = favorites.includes(itemId)
      ? favorites.filter(id => id !== itemId)
      : [...favorites, itemId];
    
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
    
    setRoadSigns(prev => prev.map(sign => ({
      ...sign,
      isFavorite: updatedFavorites.includes(sign.id)
    })));
  };

  // Modal handlers
  const openDetailModal = async (item) => {
    setSelectedItem(null); // Clear selected item immediately to ensure fresh data
    setPreModalLoading(true); // Start full-screen loading overlay

    const detailedSign = await loadSingleRoadSign(item.id);
    if (detailedSign) {
      const enhancedItem = {
        id: detailedSign._id,
        title: detailedSign.name,
        category: 'Road Signs',
        subcategory: capitalizeFirst(detailedSign.category),
        image: detailedSign.imageUrl,
        isFavorite: favorites.includes(detailedSign._id),
        difficulty: capitalizeFirst(detailedSign.category),
        duration: `${Math.ceil(detailedSign.description.split(' ').length / 50)} min read`,
        description: detailedSign.description,
        importance: generateImportance(detailedSign.description, detailedSign.imageUrl, capitalizeFirst(detailedSign.category)),
        originalData: detailedSign,
      };
      setSelectedItem(enhancedItem); // Set the fully loaded and transformed item
      setIsDetailModalVisible(true); // Only open modal after data is ready
    }
    setPreModalLoading(false); // Stop loading overlay
  };

  const closeDetailModal = () => {
    setIsDetailModalVisible(false);
    setSelectedItem(null);
  };

  // Filter data
  const filterLearningData = (data, activeTab, selectedCategory, searchQuery, favorites) => {
    return data.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.subcategory === selectedCategory;
      const matchesFavorite = activeTab === 'Favorite' ? favorites.includes(item.id) : true;
      return matchesSearch && matchesCategory && matchesFavorite;
    });
  };

  const filteredData = filterLearningData(
    roadSigns,
    activeTab,
    selectedCategory,
    searchQuery,
    favorites
  );

  // Render learning item
  const renderLearningItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={guideStyles.learningCard}
      onPress={() => openDetailModal(item)}
      activeOpacity={0.95}
    >
      <View style={guideStyles.cardImageContainer}>
        <Image source={{ uri: item.image }} style={guideStyles.cardImage} />
        <View style={guideStyles.imageOverlay}>
          <TouchableOpacity
            style={guideStyles.favoriteButton}
            onPress={(e) => {
              e.stopPropagation();
              toggleFavorite(item.id);
            }}
          >
            <Heart
              size={18}
              color={favorites.includes(item.id) ? '#FF3B30' : '#FFFFFF'}
              fill={favorites.includes(item.id) ? '#FF3B30' : 'none'}
            />
          </TouchableOpacity>
        </View>
        <View style={[
          guideStyles.difficultyBadge,
          { backgroundColor: getDifficultyColor(item.difficulty) }
        ]}>
          <Text style={guideStyles.difficultyText}>{item.difficulty}</Text>
        </View>
      </View>

      <View style={guideStyles.cardContent}>
        <Text style={guideStyles.cardTitle} numberOfLines={2}>{item.title}</Text>
        <View style={guideStyles.cardMeta}>
          <View style={guideStyles.metaItem}>
            <BookOpen size={12} color={theme.colors.neutral[500]} />
            <Text style={guideStyles.metaText}>{item.duration}</Text>
          </View>
        </View>

        <View style={guideStyles.cardFooter}>
          <Text style={guideStyles.learnText}>Learn more</Text>
          <ArrowRight size={16} color={theme.colors.primary[500]} />
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render grid
  const renderGrid = (data) => {
    const rows = [];
    for (let i = 0; i < data.length; i += 2) {
      rows.push(
        <View key={i} style={guideStyles.row}>
          {renderLearningItem(data[i])}
          {data[i + 1] && renderLearningItem(data[i + 1])}
        </View>
      );
    }
    return rows;
  };

  // Render tab button
  const TabButton = ({ tabKey, label, icon: IconComponent }) => (
    <TouchableOpacity
      style={[guideStyles.tab, activeTab === tabKey && guideStyles.activeTab]}
      onPress={() => setActiveTab(tabKey)}
      activeOpacity={0.8}
    >
      {IconComponent && (
        <IconComponent
          size={16}
          color={activeTab === tabKey ? theme.colors.white : theme.colors.neutral[600]}
          fill={activeTab === tabKey ? theme.colors.white : 'none'}
          style={{ marginRight: theme.spacing[2] }}
        />
      )}
      <Text style={[guideStyles.tabText, activeTab === tabKey && guideStyles.activeTabText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  // Render category button
  const CategoryButton = ({ category }) => (
    <TouchableOpacity
      key={category}
      style={[
        guideStyles.categoryButton,
        selectedCategory === category && guideStyles.selectedCategoryButton
      ]}
      onPress={() => setSelectedCategory(category)}
      activeOpacity={0.8}
    >
      <Text style={[
        guideStyles.categoryButtonText,
        selectedCategory === category && guideStyles.selectedCategoryButtonText
      ]}>
        {category}
      </Text>
    </TouchableOpacity>
  );

  // Detail Modal Component
  const DetailModal = () => (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={isDetailModalVisible}
      onRequestClose={closeDetailModal}
    >
      <ModalWrapper
        style={guideStyles.modalContainer}
        edges={['top']}
      >
        <View style={guideStyles.detailHeader}>
          <TouchableOpacity
            onPress={closeDetailModal}
            style={guideStyles.backButton}
            activeOpacity={0.8}
          >
            <ChevronLeft size={24} color={theme.colors.primary[500]} />
          </TouchableOpacity>
          <Text style={guideStyles.detailTitle} numberOfLines={1}>
            {selectedItem?.title}
          </Text>
          <TouchableOpacity
            onPress={() => selectedItem && toggleFavorite(selectedItem.id)}
            style={guideStyles.bookmarkButton}
          >
            <Bookmark
              size={20}
              color={selectedItem && favorites.includes(selectedItem.id) ? '#FF3B30' : '#8E8E93'}
              fill={selectedItem && favorites.includes(selectedItem.id) ? '#FF3B30' : 'none'}
            />
          </TouchableOpacity>
        </View>

        {/* Modal content is rendered directly, as loading happens beforehand */}
        <ScrollView style={guideStyles.detailContent} showsVerticalScrollIndicator={false}>
          {selectedItem?.image && (
            <Image source={{ uri: selectedItem.image }} style={guideStyles.detailImage} />
          )}
          <View style={guideStyles.detailImageOverlay}>
            <View style={[
              guideStyles.detailDifficultyBadge,
              { backgroundColor: getDifficultyColor(selectedItem?.difficulty) }
            ]}>
              <Text style={guideStyles.detailDifficultyText}>{selectedItem?.difficulty}</Text>
            </View>
            <View style={guideStyles.detailMetaContainer}>
              <BookOpen size={14} color={theme.colors.white} />
              <Text style={guideStyles.detailMetaText}>{selectedItem?.duration}</Text>
            </View>
          </View>

          <View style={guideStyles.detailTextContainer}>
            <Text style={guideStyles.detailQuestion}>
              What is {selectedItem?.title}?
            </Text>
            <Text style={guideStyles.detailDescription}>
              {selectedItem?.description}
            </Text>

            <Text style={guideStyles.importanceTitle}>
              Importance of {selectedItem?.title?.toLowerCase()}
            </Text>

            <View style={guideStyles.benefitsContainer}>
              {selectedItem?.importance?.map((benefit, index) => (
                <View key={index} style={guideStyles.benefitItem}>
                  <View style={guideStyles.benefitIconContainer}>
                    <Image
                      source={{ uri: benefit.icon }}
                      style={guideStyles.benefitIcon}
                    />
                  </View>
                  <Text style={guideStyles.benefitText}>{benefit.text}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </ModalWrapper>
    </Modal>
  );

  return (
    <SafeAreaWrapper
      style={guideStyles.container}
      statusBarStyle="dark-content"
      backgroundColor={theme.colors.white}
      edges={['top']}
    >
      <ScrollView 
        style={guideStyles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={guideStyles.header}>
          <Text style={guideStyles.headerTitle}>Learn Road Signs</Text>
          <Text style={guideStyles.headerSubtitle}>Master road signs for safer driving</Text>
        </View>

        {/* Search */}
        <View style={guideStyles.searchContainer}>
          <View style={guideStyles.searchInputContainer}>
            <Search size={18} color={theme.colors.neutral[500]} style={guideStyles.searchIcon} />
            <TextInput
              style={guideStyles.searchInput}
              placeholder="Search signs..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={theme.colors.neutral[500]}
            />
          </View>
        </View>

        {/* Tabs */}
        <View style={guideStyles.tabContainer}>
          <TabButton tabKey="All" label="All Signs" />
          <TabButton tabKey="Favorite" label="Favorites" icon={Heart} />
        </View>

        {/* Categories */}
        <View style={guideStyles.categoryContainer}>
          <Text style={guideStyles.categoryTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={guideStyles.categoryScroll}
          >
            {CATEGORIES.map((category) => (
              <CategoryButton key={category} category={category} />
            ))}
          </ScrollView>
        </View>

        {/* Loading State for main content */}
        {loading && roadSigns.length === 0 ? (
          <View style={{ alignItems: 'center', paddingTop: 50 }}>
            <ActivityIndicator size="large" color={theme.colors.primary[500]} />
            <Text style={{ marginTop: 16, color: '#666' }}>Loading road signs...</Text>
          </View>
        ) : filteredData.length === 0 ? (
          <View style={{ alignItems: 'center', paddingTop: 50, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>
              {activeTab === 'Favorite' && favorites.length === 0
                ? 'No favorites yet.\nTap the heart icon on any sign to add it to favorites.'
                : searchQuery 
                ? `No signs found matching "${searchQuery}"`
                : selectedCategory !== 'All'
                ? `No signs found in "${selectedCategory}" category`
                : 'No road signs available'}
            </Text>
          </View>
        ) : (
          /* Grid */
          <View style={guideStyles.gridContainer}>
            {renderGrid(filteredData)}
          </View>
        )}
      </ScrollView>

      {/* Detail Modal */}
      <DetailModal />

      {/* Full-screen loading overlay before modal opens */}
      {preModalLoading && (
        <View style={guideStyles.fullScreenLoadingOverlay}>
          <ActivityIndicator size="large" color={theme.colors.primary[500]} />
          <Text style={{ marginTop: 10, color: theme.colors.neutral[600] }}>Loading...</Text>
        </View>
      )}
    </SafeAreaWrapper>
  );
};

export default Guide;