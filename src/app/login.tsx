
import React, { useState } from 'react';
import {
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
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const COLORS = {
  green: '#008B45',
  buttonGreen: '#00A83B',
  dark: '#14243A',
  muted: '#64748B',
  border: '#D3DFEB',
  white: '#FFFFFF',
};

export default function LoginScreen() {
  const router = useRouter();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
  if (!emailOrPhone.trim() || !password.trim()) {
    Alert.alert(
      'Missing information',
      'Please enter your email or phone number and password.'
    );
    return;
  }

  router.push('/user-type');
};

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password?',
      'Password recovery will be implemented next.'
    );
  };

  const handleGoogleSignIn = () => {
    router.push('/user-type');
  };

  return (
    <LinearGradient
      colors={['#F0FFF6', '#D1FAE5']}
      locations={[0, 1]}
      style={styles.background}
    >
      <StatusBar style="dark" />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.card}>
              {/* Back */}
              <Pressable
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <Text style={styles.backText}>←  Back</Text>
              </Pressable>

              {/* Branding */}
              <View style={styles.brandSection}>
                <Text style={styles.recycleIcon}>♻️</Text>

                <Text style={styles.brandName}>
                  Recycle Connect
                </Text>

                <Text style={styles.heading}>
                  Welcome Back!
                </Text>

                <Text style={styles.subtitle}>
                  Login to continue recycling and earning rewards.
                </Text>
              </View>

              {/* Email / Phone */}
              <View style={styles.formSection}>
                <Text style={styles.label}>
                  Email or Phone Number
                </Text>

                <TextInput
                  value={emailOrPhone}
                  onChangeText={setEmailOrPhone}
                  placeholder="Enter your email or phone number"
                  placeholderTextColor="#8996A8"
                  style={[styles.input, styles.emailInput]}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                {/* Password */}
                <Text style={[styles.label, styles.passwordLabel]}>
                  Password
                </Text>

                <View style={styles.passwordContainer}>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#8996A8"
                    secureTextEntry={!showPassword}
                    style={styles.passwordInput}
                    autoCapitalize="none"
                  />

                  <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                    accessibilityLabel={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    <Text style={styles.eyeIcon}>
                      {showPassword ? '◉' : '◎'}
                    </Text>
                  </Pressable>
                </View>

                {/* Forgot Password */}
                <Pressable
                  onPress={handleForgotPassword}
                  style={styles.forgotButton}
                >
                  <Text style={styles.forgotText}>
                    Forgot Password?
                  </Text>
                </Pressable>

                {/* Sign In */}
                <Pressable
                  onPress={handleSignIn}
                  style={styles.signInButton}
                >
                  <Text style={styles.signInText}>
                    Sign In
                  </Text>
                </Pressable>

                {/* OR Divider */}
                <View style={styles.dividerContainer}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.orText}>OR</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Google */}
                <Pressable
                  onPress={handleGoogleSignIn}
                  style={styles.googleButton}
                >
                  <Text style={styles.googleIcon}>G</Text>
                  <Text style={styles.googleText}>
                    Continue with Google
                  </Text>
                </Pressable>

                <View style={styles.signupContainer}>
                <Text style={styles.signupPrompt}>
                    Don't have an account?{' '}
                </Text>

                <Pressable onPress={() => router.push('/signup')}>
                    <Text style={styles.signupLink}>Sign up</Text>
                </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  card: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: COLORS.white,
    borderRadius: 28,
    paddingHorizontal: 38,
    paddingTop: 36,
    paddingBottom: 38,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 34,
  },
  backText: {
    color: COLORS.green,
    fontSize: 15,
    fontWeight: '700',
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  recycleIcon: {
    fontSize: 39,
    marginBottom: 22,
  },
  brandName: {
    color: COLORS.green,
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 24,
  },
  heading: {
    color: COLORS.dark,
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 10,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },
  formSection: {
    width: '100%',
  },
  label: {
    color: COLORS.dark,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  input: {
    height: 51,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 17,
    fontSize: 14,
    color: COLORS.dark,
    backgroundColor: COLORS.white,
  },
  emailInput: {
    borderColor: '#00C853',
  },
  passwordLabel: {
    marginTop: 22,
  },
  passwordContainer: {
    height: 51,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 17,
    fontSize: 14,
    color: COLORS.dark,
  },
  eyeButton: {
    paddingHorizontal: 15,
    height: '100%',
    justifyContent: 'center',
  },
  eyeIcon: {
    color: '#647A99',
    fontSize: 22,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 15,
    marginBottom: 25,
  },
  forgotText: {
    color: COLORS.green,
    fontSize: 13,
    fontWeight: '700',
  },
  signInButton: {
    height: 56,
    backgroundColor: COLORS.buttonGreen,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  signInText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 45,
    gap: 14,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D8E1EC',
  },
  orText: {
    color: '#8A9BB3',
    fontSize: 13,
  },
  googleButton: {
    height: 51,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
  },
  googleIcon: {
    color: '#4285F4',
    fontSize: 21,
    fontWeight: '800',
  },
  googleText: {
    color: COLORS.dark,
    fontSize: 14,
    fontWeight: '700',
  },
  signupContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 24,
},

signupPrompt: {
  color: '#64748B',
  fontSize: 14,
},

signupLink: {
  color: '#008B45',
  fontSize: 14,
  fontWeight: '700',
},
});
