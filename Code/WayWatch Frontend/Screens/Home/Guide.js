import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Search, Heart, ChevronLeft, Bookmark, ArrowRight, BookOpen } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Sample data for learning items
const learningData = [
  {
    id: '1',
    title: 'Stop Sign',
    category: 'Road Signs',
    subcategory: 'Regulatory',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    isFavorite: false,
    difficulty: 'Beginner',
    duration: '5 min read',
  },
  {
    id: '2',
    title: 'Animal Crossing',
    category: 'Road Signs',
    subcategory: 'Warning',
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=300&fit=crop',
    isFavorite: true,
    difficulty: 'Beginner',
    duration: '3 min read',
  },
  {
    id: '3',
    title: 'Speed Management',
    category: 'Safe Driving',
    subcategory: 'Speed',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    isFavorite: true,
    difficulty: 'Intermediate',
    duration: '8 min read',
  },
  {
    id: '4',
    title: 'Sharing the road',
    category: 'Safe Driving',
    subcategory: 'General',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    isFavorite: false,
    difficulty: 'Advanced',
    duration: '12 min read',
  },
  {
    id: '5',
    title: 'Avoid distraction',
    category: 'Safe Driving',
    subcategory: 'General',
    image: 'https://images.unsplash.com/photo-1551522435-a13afa10f103?w=400&h=300&fit=crop',
    isFavorite: false,
    difficulty: 'Intermediate',
    duration: '6 min read',
  },
];

const categories = ['All', 'Regulatory', 'Warning', 'Informational', 'Temporary', 'Prohibition'];

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Beginner': return '#4CAF50';
    case 'Intermediate': return '#FF9800';
    case 'Advanced': return '#F44336';
    default: return '#4CAF50';
  }
};

