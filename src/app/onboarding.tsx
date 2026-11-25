
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

type Interval = 'weekly' | 'biweekly';

const COLORS = {
  green: '#16834B',
  greenDark: '#116B3D',
  greenLight: '#EAF7EE',
  background: '#F7FAF8',
  white: '#FFFFFF',
  dark: '#17231C',
  muted: '#748078',
  border: '#E1E9E3',
  input: '#F9FBF9',
};

export default function OnboardingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ userType?: string }>();

  const isEstate = params.userType === 'estate';

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [interval, setInterval] = useState<Interval>('weekly');
  const [loadingLocation, setLoadingLocation] = useState(false);

  const addressLabel = isEstate ? 'Estate Name' : 'Street Address';
  const addressPlaceholder = isEstate
    ? 'Enter your estate name'
    : 'Enter street name and house number';

    const materials = [
  { id: 'PET Bottles', name: 'PET Bottles', icon: '🧴' },
  { id: 'Cans', name: 'Cans', icon: '🥫' },
  { id: 'Cartons', name: 'Cartons', icon: '📦' },
  { id: 'Glass', name: 'Glass', icon: '🍾' },
];

const toggleMaterial = (material: string) => {
  setSelectedMaterials((previous) =>
    previous.includes(material)
      ? previous.filter((item) => item !== material)
      : [...previous, material]
  );
};

  const handleCurrentLocation = async () => {
    try {
      setLoadingLocation(true);

      const permission =
        await Location.requestForegroundPermissionsAsync();

      if (permission.status !== 'granted') {
        Alert.alert(
          'Location permission required',
          'Allow location access to autofill your pickup address.'
        );
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const results = await Location.reverseGeocodeAsync({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      const place = results[0];

      if (!place) {
        Alert.alert(
          'Address unavailable',
          'We could not identify your address. Please enter it manually.'
        );
        return;
      }

      if (!isEstate) {
        const street = [
          place.streetNumber,
          place.street,
        ].filter(Boolean).join(' ');

        if (street) setAddress(street);
      }

      if (place.city || place.subregion || place.region) {
        setCity(
          place.city || place.subregion || place.region || ''
        );
      }

      if (place.postalCode) {
        setPostalCode(place.postalCode);
      }

      Alert.alert(
        'Location detected',
        'Your available location details have been filled in. Please review them.'
      );
    } catch {
      Alert.alert(
        'Location error',
        'Unable to retrieve your current location. Please enter your address manually.'
      );
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleSave = () => {
  if (!address.trim() || !city.trim()) {
    Alert.alert(
      'Incomplete information',
      `Please enter your ${addressLabel.toLowerCase()} and city.`
    );
    return;
  }

  if (selectedMaterials.length === 0) {
    Alert.alert(
      'Select materials',
      'Please select at least one material you want us to collect.'
    );
    return;
  }

  Alert.alert(
    'Details ready',
    `Your onboarding details have been captured.\n\nMaterials: ${selectedMaterials.join(', ')}\nCollection: ${interval === 'weekly' ? 'Weekly' : 'Bi-Weekly'}\n\nBackend saving will be connected later.`
  );
};
  const showComingSoon = (tab: string) => {
    Alert.alert(
      tab,
      'This section will be available when the main dashboard is implemented.'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <View style={styles.headerBrand}>
            <Text style={styles.brandIcon}>♻</Text>
            <Text style={styles.brandText}>RecycleConnect</Text>
          </View>

          <Pressable
            style={styles.notificationButton}
            onPress={() => showComingSoon('Notifications')}
          >
            <Text style={styles.notificationIcon}>♧</Text>
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.intro}>
            <View style={styles.heroIcon}>
              <Text style={styles.heroEmoji}>
                <Text style={styles.homeIcon}>🏠</Text>
              </Text>
            </View>

            <Text style={styles.title}>
              {isEstate ? 'Estate Address' : 'Household Address'}
            </Text>

            <Text style={styles.subtitle}>
              Set your pickup location and preferred collection schedule.
            </Text>
          </View>

          <Pressable
            style={styles.locationButton}
            onPress={handleCurrentLocation}
            disabled={loadingLocation}
          >
            {loadingLocation ? (
              <ActivityIndicator color={COLORS.greenDark} />
            ) : (
              <Text style={styles.locationIcon}>◎</Text>
            )}

            <View style={styles.locationTextContainer}>
              <Text style={styles.locationTitle}>
                Use My Current Location
              </Text>
              <Text style={styles.locationSubtitle}>
                Autofill available address details
              </Text>
            </View>

            <Text style={styles.autofill}>Auto-fill</Text>
          </Pressable>

          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>{addressLabel}</Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder={addressPlaceholder}
                placeholderTextColor="#9AA59D"
                style={styles.input}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.fieldGroup, styles.halfField]}>
                <Text style={styles.label}>City</Text>
                <TextInput
                  value={city}
                  onChangeText={setCity}
                  placeholder="Enter city"
                  placeholderTextColor="#9AA59D"
                  style={styles.input}
                  autoCapitalize="words"
                />
              </View>

              <View style={[styles.fieldGroup, styles.halfField]}>
                <Text style={styles.label}>Postal Code</Text>
                <TextInput
                  value={postalCode}
                  onChangeText={setPostalCode}
                  placeholder="Postal code"
                  placeholderTextColor="#9AA59D"
                  style={styles.input}
                  keyboardType="number-pad"
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>
                Landmark / Pickup Note{' '}
                <Text style={styles.optional}>(Optional)</Text>
              </Text>
              <TextInput
                value={landmark}
                onChangeText={setLandmark}
                placeholder="e.g. Gate code, near main junction"
                placeholderTextColor="#9AA59D"
                style={[styles.input, styles.landmarkInput]}
                multiline
              />
            </View>
          </View>

                    <View style={styles.materialSection}>
            <View style={styles.materialHeader}>
              <View>
                <Text style={styles.sectionTitle}>
                  Material Selection
                </Text>
                <Text style={styles.sectionSubtitle}>
                  What materials would you like us to collect?
                </Text>
              </View>

              <Ionicons
                name="leaf-outline"
                size={25}
                color={COLORS.green}
                />
            </View>

            <View style={styles.materialGrid}>
              {materials.map((material) => {
                const selected = selectedMaterials.includes(material.id);

                return (
                  <Pressable
                    key={material.id}
                    onPress={() => toggleMaterial(material.id)}
                    style={[
                      styles.materialCard,
                      selected && styles.materialCardSelected,
                    ]}
                  >
                    <View style={styles.materialCardTop}>
                      <Text style={styles.materialEmoji}>
                        {material.icon}
                      </Text>

                      <Ionicons
                        name={
                          selected
                            ? 'checkmark-circle'
                            : 'ellipse-outline'
                        }
                        size={22}
                        color={selected ? COLORS.green : '#A8B4AB'}
                      />
                    </View>

                    <Text
                      style={[
                        styles.materialName,
                        selected && styles.materialNameSelected,
                      ]}
                    >
                      {material.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.materialHint}>
              Select all materials that apply.
            </Text>
          </View>

          <View style={styles.intervalHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Collection Interval
              </Text>
              <Text style={styles.sectionSubtitle}>
                Choose your pickup frequency
              </Text>
            </View>
            <Text style={styles.calendarIcon}>▦</Text>
          </View>

          <View style={styles.intervalRow}>
            <Pressable
              onPress={() => setInterval('weekly')}
              style={[
                styles.intervalCard,
                interval === 'weekly' && styles.selectedCard,
              ]}
            >
              <View style={styles.cardTop}>
                <Text style={styles.cardIcon}>▣</Text>
                {interval === 'weekly' && (
                  <Text style={styles.popularBadge}>
                    MOST POPULAR
                  </Text>
                )}
                <View
                  style={[
                    styles.radio,
                    interval === 'weekly' && styles.radioSelected,
                  ]}
                >
                  {interval === 'weekly' && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </View>

              <Text style={styles.intervalTitle}>Weekly</Text>
              <Text style={styles.intervalDescription}>
                Every week
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setInterval('biweekly')}
              style={[
                styles.intervalCard,
                interval === 'biweekly' && styles.selectedCard,
              ]}
            >
              <View style={styles.cardTop}>
                <Text style={styles.cardIcon}>▦</Text>
                <View
                  style={[
                    styles.radio,
                    interval === 'biweekly' && styles.radioSelected,
                  ]}
                >
                  {interval === 'biweekly' && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </View>

              <Text style={styles.intervalTitle}>Bi-Weekly</Text>
              <Text style={styles.intervalDescription}>
                Every 2 weeks
              </Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>
              Save & Continue
            </Text>
            <Text style={styles.saveArrow}>→</Text>
          </Pressable>
        </ScrollView>

        <View style={styles.bottomNav}>
          {[
            { icon: '⌂', label: 'Home' },
            { icon: '◷', label: 'History' },
            { icon: '★', label: 'Reward' },
            { icon: '♙', label: 'Profile' },
          ].map((item, index) => (
            <Pressable
              key={item.label}
              style={styles.navItem}
              onPress={() => showComingSoon(item.label)}
            >
              <Text
                style={[
                  styles.navIcon,
                  index === 0 && styles.activeNav,
                ]}
              >
                {item.icon}
              </Text>
              <Text
                style={[
                  styles.navLabel,
                  index === 0 && styles.activeNav,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  header: {
    height: 58,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: COLORS.greenLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: COLORS.green,
    fontSize: 34,
    lineHeight: 38,
    marginTop: -4,
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandIcon: {
    fontSize: 23,
    color: COLORS.green,
  },
  brandText: {
    color: COLORS.dark,
    fontSize: 16,
    fontWeight: '800',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIcon: {
    fontSize: 22,
    color: COLORS.dark,
  },
  notificationDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F4B740',
    right: 9,
    top: 8,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  intro: {
    alignItems: 'center',
    marginBottom: 24,
  },
  heroIcon: {
    width: 76,
    height: 76,
    borderRadius: 25,
    backgroundColor: '#D9F4DE',
    borderWidth: 1,
    borderColor: '#BDE8C6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  heroEmoji: {
    fontSize: 42,
    color: COLORS.dark,
  },
  title: {
    color: COLORS.dark,
    fontSize: 27,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 320,
  },
  locationButton: {
    minHeight: 76,
    backgroundColor: '#E2F6E7',
    borderWidth: 1,
    borderColor: '#B8E4C3',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  locationIcon: {
    fontSize: 29,
    color: COLORS.green,
    marginRight: 10,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationTitle: {
    color: COLORS.greenDark,
    fontSize: 15,
    fontWeight: '800',
  },
  locationSubtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 3,
  },
  autofill: {
    color: COLORS.green,
    fontSize: 12,
    fontWeight: '800',
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 12,
  },
  form: {
    gap: 16,
  },
  fieldGroup: {
    flex: 1,
  },
  label: {
    color: COLORS.dark,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  optional: {
    color: COLORS.muted,
    fontWeight: '400',
  },
  input: {
    minHeight: 54,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 15,
    color: COLORS.dark,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfField: {
    minWidth: 0,
  },
  landmarkInput: {
    minHeight: 58,
    paddingTop: 16,
    textAlignVertical: 'center',
  },

  materialSection: {
  marginTop: 24,
},

materialHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 14,
},

materialGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 12,
},

materialCard: {
  width: '48%',
  minHeight: 105,
  backgroundColor: COLORS.white,
  borderWidth: 1.5,
  borderColor: COLORS.border,
  borderRadius: 16,
  padding: 13,
  justifyContent: 'space-between',
},

materialCardSelected: {
  borderColor: COLORS.green,
  backgroundColor: '#F2FBF4',
},

materialCardTop: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

materialEmoji: {
  fontSize: 29,
},

materialName: {
  color: COLORS.dark,
  fontSize: 14,
  fontWeight: '700',
  marginTop: 12,
},

materialNameSelected: {
  color: COLORS.greenDark,
},

materialHint: {
  color: COLORS.muted,
  fontSize: 12,
  marginTop: 10,
},

  intervalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 14,
  },
  sectionTitle: {
    color: COLORS.dark,
    fontSize: 17,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
  },
  calendarIcon: {
    fontSize: 25,
    color: COLORS.green,
  },
  intervalRow: {
    flexDirection: 'row',
    gap: 12,
  },
  intervalCard: {
    flex: 1,
    minHeight: 132,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 19,
    padding: 14,
    justifyContent: 'space-between',
  },
  selectedCard: {
    borderColor: COLORS.green,
    borderWidth: 2,
    backgroundColor: '#F2FBF4',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 28,
    gap: 5,
  },
  cardIcon: {
    color: COLORS.green,
    fontSize: 20,
  },
  popularBadge: {
    flex: 1,
    color: COLORS.white,
    backgroundColor: COLORS.green,
    fontSize: 8,
    fontWeight: '800',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
    textAlign: 'center',
  },
  radio: {
    width: 21,
    height: 21,
    borderWidth: 1.5,
    borderColor: '#A8B4AB',
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },
  radioSelected: {
    borderColor: COLORS.green,
  },
  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: COLORS.green,
  },
  intervalTitle: {
    color: COLORS.dark,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 12,
  },
  intervalDescription: {
    color: COLORS.green,
    fontSize: 13,
    marginTop: 4,
  },
  saveButton: {
    minHeight: 56,
    backgroundColor: COLORS.green,
    borderRadius: 16,
    marginTop: 23,
    marginBottom: 6,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  saveArrow: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: '700',
  },
  bottomNav: {
    minHeight: 67,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 2 : 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  navIcon: {
    color: '#89948C',
    fontSize: 23,
    fontWeight: '700',
  },
  navLabel: {
    color: '#89948C',
    fontSize: 11,
    fontWeight: '600',
  },
  activeNav: {
    color: COLORS.green,
  },
  homeIcon: {
  fontSize: 48,
  textAlign: 'center',
  backgroundColor: '#DCFCE7',
},
});
 