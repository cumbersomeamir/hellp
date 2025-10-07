import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Keyboard,
  FlatList,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '../navigation/AppNavigator';
import {products, Product} from '../constants/products';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

interface RecentSearch {
  id: string;
  text: string;
  icon?: string;
}

interface TrendingCategory {
  id: string;
  name: string;
  items: {id: string; image: string}[];
}

const SearchScreen: React.FC<Props> = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

  // Filter products based on search text
  const filteredProducts = useMemo(() => {
    if (!searchText.trim()) return [];
    
    return products.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const recentSearches: RecentSearch[] = [
    {id: '1', text: 'gatorade', icon: 'https://via.placeholder.com/30'},
    {id: '2', text: 'rolling paper', icon: 'https://via.placeholder.com/30'},
    {id: '3', text: 'rolling papwr', icon: 'https://via.placeholder.com/30'},
    {id: '4', text: 'protein', icon: 'https://via.placeholder.com/30'},
  ];

  const trendingCategories: TrendingCategory[] = [
    {
      id: '1',
      name: 'Eggs',
      items: [
        {id: '1', image: 'https://via.placeholder.com/60'},
        {id: '2', image: 'https://via.placeholder.com/60'},
      ],
    },
    {
      id: '2',
      name: 'Ramen',
      items: [
        {id: '1', image: 'https://via.placeholder.com/60'},
        {id: '2', image: 'https://via.placeholder.com/60'},
      ],
    },
    {
      id: '3',
      name: 'Soda',
      items: [
        {id: '1', image: 'https://via.placeholder.com/60'},
        {id: '2', image: 'https://via.placeholder.com/60'},
      ],
    },
    {
      id: '4',
      name: "Haldiram's Namkeen",
      items: [
        {id: '1', image: 'https://via.placeholder.com/60'},
        {id: '2', image: 'https://via.placeholder.com/60'},
      ],
    },
    {
      id: '5',
      name: 'Ice Cubes',
      items: [
        {id: '1', image: 'https://via.placeholder.com/60'},
        {id: '2', image: 'https://via.placeholder.com/60'},
      ],
    },
    {
      id: '6',
      name: 'Maggi Noodles',
      items: [
        {id: '1', image: 'https://via.placeholder.com/60'},
        {id: '2', image: 'https://via.placeholder.com/60'},
      ],
    },
  ];

  const handleClearRecent = () => {
    // Clear recent searches logic
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', {product});
  };

  const renderProductItem = ({item}: {item: Product}) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => handleProductPress(item)}>
      <Image source={{uri: item.picture}} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productQuantity}>{item.quantity}</Text>
        <Text style={styles.productPrice}>₹{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for atta, dal, coke and more"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
          />
        </View>
        <TouchableOpacity style={styles.micButton}>
          <Icon name="mic-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {searchText.trim() ? (
        /* Search Results */
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id}
          renderItem={renderProductItem}
          style={styles.searchResults}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      ) : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {/* Recent Searches */}
          <View style={styles.recentSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent searches</Text>
              <TouchableOpacity onPress={handleClearRecent}>
                <Text style={styles.clearButton}>clear</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.chipsContainer}>
              {recentSearches.map(search => (
                <TouchableOpacity key={search.id} style={styles.chip}>
                  {search.icon && (
                    <Image
                      source={{uri: search.icon}}
                      style={styles.chipIcon}
                      resizeMode="contain"
                    />
                  )}
                  <Text style={styles.chipText}>{search.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Trending in your city */}
          <View style={styles.trendingSection}>
            <Text style={styles.sectionTitle}>Trending in your city</Text>

            <View style={styles.trendingGrid}>
              {trendingCategories.map(category => (
                <TouchableOpacity key={category.id} style={styles.categoryCard}>
                  <View style={styles.categoryHeader}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </View>
                  <View style={styles.categoryItems}>
                    {category.items.map(item => (
                      <View key={item.id} style={styles.categoryItemWrapper}>
                        <Image
                          source={{uri: item.image}}
                          style={styles.categoryItemImage}
                          resizeMode="contain"
                        />
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bottom Spacing for Keyboard */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingTop: 50,
    paddingBottom: 12,
    gap: 8,
  },
  backButton: {
    padding: 4,
  },
  searchInputContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    fontSize: 14,
    color: '#333',
    paddingVertical: 10,
  },
  micButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  recentSection: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  clearButton: {
    fontSize: 14,
    color: '#00AA00',
    fontWeight: '600',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  chipIcon: {
    width: 20,
    height: 20,
  },
  chipText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  trendingSection: {
    backgroundColor: '#ffffff',
    padding: 16,
  },
  trendingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  categoryCard: {
    width: '48.5%',
    backgroundColor: '#9CC89C',
    borderRadius: 12,
    padding: 12,
    minHeight: 120,
  },
  categoryHeader: {
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  categoryItems: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
  },
  categoryItemWrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 6,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItemImage: {
    width: '100%',
    height: '100%',
  },
  bottomSpacing: {
    height: 300,
  },
  searchResults: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  productQuantity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00AA00',
  },
});

export default SearchScreen;