export default function Guide() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(
    learningData.filter(item => item.isFavorite).map(item => item.id)
  );
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const insets = useSafeAreaInsets();

  const toggleFavorite = (itemId) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const openDetailModal = (item) => {
    setSelectedItem(item);
    setIsDetailModalVisible(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalVisible(false);
    setSelectedItem(null);
  };

  const filteredData = learningData.filter(item => {
    const matchesTab = activeTab === 'All' || favorites.includes(item.id);
    const matchesCategory = selectedCategory === 'All' || item.subcategory === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'Favorite') {
      return favorites.includes(item.id) && matchesCategory && matchesSearch;
    }
    
    return matchesTab && matchesCategory && matchesSearch;
  });

  // Group data by category
  const roadSignsData = filteredData.filter(item => item.category === 'Road Signs');
  const safeDrivingData = filteredData.filter(item => item.category === 'Safe Driving');

  const renderLearningItem = (item) => (
    <TouchableOpacity 
      key={item.id}
      style={styles.learningCard}
      onPress={() => openDetailModal(item)}
      activeOpacity={0.95}
    >
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.imageOverlay}>
          <TouchableOpacity 
            style={styles.favoriteButton}
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
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
          <Text style={styles.difficultyText}>{item.difficulty}</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.cardMeta}>
          <View style={styles.metaItem}>
            <BookOpen size={12} color="#8E8E93" />
            <Text style={styles.metaText}>{item.duration}</Text>
          </View>
        </View>
        
        <View style={styles.cardFooter}>
          <Text style={styles.learnText}>Learn more</Text>
          <ArrowRight size={16} color="#4A90E2" />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderGrid = (data) => {
    const rows = [];
    for (let i = 0; i < data.length; i += 2) {
      rows.push(
        <View key={i} style={styles.row}>
          {renderLearningItem(data[i])}
          {data[i + 1] && renderLearningItem(data[i + 1])}
        </View>
      );
    }
    return rows;
  };

  // Detail Modal Component
  const DetailModal = () => (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={isDetailModalVisible}
      onRequestClose={closeDetailModal}
    >
      <SafeAreaView style={[styles.modalContainer, { paddingBottom: insets.bottom }]}>
        <View style={styles.detailHeader}>
          <TouchableOpacity 
            onPress={closeDetailModal} 
            style={styles.backButton}
            activeOpacity={0.8}
          >
            <ChevronLeft size={24} color="#4A90E2" />
          </TouchableOpacity>
          <Text style={styles.detailTitle} numberOfLines={1}>
            {selectedItem?.title || 'Speed Management'}
          </Text>
          <TouchableOpacity 
            onPress={() => selectedItem && toggleFavorite(selectedItem.id)}
            style={styles.bookmarkButton}
          >
            <Bookmark 
              size={20} 
              color={selectedItem && favorites.includes(selectedItem.id) ? '#FF3B30' : '#8E8E93'}
              fill={selectedItem && favorites.includes(selectedItem.id) ? '#FF3B30' : 'none'}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.detailContent} showsVerticalScrollIndicator={false}>
          <View style={styles.detailImageContainer}>
            <Image 
              source={{ 
                uri: selectedItem?.image || 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop' 
              }} 
              style={styles.detailImage} 
            />
            <View style={styles.detailImageOverlay}>
              <View style={[styles.detailDifficultyBadge, { backgroundColor: getDifficultyColor(selectedItem?.difficulty || 'Beginner') }]}>
                <Text style={styles.detailDifficultyText}>{selectedItem?.difficulty || 'Beginner'}</Text>
              </View>
              <View style={styles.detailMetaContainer}>
                <BookOpen size={14} color="#FFFFFF" />
                <Text style={styles.detailMetaText}>{selectedItem?.duration || '5 min read'}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailQuestion}>
              What is {selectedItem?.title || 'Speed Management'}?
            </Text>
            <Text style={styles.detailDescription}>
              {selectedItem?.title === 'Speed Management' 
                ? 'Speed management means making sure vehicles travel at safe speeds to protect everyone on the road. It involves setting speed limits, using signs, speed bumps, and traffic lights to help drivers slow down when needed.'
                : selectedItem?.title === 'Stop Sign'
                ? 'A stop sign is a regulatory traffic sign designed to notify drivers that they must come to a complete stop and make sure the intersection is safely clear of vehicles and pedestrians before proceeding.'
                : selectedItem?.title === 'Animal Crossing'
                ? 'Animal crossing signs warn drivers that they are approaching an area where animals frequently cross the road. These signs help prevent accidents and protect both wildlife and drivers.'
                : `Learn about ${selectedItem?.title || 'this topic'} and how it relates to safe driving practices. Understanding these concepts is essential for becoming a responsible driver.`
              }
            </Text>
            
            <Text style={styles.importanceTitle}>
              Importance of {selectedItem?.title?.toLowerCase() || 'speed management'}
            </Text>
            
            <View style={styles.benefitsContainer}>
              <View style={styles.benefitItem}>
                <View style={styles.benefitIconContainer}>
                  <Image 
                    source={{ uri: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3' }} 
                    style={styles.benefitIcon} 
                  />
                </View>
                <Text style={styles.benefitText}>Reduce crashes and injuries</Text>
              </View>
              
              <View style={styles.benefitItem}>
                <View style={styles.benefitIconContainer}>
                  <Image 
                    source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' }} 
                    style={styles.benefitIcon} 
                  />
                </View>
                <Text style={styles.benefitText}>Create a calmer and more predictable environment</Text>
              </View>
              
              <View style={styles.benefitItem}>
                <View style={styles.benefitIconContainer}>
                  <Image 
                    source={{ uri: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f' }} 
                    style={styles.benefitIcon} 
                  />
                </View>
                <Text style={styles.benefitText}>Make roads safer for walkers, bikers, and drivers</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Learn</Text>
          <Text style={styles.headerSubtitle}>Master road safety and driving skills</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={18} color="#8E8E93" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search topics..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#8E8E93"
            />
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'All' && styles.activeTab]}
            onPress={() => setActiveTab('All')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>
              All Topics
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Favorite' && styles.activeTab]}
            onPress={() => setActiveTab('Favorite')}
            activeOpacity={0.8}
          >
            <Heart 
              size={16} 
              color={activeTab === 'Favorite' ? '#FFFFFF' : '#8E8E93'} 
              fill={activeTab === 'Favorite' ? '#FFFFFF' : 'none'}
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.tabText, activeTab === 'Favorite' && styles.activeTabText]}>
              Favorites
            </Text>
          </TouchableOpacity>
        </View>

        {/* Category Filters */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Road Signs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategoryButton
                ]}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.selectedCategoryButtonText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Road Signs Grid */}
        {roadSignsData.length > 0 && (
          <View style={styles.gridContainer}>
            {renderGrid(roadSignsData)}
          </View>
        )}

        {/* Safe Driving Category */}
        {safeDrivingData.length > 0 && (
          <>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>Safe Driving</Text>
            </View>
            
            <View style={styles.gridContainer}>
              {renderGrid(safeDrivingData)}
            </View>
          </>
        )}
      </ScrollView>

      {/* Detail Modal */}
      <DetailModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6C757D',
    fontWeight: '400',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '400',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  activeTab: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6C757D',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1A1A1A',
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  selectedCategoryButton: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  categoryButtonTextStyle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6C757D',
  },
  selectedCategoryButtonText: {
    color: '#FFFFFF',
  },
  gridContainer: {
    padding: 20,
    paddingBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  learningCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardImageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  difficultyBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    lineHeight: 20,
  },
  cardMeta: {
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  learnText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContent: {
    flex: 1,
  },
  detailImageContainer: {
    position: 'relative',
  },
  detailImage: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  detailImageOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailDifficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  detailDifficultyText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  detailMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  detailMetaText: {
    fontSize: 13,
    color: '#FFFFFF',
    marginLeft: 6,
    fontWeight: '500',
  },
  detailTextContainer: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  detailQuestion: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4A90E2',
    marginBottom: 16,
    lineHeight: 28,
  },
  detailDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#495057',
    marginBottom: 32,
  },
  importanceTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  benefitsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  benefitItem: {
    flex: 1,
    alignItems: 'center',
  },
  benefitIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  benefitIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  benefitText: {
    fontSize: 13,
    textAlign: 'center',
    color: '#6C757D',
    lineHeight: 18,
    fontWeight: '500',
  },
});