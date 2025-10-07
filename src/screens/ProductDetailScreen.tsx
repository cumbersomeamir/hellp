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
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '../navigation/AppNavigator';
import {Product} from '../constants/products';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const ProductDetailScreen: React.FC<Props> = ({route, navigation}) => {
  const {product} = route.params;
  const [isFavorite, setIsFavorite] = useState(product.isFavorite);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const scrollViewRef = useRef<ScrollView>(null);

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

  const formatReviews = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    // In real app, check against actual images array length
    if (currentImageIndex < 2) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleAddToCart = () => {
    setIsInCart(true);
    setQuantity(1);
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    } else {
      setIsInCart(false);
      setQuantity(1);
    }
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
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="share-social-outline" size={24} color="#333" />
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
            {/* Carousel Navigation Buttons */}
            <TouchableOpacity
              style={[styles.carouselButton, styles.carouselButtonLeft]}
              onPress={handlePrevImage}>
              <Icon name="chevron-forward" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Image Indicators */}
          <View style={styles.imageIndicators}>
            {[0, 1, 2].map(index => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentImageIndex === index && styles.indicatorActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Product Info Card */}
        <View style={styles.productInfoCard}>
          {/* Delivery Time */}
          <View style={styles.deliveryBadge}>
            <Icon name="timer-outline" size={14} color="#666" />
            <Text style={styles.deliveryText}>{product.deliveryTime}</Text>
          </View>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map(star => (
                <Icon
                  key={star}
                  name={
                    star <= Math.floor(product.rating) ? 'star' : 'star-half'
                  }
                  size={14}
                  color="#FFA500"
                />
              ))}
            </View>
            <Text style={styles.reviewCount}>
              ({formatReviews(product.reviews)})
            </Text>
          </View>

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

        {/* Brand Section */}
        <TouchableOpacity style={styles.brandSection}>
          <View style={styles.brandLeft}>
            <View style={styles.brandLogo}>
              <Image
                source={{uri: 'https://via.placeholder.com/40'}}
                style={styles.brandLogoImage}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.brandName}>Lay's</Text>
              <Text style={styles.brandSubtext}>Explore all products</Text>
            </View>
          </View>
          <Icon name="chevron-forward" size={24} color="#333" />
        </TouchableOpacity>

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
          <View style={styles.cartControlsContainer}>
            <TouchableOpacity
              style={styles.viewCartButton}
              onPress={handleViewCart}>
              <View style={styles.cartBadge}>
                <Icon name="cart-outline" size={18} color="#ffffff" />
              </View>
              <View style={styles.viewCartTextContainer}>
                <Text style={styles.viewCartText}>View cart</Text>
                <Text style={styles.viewCartSubtext}>1 item</Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#ffffff" />
            </TouchableOpacity>
            <View style={styles.quantityControls}>
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
  carouselButton: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carouselButtonLeft: {
    left: 16,
  },
  imageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 6,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#d0d0d0',
  },
  indicatorActive: {
    backgroundColor: '#666',
  },
  productInfoCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginTop: 8,
  },
  deliveryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
    gap: 4,
  },
  deliveryText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 6,
    gap: 2,
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
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
  brandSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    marginTop: 8,
  },
  brandLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandLogoImage: {
    width: 40,
    height: 40,
  },
  brandName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  brandSubtext: {
    fontSize: 12,
    color: '#666',
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
    height: 100,
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
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
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
  cartControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    gap: 12,
  },
  viewCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00AA00',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 8,
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
    flex: 1,
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
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00AA00',
    borderRadius: 8,
    overflow: 'hidden',
  },
  quantityButton: {
    width: 36,
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

