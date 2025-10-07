import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductCard from '../components/ProductCard';
import {RootStackParamList} from '../navigation/AppNavigator';
import {products, Product} from '../constants/products';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {addToCart, incrementQuantity, decrementQuantity} from '../store/cartSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Products'>;

const ProductsScreen: React.FC<Props> = ({navigation}) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const {items: cartItems, showViewCart} = useAppSelector(state => state.cart);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId],
    );
  };

  const handleAddToCart = (productId: string) => {
    dispatch(addToCart(productId));
  };

  const handleIncrement = (productId: string) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrement = (productId: string) => {
    dispatch(decrementQuantity(productId));
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleViewCart = () => {
    navigation.navigate('Checkout');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PRODUCTS PAGE</Text>
      </View>

      {/* Search Bar */}
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={() => navigation.navigate('Search')}
        activeOpacity={0.8}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <Text style={styles.searchPlaceholder}>
          Search for atta, dal, coke and more
        </Text>
        <Icon name="mic-outline" size={24} color="#666" />
      </TouchableOpacity>

      {/* Products List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Favourites</Text>
        </View>

        <View style={styles.productsGrid}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={() => toggleFavorite(product.id)}
              isInCart={cartItems.some(item => item.productId === product.id)}
              quantity={cartItems.find(item => item.productId === product.id)?.quantity || 0}
              onAddToCart={() => handleAddToCart(product.id)}
              onIncrement={() => handleIncrement(product.id)}
              onDecrement={() => handleDecrement(product.id)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Floating View Cart Component */}
      {showViewCart && (
        <View style={styles.floatingViewCart}>
          <TouchableOpacity
            style={styles.viewCartButton}
            onPress={handleViewCart}>
            <View style={styles.cartBadge}>
              <Icon name="cart-outline" size={18} color="#ffffff" />
            </View>
            <View style={styles.viewCartTextContainer}>
              <Text style={styles.viewCartText}>View cart</Text>
              <Text style={styles.viewCartSubtext}>{getTotalItems()} item{getTotalItems() > 1 ? 's' : ''}</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2d2d2d',
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1d1d1',
    margin: 16,
    marginTop: 20,
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 14,
    color: '#999',
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingBottom: 100,
  },
  floatingViewCart: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999,
  },
  viewCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00AA00',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  cartBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewCartTextContainer: {
    alignItems: 'flex-start',
  },
  viewCartText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  viewCartSubtext: {
    color: '#ffffff',
    fontSize: 11,
    opacity: 0.9,
  },
});

export default ProductsScreen;

