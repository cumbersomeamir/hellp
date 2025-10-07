import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList} from '../navigation/AppNavigator';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {incrementQuantity, decrementQuantity} from '../store/cartSlice';
import {products} from '../constants/products';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

const CheckoutScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {items: cartItems} = useAppSelector(state => state.cart);
  const [selectedInstructions, setSelectedInstructions] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Get actual cart items with product details
  const actualCartItems = cartItems.map(cartItem => {
    const product = products.find(p => p.id === cartItem.productId);
    return {
      id: cartItem.productId,
      name: product?.name || 'Unknown Product',
      weight: product?.quantity || '1 kg',
      price: product?.price || 0,
      quantity: cartItem.quantity,
      image: product?.picture || 'https://via.placeholder.com/80',
    };
  });

  const deliveryInstructions = [
    {id: 'record', icon: 'record-circle-outline', label: 'Record\nand hold'},
    {id: 'avoid-bell', icon: 'bell-off-outline', label: 'Avoid ringing\nbell'},
    {id: 'no-bell', icon: 'bell-outline', label: "Don't ring\nthe bell"},
    {id: 'other', icon: 'ellipsis-horizontal-outline', label: ''},
  ];

  // Calculate bill details based on actual cart items
  const itemsTotal = actualCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const feedingIndiaDonation = 1;
  const deliveryCharge = itemsTotal >= 99 ? 0 : 20;
  const handlingCharge = 11;
  const smallCartCharge = itemsTotal >= 99 ? 0 : 20;
  const grandTotal = itemsTotal + feedingIndiaDonation + deliveryCharge + handlingCharge + smallCartCharge;

  const handleQuantityChange = (itemId: string, change: number) => {
    if (change > 0) {
      dispatch(incrementQuantity(itemId));
    } else {
      dispatch(decrementQuantity(itemId));
    }
  };

  const toggleInstruction = (id: string) => {
    setSelectedInstructions(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  const handleCityChange = () => {
    // Simple city selection - in real app this would open a modal or navigate to city selection
    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'];
    const currentIndex = cities.indexOf(selectedCity);
    const nextIndex = (currentIndex + 1) % cities.length;
    setSelectedCity(cities[nextIndex]);
  };

  const handlePlaceOrder = () => {
    setShowConfirmation(true);
  };

  const handleConfirmOrder = async () => {
    try {
      setShowConfirmation(false);
      
      // Prepare order data
      const orderData = {
        userId: 'user_123', // In real app, get from auth context
        items: actualCartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          name: item.name,
          weight: item.weight,
          price: item.price,
          image: item.image
        })),
        deliveryInfo: {
          city: selectedCity,
          instructions: selectedInstructions,
          scheduledDelivery: 'Delivery scheduled for tomorrow'
        },
        paymentInfo: {
          method: 'Google Pay UPI',
          status: 'pending'
        },
        billDetails: {
          itemsTotal,
          feedingIndiaDonation,
          deliveryCharge,
          handlingCharge,
          smallCartCharge,
          grandTotal
        },
        status: 'pending'
      };

      // Send order to server
      const response = await fetch('http://192.168.29.51:3000/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        console.log('Order placed successfully:', result.data);
        // Navigate back or to order confirmation screen
        navigation.goBack();
      } else {
        console.error('Order failed:', result.message);
        // Show error message to user
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

  const handleCancelOrder = () => {
    setShowConfirmation(false);
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
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Delivery Banner */}
        <View style={styles.deliveryBanner}>
          <View style={styles.deliveryIconContainer}>
            <Icon name="flash" size={16} color="#00AA00" />
          </View>
          <View style={styles.deliveryTextContainer}>
            <Text style={styles.deliveryTitle}>Delivery scheduled for tomorrow</Text>
            <Text style={styles.deliverySubtitle}>Faster shipment will be availble in the future</Text>
          </View>
        </View>

        {/* Cart Items */}
        {actualCartItems.map(item => (
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
              <Text style={styles.cartItemPrice}>₹{item.price * item.quantity}</Text>
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

        {/* Bill Details */}
        <View style={styles.billSection}>
          <Text style={styles.sectionTitle}>Bill details</Text>
          <View style={styles.billRow}>
            <View style={styles.billLeft}>
              <Icon name="receipt-outline" size={16} color="#666" />
              <Text style={styles.billLabel}>Items total</Text>
            </View>
            <Text style={styles.billValue}>₹{itemsTotal}</Text>
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
                <Icon name={instruction.icon} size={20} color="#666" />
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
              <Icon name="location" size={20} color="#FF9800" />
              <Text style={styles.addressTitle}>City</Text>
            </View>
            <TouchableOpacity onPress={handleCityChange}>
              <Text style={styles.changeButton}>Change</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.addressText}>
            {selectedCity}
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
        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
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

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmation}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelOrder}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Confirm Order</Text>
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.modalMessage}>
                Are you sure you want to place this order for ₹{grandTotal}?
              </Text>
              <Text style={styles.modalSubtext}>
                This action cannot be undone.
              </Text>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelOrder}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirmOrder}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  headerSpacer: {
    width: 24,
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
  billSection: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
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
    paddingVertical: 16,
    paddingBottom: 24,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  modalContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
  },
  modalSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#00AA00',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default CheckoutScreen;

