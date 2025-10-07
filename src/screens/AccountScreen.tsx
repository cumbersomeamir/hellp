import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList} from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

const AccountScreen: React.FC<Props> = ({navigation}) => {
  const [hideSensitiveItems, setHideSensitiveItems] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <View style={styles.accountSection}>
          <Text style={styles.accountTitle}>Your account</Text>
          <View style={styles.phoneContainer}>
            <Icon name="call-outline" size={16} color="#666" />
            <Text style={styles.phoneNumber}>+91-9210267867</Text>
          </View>
        </View>

        {/* Birthday Banner */}
        <TouchableOpacity style={styles.birthdayBanner}>
          <View style={styles.birthdayContent}>
            <Text style={styles.birthdayTitle}>Add your birthday</Text>
            <View style={styles.birthdaySubtitle}>
              <Text style={styles.birthdayLink}>Enter details</Text>
              <Icon name="chevron-forward" size={14} color="#00AA00" />
            </View>
          </View>
          <Image
            source={{uri: 'https://via.placeholder.com/60'}}
            style={styles.cakeImage}
          />
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <MaterialCommunityIcons
                name="wallet-outline"
                size={24}
                color="#333"
              />
            </View>
            <Text style={styles.actionLabel}>Blinkit Money</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <MaterialCommunityIcons
                name="headset"
                size={24}
                color="#333"
              />
            </View>
            <Text style={styles.actionLabel}>Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <MaterialCommunityIcons
                name="credit-card-outline"
                size={24}
                color="#333"
              />
            </View>
            <Text style={styles.actionLabel}>Payments</Text>
          </TouchableOpacity>
        </View>

        {/* App Update Available */}
        <TouchableOpacity style={styles.updateBanner}>
          <View style={styles.updateLeft}>
            <Icon name="notifications-outline" size={20} color="#666" />
            <Text style={styles.updateText}>App Update Available</Text>
          </View>
          <View style={styles.updateRight}>
            <Text style={styles.versionText}>v18.0.31</Text>
            <Icon name="chevron-forward" size={20} color="#666" />
          </View>
        </TouchableOpacity>

        {/* Appearance */}
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={20}
              color="#666"
            />
            <Text style={styles.settingLabel}>Appearance</Text>
          </View>
          <View style={styles.settingRight}>
            <View style={styles.lightBadge}>
              <Text style={styles.lightText}>Light</Text>
            </View>
            <Icon name="chevron-down" size={16} color="#666" />
          </View>
        </TouchableOpacity>

        {/* Hide Sensitive Items */}
        <View style={styles.sensitiveSection}>
          <View style={styles.sensitiveHeader}>
            <View style={styles.sensitiveLeft}>
              <MaterialCommunityIcons
                name="eye-off-outline"
                size={20}
                color="#00AA00"
              />
              <View style={styles.sensitiveTextContainer}>
                <Text style={styles.sensitiveTitle}>Hide sensitive items</Text>
                <Text style={styles.sensitiveSubtitle}>
                  Obscure cigarettes, medicine, products and orders that you
                  don't want others to see.{' '}
                  <Text style={styles.knowMore}>Know more</Text>
                </Text>
              </View>
            </View>
            <Switch
              value={hideSensitiveItems}
              onValueChange={setHideSensitiveItems}
              trackColor={{false: '#d0d0d0', true: '#c8e6c9'}}
              thumbColor={hideSensitiveItems ? '#00AA00' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Your Information Section */}
        <View style={styles.informationSection}>
          <Text style={styles.sectionHeader}>YOUR INFORMATION</Text>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="receipt-outline" size={20} color="#666" />
            <Text style={styles.menuLabel}>Your orders</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="heart-outline" size={20} color="#666" />
            <Text style={styles.menuLabel}>Your wishlist</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons
              name="bookmark-outline"
              size={20}
              color="#666"
            />
            <Text style={styles.menuLabel}>Bookmarked recipes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons
              name="pill"
              size={20}
              color="#666"
            />
            <Text style={styles.menuLabel}>Your prescriptions</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="location-outline" size={20} color="#666" />
            <Text style={styles.menuLabel}>Address book</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
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
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  accountSection: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 1,
  },
  accountTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#666',
  },
  birthdayBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    padding: 16,
    marginBottom: 1,
  },
  birthdayContent: {
    flex: 1,
  },
  birthdayTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  birthdaySubtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  birthdayLink: {
    fontSize: 12,
    color: '#00AA00',
    fontWeight: '600',
  },
  cakeImage: {
    width: 50,
    height: 50,
  },
  quickActions: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 16,
    paddingVertical: 20,
    marginBottom: 8,
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  updateBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 1,
  },
  updateLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  updateText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  updateRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  settingLabel: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lightBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  lightText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  sensitiveSection: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 8,
  },
  sensitiveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  sensitiveLeft: {
    flexDirection: 'row',
    flex: 1,
    gap: 10,
    marginRight: 12,
  },
  sensitiveTextContainer: {
    flex: 1,
  },
  sensitiveTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  sensitiveSubtitle: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  knowMore: {
    color: '#00AA00',
    fontWeight: '600',
  },
  informationSection: {
    backgroundColor: '#ffffff',
    paddingTop: 8,
    paddingBottom: 16,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  menuLabel: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 40,
  },
});

export default AccountScreen;

