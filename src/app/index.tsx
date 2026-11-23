
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Alert,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';


const COLORS = {
  header: '#292929',
  background: '#16A34A',
  white: '#FFFFFF',
  black: '#171717',
};

export default function WelcomeScreen() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const logoSize = Math.min(width * 0.51, 230);
  const logoFontSize = logoSize * 0.72;

  const handleLogin = () => {
    Alert.alert('Log in', 'The login screen will be implemented next.');
  };

  const handleSignup = () => {
    Alert.alert('Sign up', 'The registration screen will be implemented next.');
  };

  const handleTrackPickup = () => {
    Alert.alert('Track Pickup', 'Pickup tracking will be implemented next.');
  };

  return (
    <View style={styles.container}>
      <StatusBar
          style="light" />
        

      {/* HEADER */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top,
          },
        ]}
      >
        <View style={styles.headerContent}>
          <Pressable
            style={styles.trackButton}
            onPress={handleTrackPickup}
          >
            <Text style={styles.trackIcon}>♧</Text>
            <Text style={styles.trackText}>TRACK PICKUP</Text>
          </Pressable>

          <View style={styles.headerActions}>
            <Pressable
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <Text style={styles.loginText}>Log in</Text>
            </Pressable>

            <Pressable
              style={styles.signupButton}
              onPress={handleSignup}
            >
              <Text style={styles.signupText}>Sign up for free</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* WELCOME CONTENT */}
      <View style={styles.welcomeContainer}>
        <View
          style={[
            styles.mainContent,
            {
              paddingTop: Math.max(28, height * 0.045),
            },
          ]}
        >
          {/* RECYCLING LOGO */}
          <View
            style={[
              styles.logoCircle,
              {
                width: logoSize,
                height: logoSize,
                borderRadius: logoSize / 2,
              },
            ]}
          >
            <Text
              style={[
                styles.recycleLogo,
                {
                  fontSize: logoFontSize,
                },
              ]}
            >
              ♻️
            </Text>
          </View>

          {/* APP NAME */}
          <View style={styles.brandContainer}>
            <Text style={styles.brandText}>
              Recycle
            </Text>

            <Text style={styles.brandText}>
              Connect
            </Text>
          </View>

          {/* TAGLINE */}
          <Text style={styles.tagline}>
            Recycle. Earn. Sustain.
          </Text>
        </View>

        {/* VERSION */}
        <View
          style={[
            styles.versionContainer,
            {
              paddingBottom: Math.max(20, insets.bottom + 12),
            },
          ]}
        >
          <Text style={styles.versionText}>v1.0.0</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    backgroundColor: COLORS.header,
  },

  headerContent: {
    minHeight: 56,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    flexShrink: 1,
  },

  trackIcon: {
    color: COLORS.white,
    fontSize: 30,
  },

  trackText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.3,
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  loginButton: {
    minHeight: 40,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.white,
    borderRadius: 9,
  },

  loginText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
  },

  signupButton: {
    minHeight: 40,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 9,
  },

  signupText: {
    color: COLORS.black,
    fontSize: 13,
    fontWeight: '500',
  },

  welcomeContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    overflow: 'hidden',
    alignItems: 'center',
  },

  mainContent: {
    width: '100%',
    alignItems: 'center',
  },

  logoCircle: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  recycleLogo: {
    includeFontPadding: false,
    textAlign: 'center',
  },

  brandContainer: {
    alignItems: 'center',
    marginTop: 15,
  },

  brandText: {
    color: COLORS.white,
    fontSize: 48,
    fontWeight: '800',
    lineHeight: 60,
    letterSpacing: -1.5,
    textAlign: 'center',
  },

  tagline: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '400',
    marginTop: 12,
    textAlign: 'center',
  },

  versionContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: '100%',
  },

  versionText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '400',
  },
});
