import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '../navigation/AppNavigator';
import {Product} from '../constants/products';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
}) => {
  const navigation = useNavigation<NavigationProp>();

  const formatReviews = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const handleCardPress = () => {
    navigation.navigate('ProductDetail', {product});
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress} activeOpacity={0.9}>

      {/* Favorite Button */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={onToggleFavorite}>
        <Icon
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={20}
          color={isFavorite ? '#ff4444' : '#999'}
        />
      </TouchableOpacity>

      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{uri: product.picture}}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>

      {/* Product Info */}
      <View style={styles.infoContainer}>
        {/* Weight/Quantity */}
        <View style={styles.weightContainer}>
          <View style={styles.weightBadge}>
            <Text style={styles.weightText}>{product.quantity}</Text>
          </View>
        </View>

        {/* Product Name */}
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>


        {/* Price */}
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>₹{product.price}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>MRP ₹{product.originalPrice}</Text>
          )}
        </View>

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '31%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    margin: '1%',
    marginBottom: 12,
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tag: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 2,
  },
  tagPriceDrop: {
    backgroundColor: '#FFD700',
  },
  tagBestseller: {
    backgroundColor: '#FFD700',
  },
  tagChilled: {
    backgroundColor: '#E8E8E8',
  },
  tagSweet: {
    backgroundColor: '#FFB6C1',
  },
  tagText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#333',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
    padding: 4,
  },
  imageContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  productImage: {
    width: '80%',
    height: '100%',
  },
  addButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#00AA00',
    borderRadius: 8,
    paddingVertical: 6,
    marginHorizontal: 12,
    marginTop: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#00AA00',
    fontSize: 13,
    fontWeight: '700',
  },
  infoContainer: {
    padding: 12,
    paddingTop: 8,
  },
  weightContainer: {
    marginBottom: 4,
  },
  weightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weightText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  productName: {
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 16,
    minHeight: 32,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 9,
    color: '#666',
  },
  deliveryTime: {
    fontSize: 10,
    color: '#666',
    fontWeight: '600',
    marginBottom: 6,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 10,
    color: '#999',
    textDecorationLine: 'line-through',
  },
});

export default ProductCard;

