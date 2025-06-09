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

const learningData = [
  {
    id: '1',
    title: 'Stop Sign',
    category: 'Road Signs',
    subcategory: 'Regulatory',
    image: 'https://media.istockphoto.com/id/486744506/vector/stop-sign-vector.jpg?s=612x612&w=0&k=20&c=ibvthRQWTgcSt2R9EaqCb8WvmSYJHBQXDCPr8C9qLj8=',
    isFavorite: false,
    difficulty: 'Beginner',
    duration: '5 min read',
    description: 'Instructs drivers to stop and ensure the intersection is clear before proceeding.',
    importance: [
      { text: 'The stop sign requires all drivers to come to a complete stop before proceeding.', icon: 'https://media.istockphoto.com/id/1307624581/vector/stop-sign-with-hand-icon-info-graphics-vector-graphics.jpg?s=612x612&w=0&k=20&c=zNQnBw8lYqiOJ4DAx336gcNhYQRE0b_xelUpQKk8Rs0=' },
      { text: 'Usually placed at intersections, visible from a distance to allow time for stopping.', icon: 'https://media.istockphoto.com/id/1283851574/vector/attention-sign-stop-sign.jpg?s=612x612&w=0&k=20&c=01ZHWFnIX21fuBG9s3oiN066gg1NkIxw14DRKhIKcMk=' },
      { text: 'Instructs drivers to stop and ensure the intersection is clear before proceeding.', icon: 'https://media.istockphoto.com/id/1151657492/vector/vector-red-prohibition-sign-no-symbol-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=UhU_DVZGc-HnEeMayjUllgdrhYdvfUpDYPRaxFaHwmk=' }
    ]
  },
  {
    id: '2',
    title: 'Yield Sign',
    category: 'Road Signs',
    subcategory: 'Regulatory',
    image: 'https://media.istockphoto.com/id/520973070/vector/yield-sign.jpg?s=612x612&w=0&k=20&c=KxHolhy5z-JtUXyu2pbjZsP3XMQxKVeKSZC5Jp41TJk=',
    isFavorite: true,
    difficulty: 'Beginner',
    duration: '3 min read',
    description: 'Instructs drivers to give right-of-way to other vehicles or pedestrians.',
    importance: [
      { text: 'The yield sign indicates that drivers must prepare to stop if necessary to let a driver on another approach proceed.', icon: 'https://media.istockphoto.com/id/1972577301/vector/yield-traffic-sign.jpg?s=612x612&w=0&k=20&c=6d_1L7-iWsUUWk60lU9H5DZfPthoNB5Dw-ukg_2h9oU=' },
      { text: 'Visible as you approach intersections, alerting drivers to prepare to yield.', icon: 'https://media.istockphoto.com/id/1307758886/vector/triangular-traffic-signal-in-white-and-red-isolated-on-white-background-mandatory-give-way.jpg?s=612x612&w=0&k=20&c=4vmv2c6tD3D-3KOrEcSLH9lKgJ8t8B0MotJ_KfsuGhM=' },
      { text: 'Instructs drivers to give right-of-way to other vehicles or pedestrians.', icon: 'https://media.istockphoto.com/id/1036713280/vector/priority-road-sign-and-give-way-sign-vector.jpg?s=612x612&w=0&k=20&c=9K2etbXopsc2jyRwxDYRybZl5T8ehFFLnYU8rEKGYh4=' }
    ]
  },
  {
    id: '3',
    title: 'Animal Crossing',
    category: 'Road Signs',
    subcategory: 'Warning',
    image: 'https://media.istockphoto.com/id/165956622/vector/kangaroo-crossing-sign.jpg?s=612x612&w=0&k=20&c=LyeTc9QOnGSxWP-m-YnTNCf1rX3Tf89UQM-g_wrsHBY=',
    isFavorite: true,
    difficulty: 'Beginner',
    duration: '4 min read',
    description: 'Advises drivers to slow down and stay alert for animals on the road.',
    importance: [
      { text: 'Animal crossing signs warn drivers to watch for animals entering the roadway.', icon: 'https://media.istockphoto.com/id/165956622/vector/kangaroo-crossing-sign.jpg?s=612x612&w=0&k=20&c=LyeTc9QOnGSxWP-m-YnTNCf1rX3Tf89UQM-g_wrsHBY=' },
      { text: 'Usually placed near forests or countryside areas where animal crossings are frequent.', icon: 'https://media.istockphoto.com/id/115983057/photo/koala-warning-sign.jpg?s=612x612&w=0&k=20&c=-ovRYduMxpsBEf9Yr2EvAXDwMcC1Oc6bVQQFQPsf-jY=' },
      { text: 'Advises drivers to slow down and stay alert for animals on the road.', icon: 'https://media.istockphoto.com/id/487003018/photo/deer-crossing-in-canada.jpg?s=612x612&w=0&k=20&c=mPSo7HJmbyyI_uDP5MgywOvE9AN-fzFMZX4WmeZC4mk=' }
    ]
  },
  {
    id: '4',
    title: 'No U-Turn',
    category: 'Road Signs',
    subcategory: 'Prohibition',
    image: 'https://media.istockphoto.com/id/1207567645/vector/u-turn-forbidden-road-sign.jpg?s=612x612&w=0&k=20&c=3NS7a31_qOIJDvtuaaF828AvIld0P7MJjZQKug-RBwA=',
    isFavorite: false,
    difficulty: 'Intermediate',
    duration: '5 min read',
    description: 'Instructs drivers that U-turns are not allowed to ensure smooth traffic flow.',
    importance: [
      { text: 'Indicates that making a U-turn at this location is prohibited.', icon: 'https://media.istockphoto.com/id/1480909666/vector/no-u-turn-sign-forbidden-turn-back-icon-no-u-turn-sign-for-traffic-symbol-outline-icon.jpg?s=612x612&w=0&k=20&c=G5U6E7gdTe5u4Xtg7xb2z82H5lQIKnqWJFW3F77DMxY=' },
      { text: 'Usually positioned where U-turns could disrupt traffic or pose a danger.', icon: 'https://media.istockphoto.com/id/2163465612/vector/no-u-turn-sign.jpg?s=612x612&w=0&k=20&c=QvTbUVaSaoOfhIhpafAUwSbVWM-hi4Q0dUhdTh-ofBc=' },
      { text: 'Instructs drivers that U-turns are not allowed to ensure smooth traffic flow.', icon: 'https://media.istockphoto.com/id/538099001/photo/no-left-or-u-turn.jpg?s=612x612&w=0&k=20&c=mBYVoGLQuDgrRg6ZCZbvp5aGStQsTmHR_u5hT4PF0_k=' }
    ]
  },
  {
    id: '5',
    title: 'Construction Zone',
    category: 'Road Signs',
    subcategory: 'Temporary',
    image: 'https://media.istockphoto.com/id/1132069677/vector/construction-site-sign-caution-construction-works-traffic-sign.jpg?s=612x612&w=0&k=20&c=riR3z5NYCAMgez94IwPUpQZwQL_5_RwkCUkMb-71Qlw=',
    isFavorite: false,
    difficulty: 'Intermediate',
    duration: '6 min read',
    description: 'Indicates the presence of a construction area requiring reduced speed and increased caution.',
    importance: [
      { text: 'Warns drivers of road work ahead and the presence of workers or equipment.', icon: 'https://media.istockphoto.com/id/1468856154/vector/road-works-sign-attention-road-works-are-underway-warning-sign-yellow-triangle.jpg?s=612x612&w=0&k=20&c=PoUDITzCQMqosx-iBxK8HH1Kc8Ojc4nbFedasqP64o8=' },
      { text: 'Placed well before the construction zone to give drivers time to slow down or change lanes.', icon: 'https://media.istockphoto.com/id/1411524602/vector/general-isolated-road-sign-with-silhouette-man-working-for-road-work-icon-button-board.jpg?s=612x612&w=0&k=20&c=dMBwl6CzWHJD3U-1OZPoOUWErZ2C5Rg7WoSAV8eJxqw=' },
      { text: 'Indicates the presence of a construction area requiring reduced speed and increased caution.', icon: 'https://media.istockphoto.com/id/1132069677/vector/construction-site-sign-caution-construction-works-traffic-sign.jpg?s=612x612&w=0&k=20&c=riR3z5NYCAMgez94IwPUpQZwQL_5_RwkCUkMb-71Qlw=' }
    ]
  }
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
  const [favorites, setFavorites] = useState(learningData.filter(item => item.isFavorite).map(item => item.id));
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
    return activeTab === 'Favorite' ? favorites.includes(item.id) && matchesCategory && matchesSearch : matchesTab && matchesCategory && matchesSearch;
  });

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
            {selectedItem?.title}
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
              source={{ uri: selectedItem?.image }} 
              style={styles.detailImage} 
            />
            <View style={styles.detailImageOverlay}>
              <View style={[styles.detailDifficultyBadge, { backgroundColor: getDifficultyColor(selectedItem?.difficulty) }]}>
                <Text style={styles.detailDifficultyText}>{selectedItem?.difficulty}</Text>
              </View>
              <View style={styles.detailMetaContainer}>
                <BookOpen size={14} color="#FFFFFF" />
                <Text style={styles.detailMetaText}>{selectedItem?.duration}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailQuestion}>
              What is {selectedItem?.title}?
            </Text>
            <Text style={styles.detailDescription}>
              {selectedItem?.description}
            </Text>
            
            <Text style={styles.importanceTitle}>
              Importance of {selectedItem?.title.toLowerCase()}
            </Text>
            
            <View style={styles.benefitsContainer}>
              {selectedItem?.importance.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <View style={styles.benefitIconContainer}>
                    <Image 
                      source={{ uri: benefit.icon }} 
                      style={styles.benefitIcon} 
                    />
                  </View>
                  <Text style={styles.benefitText}>{benefit.text}</Text>
                </View>
              ))}
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
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Learn Road Signs</Text>
          <Text style={styles.headerSubtitle}>Master road signs for safer driving</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={18} color="#8E8E93" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search signs..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#8E8E93"
            />
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'All' && styles.activeTab]}
            onPress={() => setActiveTab('All')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>
              All Signs
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

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Categories</Text>
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

        <View style={styles.gridContainer}>
          {renderGrid(filteredData)}
        </View>
      </ScrollView>

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
    fontSize: 28,
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
  categoryButtonText: {
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