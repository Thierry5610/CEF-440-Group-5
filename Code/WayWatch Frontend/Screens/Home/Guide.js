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
  FlatList,
  Modal,
} from 'react-native';
import { Search, Heart, ArrowLeft, Bookmark } from 'lucide-react-native';

// Sample data for learning items
const learningData = [
  {
    id: '1',
    title: 'Stop Sign',
    category: 'Road Signs',
    subcategory: 'Regulatory',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Animal Crossing',
    category: 'Road Signs',
    subcategory: 'Warning',
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=300&fit=crop',
    isFavorite: true,
  },
  {
    id: '3',
    title: 'Speed Management',
    category: 'Safe Driving',
    subcategory: 'Speed',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    isFavorite: true,
  },
  {
    id: '4',
    title: 'Sharing the road',
    category: 'Safe Driving',
    subcategory: 'General',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Avoid distraction',
    category: 'Safe Driving',
    subcategory: 'General',
    image: 'https://images.unsplash.com/photo-1551522435-a13afa10f103?w=400&h=300&fit=crop',
    isFavorite: false,
  },
];

const categories = ['All', 'Regulatory', 'Warning', 'Informational', 'Temporary', 'Prohibition'];

export default function Guide() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(
    learningData.filter(item => item.isFavorite).map(item => item.id)
  );
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const renderLearningItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.learningCard}
      onPress={() => openDetailModal(item)}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Heart 
            size={16} 
            color={favorites.includes(item.id) ? '#007AFF' : '#8E8E93'}
            fill={favorites.includes(item.id) ? '#007AFF' : 'none'}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.moreButton}
        onPress={() => openDetailModal(item)}
      >
        <Text style={styles.moreButtonText}>More</Text>
      </TouchableOpacity>
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
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={closeDetailModal}>
            <ArrowLeft size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.detailTitle}>
            {selectedItem?.title || 'Speed Management'}
          </Text>
          <TouchableOpacity onPress={() => selectedItem && toggleFavorite(selectedItem.id)}>
            <Bookmark 
              size={20} 
              color={selectedItem && favorites.includes(selectedItem.id) ? '#007AFF' : '#8E8E93'}
              fill={selectedItem && favorites.includes(selectedItem.id) ? '#007AFF' : 'none'}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.detailContent}>
          <Image 
            source={{ 
              uri: selectedItem?.image || 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop' 
            }} 
            style={styles.detailImage} 
          />
          
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
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=100&h=100&fit=crop' }} 
                  style={styles.benefitIcon} 
                />
                <Text style={styles.benefitText}>Reduce crashes and injuries</Text>
              </View>
              
              <View style={styles.benefitItem}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' }} 
                  style={styles.benefitIcon} 
                />
                <Text style={styles.benefitText}>Create a calmer and more predictable</Text>
              </View>
              
              <View style={styles.benefitItem}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=100&h=100&fit=crop' }} 
                  style={styles.benefitIcon} 
                />
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Learn</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={16} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'All' && styles.activeTab]}
          onPress={() => setActiveTab('All')}
        >
          <Text style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Favorite' && styles.activeTab]}
          onPress={() => setActiveTab('Favorite')}
        >
          <Text style={[styles.tabText, activeTab === 'Favorite' && styles.activeTabText]}>
            Favorite
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

      {/* Learning Items Grid */}
      <FlatList
        data={filteredData}
        renderItem={renderLearningItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />

      {/* Safe Driving Category Label */}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Safe Driving</Text>
      </View>

      {/* Detail Modal */}
      <DetailModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#000000',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000000',
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#E5E5EA',
  },
  selectedCategoryButton: {
    backgroundColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#000000',
  },
  selectedCategoryButtonText: {
    color: '#FFFFFF',
  },
  gridContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  learningCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  favoriteButton: {
    padding: 4,
  },
  moreButton: {
    backgroundColor: '#007AFF',
    marginHorizontal: 12,
    marginBottom: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  moreButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  
  // Detail Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  detailContent: {
    flex: 1,
  },
  detailImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  detailTextContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  detailQuestion: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 10,
  },
  detailDescription: {
    fontSize: 16,
    lineHeight: 22,
    color: '#000000',
    marginBottom: 20,
  },
  importanceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 15,
  },
  benefitsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  benefitItem: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  benefitIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000000',
  },
});