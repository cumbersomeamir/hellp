import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList} from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

interface CartItem {
  id: string;
  name: string;
  weight: string;
  price: number;
  quantity: number;
  image: string;
}

interface RecommendedProduct {
  id: string;
  name: string;
  weight: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: string;
}

const CheckoutScreen: React.FC<Props> = ({navigation}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: "Lay's West Indies Hot n Sweet Chilli Flavour Potat...",
      weight: '48 g',
      price: 19,
      quantity: 1,
      image: 'https://via.placeholder.com/80',
    },
  ]);

  const [selectedInstructions, setSelectedInstructions] = useState<string[]>(
    [],
  );

  const recommendedProducts: RecommendedProduct[] = [
    {
      id: 'r1',
      name: 'Kurkure Puffcorn Yummy Cheese Puffs',
      weight: '52 g',
      price: 19,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 'r2',
      name: 'Coca-Cola Zero Sugar Soft Drink',
      weight: '300 ml ∙ 300 ml',
      price: 40,
      originalPrice: 100,
      image: 'https://via.placeholder.com/100',
      discount: '60% OFF',
    },
    {
      id: 'r3',
      name: 'Thums Up Soft Drink (750 ml)',
      weight: '750 ml ∙ 750 ml',
      price: 39,
      originalPrice: 100,
      image: 'https://via.placeholder.com/100',
    },
  ];

  const deliveryInstructions = [
    {id: 'record', icon: 'record-circle-outline', label: 'Record\nand hold'},
    {id: 'avoid-bell', icon: 'bell-off-outline', label: 'Avoid ringing\nbell'},
    {id: 'no-bell', icon: 'bell-outline', label: "Don't ring\nthe bell"},
    {id: 'other', icon: 'ellipsis-horizontal', label: ''},
  ];

  const itemsTotal = 20;
  const feedingIndiaDonation = 1;
  const deliveryCharge = 20;
  const handlingCharge = 11;
  const smallCartCharge = 20;
  const grandTotal = 81;

  const handleQuantityChange = (itemId: string, change: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? {...item, quantity: Math.max(1, item.quantity + change)}
          : item,
      ),
    );
  };

  const toggleInstruction = (id: string) => {
    setSelectedInstructions(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Icon name="share-outline" size={20} color="#00AA00" />
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Delivery Banner */}
        <View style={styles.deliveryBanner}>
          <View style={styles.deliveryIconContainer}>
            <Icon name="flash" size={16} color="#00AA00" />
          </View>
          <View style={styles.deliveryTextContainer}>
            <Text style={styles.deliveryTitle}>Delivery in 8 minutes</Text>
            <Text style={styles.deliverySubtitle}>Shipment of 1 item</Text>
          </View>
        </View>

        {/* Cart Items */}
        {cartItems.map(item => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{uri: item.image}} style={styles.cartItemImage} />
            <View style={styles.cartItemInfo}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <Text style={styles.cartItemWeight}>{item.weight}</Text>
              <Text style={styles.cartItemStock}>20 in stock(s)</Text>
            </View>
            <View style={styles.cartItemRight}>
              <View style={styles.quantityControl}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(item.id, -1)}>
                  <Icon name="remove" size={16} color="#00AA00" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(item.id, 1)}>
                  <Icon name="add" size={16} color="#00AA00" />
                </TouchableOpacity>
              </View>
              <Text style={styles.cartItemPrice}>₹{item.price}</Text>
            </View>
          </View>
        ))}

        {/* Free Delivery Banner */}
        <View style={styles.freeDeliveryBanner}>
          <View style={styles.deliveryIcon}>
            <MaterialCommunityIcons
              name="truck-fast-outline"
              size={20}
              color="#0066cc"
            />
          </View>
          <View style={styles.freeDeliveryText}>
            <Text style={styles.freeDeliveryTitle}>Get FREE delivery</Text>
            <Text style={styles.freeDeliverySubtitle}>
              Add products worth ₹380 more •
            </Text>
          </View>
        </View>

        {/* Coupons */}
        <TouchableOpacity style={styles.couponsButton}>
          <Text style={styles.couponsText}>See all coupons</Text>
          <Icon name="chevron-forward" size={16} color="#666" />
        </TouchableOpacity>

        {/* You might also like */}
        <View style={styles.recommendationsSection}>
          <Text style={styles.sectionTitle}>You might also like</Text>
          <FlatList
            horizontal
            data={recommendedProducts}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendationsList}
            renderItem={({item}) => (
              <View style={styles.recommendationCard}>
                <Image
                  source={{uri: item.image}}
                  style={styles.recommendationImage}
                  resizeMode="contain"
                />
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>ADD</Text>
                </TouchableOpacity>
                <Text style={styles.recommendationWeight}>{item.weight}</Text>
                <Text style={styles.recommendationName} numberOfLines={2}>
                  {item.name}
                </Text>
                <View style={styles.recommendationPriceRow}>
                  <Text style={styles.recommendationPrice}>₹{item.price}</Text>
                  {item.originalPrice && (
                    <Text style={styles.recommendationOriginalPrice}>
                      MRP ₹{item.originalPrice}
                    </Text>
                  )}
                </View>
                {item.discount && (
                  <Text style={styles.recommendationDiscount}>
                    {item.discount}
                  </Text>
                )}
                <Text style={styles.seeMoreText}>See more like this</Text>
              </View>
            )}
          />
        </View>

        {/* Bill Details */}
        <View style={styles.billSection}>
          <Text style={styles.sectionTitle}>Bill details</Text>
          <View style={styles.billRow}>
            <View style={styles.billLeft}>
              <Icon name="receipt-outline" size={16} color="#666" />
              <Text style={styles.billLabel}>Items total</Text>
            </View>
            <Text style={styles.billValue}>₹20 ₹19</Text>
          </View>
          <View style={styles.billRow}>
            <View style={styles.billLeft}>
              <Icon name="heart-outline" size={16} color="#666" />
              <Text style={styles.billLabel}>Feeding India donation</Text>
            </View>
            <Text style={styles.billValue}>₹{feedingIndiaDonation}</Text>
          </View>
          <View style={styles.billRow}>
            <View style={styles.billLeft}>
              <MaterialCommunityIcons
                name="bike-fast"
                size={16}
                color="#666"
              />
              <Text style={styles.billLabel}>Delivery charge</Text>
            </View>
            <Text style={styles.billValue}>₹{deliveryCharge}</Text>
          </View>
          <View style={styles.billRow}>
            <View style={styles.billLeft}>
              <Icon name="basket-outline" size={16} color="#666" />
              <Text style={styles.billLabel}>Handling charge</Text>
            </View>
            <Text style={styles.billValue}>₹{handlingCharge}</Text>
          </View>
          <View style={styles.billRow}>
            <View style={styles.billLeft}>
              <Icon name="cart-outline" size={16} color="#666" />
              <Text style={styles.billLabel}>Small cart charge</Text>
            </View>
            <Text style={styles.billValue}>₹{smallCartCharge}</Text>
          </View>
          <Text style={styles.smallCartNote}>
            (No small cart charge on orders above ₹99)
          </Text>

          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Grand total</Text>
            <Text style={styles.grandTotalValue}>₹{grandTotal}</Text>
          </View>
        </View>

        {/* Add GSTIN */}
        <TouchableOpacity style={styles.gstinButton}>
          <View style={styles.gstinLeft}>
            <View style={styles.gstinIcon}>
              <Icon name="document-text-outline" size={20} color="#0066cc" />
            </View>
            <View>
              <Text style={styles.gstinTitle}>Add GSTIN</Text>
              <Text style={styles.gstinSubtitle}>
                Claim free input credit up to 18% on your order
              </Text>
            </View>
          </View>
          <Icon name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        {/* Delivery Instructions */}
        <View style={styles.instructionsSection}>
          <Text style={styles.sectionTitle}>Delivery instructions</Text>
          <View style={styles.instructionsGrid}>
            {deliveryInstructions.map(instruction => (
              <TouchableOpacity
                key={instruction.id}
                style={[
                  styles.instructionCard,
                  selectedInstructions.includes(instruction.id) &&
                    styles.instructionCardSelected,
                ]}
                onPress={() => toggleInstruction(instruction.id)}>
                <View
                  style={[
                    styles.instructionCheckbox,
                    selectedInstructions.includes(instruction.id) &&
                      styles.instructionCheckboxSelected,
                  ]}>
                  {selectedInstructions.includes(instruction.id) && (
                    <Icon name="checkmark" size={12} color="#00AA00" />
                  )}
                </View>
                <Icon name={instruction.icon as any} size={20} color="#666" />
                {instruction.label && (
                  <Text style={styles.instructionLabel}>
                    {instruction.label}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.addressSection}>
          <View style={styles.addressHeader}>
            <View style={styles.addressLeft}>
              <Icon name="home" size={20} color="#FF9800" />
              <Text style={styles.addressTitle}>Delivering to Home</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.changeButton}>Change</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.addressText}>
            Jomy, 3/5/1, Sector 9, Vikas Nagar Sector 9, Vikas...
          </Text>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Payment Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.paymentMethod}>
          <MaterialCommunityIcons name="google-pay" size={24} color="#666" />
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentLabel}>PAY USING</Text>
            <Text style={styles.paymentName}>Google Pay UPI</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.placeOrderButton}>
          <View style={styles.placeOrderContent}>
            <Text style={styles.placeOrderAmount}>₹{grandTotal}</Text>
            <Text style={styles.placeOrderTotal}>TOTAL</Text>
          </View>
          <View style={styles.placeOrderRight}>
            <Text style={styles.placeOrderText}>Place Order</Text>
            <Icon name="chevron-forward" size={20} color="#ffffff" />
          </View>
        </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  shareText: {
    fontSize: 14,
    color: '#00AA00',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  deliveryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  deliveryIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryTextContainer: {
    flex: 1,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  deliverySubtitle: {
    fontSize: 12,
    color: '#666',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 16,
    marginTop: 1,
    gap: 12,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  cartItemWeight: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  cartItemStock: {
    fontSize: 11,
    color: '#999',
  },
  cartItemRight: {
    alignItems: 'flex-end',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#00AA00',
    borderRadius: 8,
    marginBottom: 8,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '700',
    color: '#00AA00',
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  freeDeliveryBanner: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 16,
    marginTop: 1,
    gap: 12,
  },
  deliveryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f4ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  freeDeliveryText: {
    flex: 1,
  },
  freeDeliveryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 2,
  },
  freeDeliverySubtitle: {
    fontSize: 12,
    color: '#666',
  },
  couponsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    marginTop: 1,
  },
  couponsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  recommendationsSection: {
    backgroundColor: '#ffffff',
    marginTop: 8,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  recommendationsList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  recommendationCard: {
    width: 140,
    marginRight: 12,
  },
  recommendationImage: {
    width: 140,
    height: 120,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#00AA00',
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  addButtonText: {
    color: '#00AA00',
    fontSize: 13,
    fontWeight: '700',
  },
  recommendationWeight: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  recommendationName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
    minHeight: 32,
  },
  recommendationPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  recommendationPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  recommendationOriginalPrice: {
    fontSize: 11,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  recommendationDiscount: {
    fontSize: 10,
    color: '#00AA00',
    fontWeight: '600',
    marginBottom: 4,
  },
  seeMoreText: {
    fontSize: 10,
    color: '#00AA00',
    fontWeight: '600',
  },
  billSection: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginTop: 8,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  billLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  billLabel: {
    fontSize: 14,
    color: '#666',
  },
  billValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  smallCartNote: {
    fontSize: 11,
    color: '#ff6b6b',
    marginTop: -8,
    marginBottom: 12,
    marginLeft: 24,
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  grandTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  grandTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  gstinButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    marginTop: 8,
  },
  gstinLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  gstinIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f4ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gstinTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 2,
  },
  gstinSubtitle: {
    fontSize: 11,
    color: '#666',
    flexWrap: 'wrap',
    maxWidth: 240,
  },
  instructionsSection: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginTop: 8,
  },
  instructionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  instructionCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    position: 'relative',
  },
  instructionCardSelected: {
    borderColor: '#00AA00',
    backgroundColor: '#f0f9f0',
  },
  instructionCheckbox: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionCheckboxSelected: {
    borderColor: '#00AA00',
    backgroundColor: '#ffffff',
  },
  instructionLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  addressSection: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginTop: 8,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  changeButton: {
    fontSize: 14,
    color: '#00AA00',
    fontWeight: '600',
  },
  addressText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    marginLeft: 28,
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
    gap: 12,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  paymentInfo: {
    justifyContent: 'center',
  },
  paymentLabel: {
    fontSize: 10,
    color: '#666',
  },
  paymentName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  placeOrderButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#00AA00',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeOrderContent: {
    alignItems: 'flex-start',
  },
  placeOrderAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  placeOrderTotal: {
    fontSize: 10,
    color: '#ffffff',
    opacity: 0.9,
  },
  placeOrderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  placeOrderText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
});

export default CheckoutScreen;

