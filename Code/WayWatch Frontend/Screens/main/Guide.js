import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import { Search, Heart, ChevronLeft, Bookmark, ArrowRight, BookOpen } from 'lucide-react-native';

// Import custom components and styles
import SafeAreaWrapper from '../../components/common/SafeAreaWrapper';
import ModalWrapper from '../../components/common/ModalWrapper'; // Ensure ModalWrapper is imported
import theme from '../../styles/theme';
import { guideStyles } from '../../styles/components/guideStyles';
import {
  LEARNING_DATA,
  CATEGORIES,
  getDifficultyColor,
  filterLearningData
} from '../../utils/guideConstants';

const Guide = () => {
  // State management
  const [activeTab, setActiveTab] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(
    LEARNING_DATA.filter(item => item.isFavorite).map(item => item.id)
  );
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Toggle favorite
  const toggleFavorite = (itemId) => {
    setFavorites(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Modal handlers
  const openDetailModal = (item) => {
    setSelectedItem(item);
    setIsDetailModalVisible(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalVisible(false);
    setSelectedItem(null);
  };

  // Filter data
  const filteredData = filterLearningData(
    LEARNING_DATA,
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
      <ModalWrapper // Replaced SafeAreaWrapper with ModalWrapper
        style={guideStyles.modalContainer}
        edges={['top']} // Only top edge to avoid spacing issues
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

        <ScrollView style={guideStyles.detailContent} showsVerticalScrollIndicator={false}>
          <View style={guideStyles.detailImageContainer}>
            <Image
              source={{ uri: selectedItem?.image }}
              style={guideStyles.detailImage}
            />
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
          </View>

          <View style={guideStyles.detailTextContainer}>
            <Text style={guideStyles.detailQuestion}>
              What is {selectedItem?.title}?
            </Text>
            <Text style={guideStyles.detailDescription}>
              {selectedItem?.description}
            </Text>

            <Text style={guideStyles.importanceTitle}>
              Importance of {selectedItem?.title.toLowerCase()}
            </Text>

            <View style={guideStyles.benefitsContainer}>
              {selectedItem?.importance.map((benefit, index) => (
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
      edges={['top']} // Only top edge to avoid spacing issues
    >
      <ScrollView style={guideStyles.scrollContainer} showsVerticalScrollIndicator={false}>
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

        {/* Grid */}
        <View style={guideStyles.gridContainer}>
          {renderGrid(filteredData)}
        </View>
      </ScrollView>

      {/* Detail Modal */}
      <DetailModal />
    </SafeAreaWrapper>
  );
};

export default Guide;