
import React, { useState } from 'react';
import {
  Alert,  
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

type UserType = 'household' | 'estate';

const COLORS = {
  background: '#F8FAFC',
  white: '#FFFFFF',
  dark: '#111827',
  muted: '#64748B',
  border: '#E2E8F0',
  green: '#16A34A',
  selectedBackground: '#F0FDF4',
  householdIconBackground: '#DCFCE7',
  estateIconBackground: '#DBEAFE',
};

export default function UserTypeScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<UserType | null>(null);

  const handleContinue = () => {
  if (!selectedType) return;

  router.push({
    pathname: '/onboarding',
    params: { userType: selectedType },
  });
};
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>♻️</Text>

          <Text style={styles.title}>
            Welcome to{' '}
            <Text>RecycleConnect</Text>
          </Text>

          <Text style={styles.subtitle}>
            How would you like to use RecycleConnect?
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          <Pressable
            onPress={() => setSelectedType('household')}
            style={[
              styles.optionCard,
              selectedType === 'household' && styles.selectedCard,
            ]}
            accessibilityRole="radio"
            accessibilityState={{ selected: selectedType === 'household' }}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: COLORS.householdIconBackground },
              ]}
            >
              <Text style={styles.optionIcon}>🏠</Text>
            </View>

            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Household</Text>
              <Text style={styles.optionDescription}>
                Schedule recycling pickups for your home and earn rewards.
              </Text>
            </View>

            <Text style={styles.arrow}>→</Text>
          </Pressable>

          <Pressable
            onPress={() => setSelectedType('estate')}
            style={[
              styles.optionCard,
              selectedType === 'estate' && styles.selectedCard,
            ]}
            accessibilityRole="radio"
            accessibilityState={{ selected: selectedType === 'estate' }}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: COLORS.estateIconBackground },
              ]}
            >
              <Text style={styles.optionIcon}>🏢</Text>
            </View>

            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Estate</Text>
              <Text style={styles.optionDescription}>
                Manage recycling pickups for an entire estate or community.
              </Text>
            </View>

            <Text style={styles.arrow}>→</Text>
          </Pressable>
        </View>

        {selectedType !== null && (
          <Pressable
            onPress={handleContinue}
            style={styles.continueButton}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
  flexGrow: 1,
  paddingHorizontal: 24,
  paddingTop: 12,
  paddingBottom: 16,
  justifyContent: 'center',
},
header: {
  alignItems: 'center',
  marginBottom: 28,
},
logo: {
  fontSize: 48,
  marginBottom: 12,
},
title: {
  color: COLORS.dark,
  fontSize: 27,
  fontWeight: '800',
  lineHeight: 34,
  textAlign: 'center',
},
subtitle: {
  color: COLORS.muted,
  fontSize: 14,
  lineHeight: 21,
  textAlign: 'center',
  marginTop: 12,
},  
optionsContainer: {
    gap: 24,
  },
  optionCard: {
    minHeight: 190,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 26,
    paddingHorizontal: 24,
    paddingVertical: 26,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
  },
  selectedCard: {
    borderColor: COLORS.green,
    backgroundColor: COLORS.selectedBackground,
  },
  iconContainer: {
    width: 88,
    height: 88,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIcon: {
    fontSize: 48,
  },
  optionTextContainer: {
    flex: 1,
    gap: 12,
  },
  optionTitle: {
    color: COLORS.dark,
    fontSize: 23,
    fontWeight: '800',
  },
  optionDescription: {
    color: COLORS.muted,
    fontSize: 16,
    lineHeight: 25,
  },
  arrow: {
    color: COLORS.green,
    fontSize: 34,
    fontWeight: '400',
  },
  continueButton: {
    height: 56,
    backgroundColor: COLORS.green,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
