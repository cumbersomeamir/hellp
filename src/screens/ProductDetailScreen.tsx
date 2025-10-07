import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Platform,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '../navigation/AppNavigator';
import {Product} from '../constants/products';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {addToCart, incrementQuantity, decrementQuantity} from '../store/cartSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const ProductDetailScreen: React.FC<Props> = ({route, navigation}) => {
  const {product} = route.params;
  const [isFavorite, setIsFavorite] = useState(product.isFavorite);
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useAppDispatch();
  const {items: cartItems, showViewCart} = useAppSelector(state => state.cart);

  const scrollViewRef = useRef<ScrollView>(null);

  // Check if current product is in cart
  const cartItem = cartItems.find(item => item.productId === product.id);
  const isInCart = !!cartItem;
  const quantity = cartItem?.quantity || 0;

  // Mock similar products
  const similarProducts = [
    {
      id: 's1',
      name: "Lay's Magic Masala",
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 's2',
      name: "Lay's Classic Salted",
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 's3',
      name: 'Bingo Mad Angles',
      image: 'https://via.placeholder.com/100',
    },
  ];



  const handleAddToCart = () => {
    dispatch(addToCart(product.id));
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(product.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(product.id));
  };

  const handleViewCart = () => {
    navigation.navigate('Checkout');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-down" size={28} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setIsFavorite(!isFavorite)}>
            <Icon
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? '#ff4444' : '#333'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="search-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Image Carousel */}
        <View style={styles.imageCarouselContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={{uri: product.picture}}
              style={styles.productImage}
              resizeMode="contain"
            />
          </View>

        </View>

        {/* Product Info Card */}
        <View style={styles.productInfoCard}>

          {/* Product Name */}
          <Text style={styles.productName}>{product.name}</Text>

          {/* Veg/Non-veg Indicator */}
          <View style={styles.vegBadge}>
            <View style={styles.vegIndicator} />
          </View>

          {/* Price Section */}
          <View style={styles.priceSection}>
            <Text style={styles.weight}>{product.quantity}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>₹{product.price}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>
                MRP ₹{product.originalPrice}
              </Text>
            )}
            {product.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{product.discount}</Text>
              </View>
            )}
          </View>

          {/* View Product Details */}
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => setShowDetails(!showDetails)}>
            <Text style={styles.viewDetailsText}>View product details</Text>
            <Icon
              name={showDetails ? 'chevron-up' : 'chevron-down'}
              size={16}
              color="#00AA00"
            />
          </TouchableOpacity>

          {showDetails && (
            <View style={styles.detailsContent}>
              <Text style={styles.detailsText}>
                Full product details would appear here...
              </Text>
            </View>
          )}
        </View>


        {/* Similar Products */}
        <View style={styles.similarProductsSection}>
          <Text style={styles.sectionTitle}>Similar products</Text>
          <FlatList
            horizontal
            data={similarProducts}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.similarProductsList}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.similarProductCard}>
                <Image
                  source={{uri: item.image}}
                  style={styles.similarProductImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
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
              <Text style={styles.viewCartSubtext}>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} item{cartItems.reduce((sum, item) => sum + item.quantity, 0) > 1 ? 's' : ''}</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      )}

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarLeft}>
          <Text style={styles.bottomWeight}>{product.quantity}</Text>
          <View style={styles.bottomPriceRow}>
            <Text style={styles.bottomPrice}>₹{product.price}</Text>
            {product.originalPrice && (
              <Text style={styles.bottomOriginalPrice}>
                MRP ₹{product.originalPrice}
              </Text>
            )}
          </View>
          {product.discount && (
            <View style={styles.bottomDiscountBadge}>
              <Text style={styles.bottomDiscountText}>{product.discount}</Text>
            </View>
          )}
          <Text style={styles.bottomTaxText}>Inclusive of all taxes</Text>
        </View>

        {!isInCart ? (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>Add to cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.quantitySelector}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleDecrement}>
              <Icon name="remove" size={20} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleIncrement}>
              <Icon name="add" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
  },
  headerButton: {
    padding: 4,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  scrollView: {
    flex: 1,
  },
  imageCarouselContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
  },
  imageWrapper: {
    position: 'relative',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: SCREEN_WIDTH * 0.7,
    height: 280,
  },
  productInfoCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginTop: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    lineHeight: 24,
  },
  vegBadge: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#00AA00',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  vegIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00AA00',
  },
  priceSection: {
    marginBottom: 8,
  },
  weight: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 12,
    color: '#00AA00',
    fontWeight: '700',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewDetailsText: {
    fontSize: 14,
    color: '#00AA00',
    fontWeight: '600',
  },
  detailsContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  detailsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  similarProductsSection: {
    backgroundColor: '#ffffff',
    marginTop: 8,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  similarProductsList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  similarProductCard: {
    width: 100,
    height: 100,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  similarProductImage: {
    width: 80,
    height: 80,
  },
  bottomSpacing: {
    height: 160,
  },
  floatingViewCart: {
    position: 'absolute',
    bottom: 140,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: Platform.select({ios: 18, android: 14}),
    paddingBottom: Platform.select({ios: 36, android: 20}),
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 1000,
  },
  bottomBarLeft: {
    flex: 1,
  },
  bottomWeight: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    marginBottom: 2,
  },
  bottomPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  bottomPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  bottomOriginalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  bottomDiscountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e8f5ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  bottomDiscountText: {
    fontSize: 11,
    color: '#0066cc',
    fontWeight: '700',
  },
  bottomTaxText: {
    fontSize: 10,
    color: '#666',
  },
  addToCartButton: {
    backgroundColor: '#00AA00',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 16,
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
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
    alignSelf: 'center',
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
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00AA00',
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00AA00',
  },
  quantityText: {
    paddingHorizontal: 16,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ProductDetailScreen;

