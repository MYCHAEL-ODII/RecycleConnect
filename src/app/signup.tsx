
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

export default function SignupScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSignup = () => {
    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Missing information', 'Please complete all fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        'Weak password',
        'Your password must contain at least 8 characters.'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Your passwords do not match.');
      return;
    }

    if (!acceptedTerms) {
      Alert.alert(
        'Terms and Conditions',
        'Please accept the Terms and Conditions and Privacy Policy.'
      );
      return;
    }

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
              {/* Back button */}
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
                  Create Your Account
                </Text>

                <Text style={styles.subtitle}>
                  Join RecycleConnect and start recycling for rewards today!
                </Text>
              </View>

              {/* Registration form */}
              <View style={styles.formSection}>

                {/* Full Name */}
                <View style={styles.fieldGroup}>
                  <View style={styles.labelRow}>
                    <Text style={styles.fieldIcon}>♙</Text>
                    <Text style={styles.label}>Full Name</Text>
                  </View>

                  <TextInput
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Enter your full name"
                    placeholderTextColor="#8996A8"
                    style={styles.input}
                    autoCapitalize="words"
                  />
                </View>

                {/* Email */}
                <View style={styles.fieldGroup}>
                  <View style={styles.labelRow}>
                    <Text style={styles.fieldIcon}>✉</Text>
                    <Text style={styles.label}>Email Address</Text>
                  </View>

                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="example@email.com"
                    placeholderTextColor="#8996A8"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                {/* Phone Number */}
                <View style={styles.fieldGroup}>
                  <View style={styles.labelRow}>
                    <Text style={styles.fieldIcon}>♧</Text>
                    <Text style={styles.label}>Phone Number</Text>
                  </View>

                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Enter your phone number"
                    placeholderTextColor="#8996A8"
                    style={styles.input}
                    keyboardType="phone-pad"
                  />
                </View>

                {/* Password */}
                <View style={styles.fieldGroup}>
                  <View style={styles.labelRow}>
                    <Text style={styles.fieldIcon}>♙</Text>
                    <Text style={styles.label}>Password</Text>
                  </View>

                  <View style={styles.passwordContainer}>
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Create a password"
                      placeholderTextColor="#8996A8"
                      style={styles.passwordInput}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                    />

                    <Pressable
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                    >
                      <Text style={styles.eyeIcon}>
                        {showPassword ? '◉' : '◎'}
                      </Text>
                    </Pressable>
                  </View>

                  <Text style={styles.passwordHint}>
                    Use at least 8 characters.
                  </Text>
                </View>

                {/* Confirm Password */}
                <View style={styles.fieldGroup}>
                  <View style={styles.labelRow}>
                    <Text style={styles.fieldIcon}>✓</Text>
                    <Text style={styles.label}>Confirm Password</Text>
                  </View>

                  <View style={styles.passwordContainer}>
                    <TextInput
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      placeholder="Confirm your password"
                      placeholderTextColor="#8996A8"
                      style={styles.passwordInput}
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                    />

                    <Pressable
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      style={styles.eyeButton}
                    >
                      <Text style={styles.eyeIcon}>
                        {showConfirmPassword ? '◉' : '◎'}
                      </Text>
                    </Pressable>
                  </View>
                </View>

                {/* Terms and Conditions */}
                <View style={styles.termsContainer}>
                  <Pressable
                    onPress={() => setAcceptedTerms(!acceptedTerms)}
                    style={[
                      styles.checkbox,
                      acceptedTerms && styles.checkboxChecked,
                    ]}
                  >
                    {acceptedTerms && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </Pressable>

                  <View style={styles.termsTextContainer}>
                    <Text style={styles.termsText}>
                      I agree to the{' '}
                    </Text>

                    <Pressable
                      onPress={() =>
                        Alert.alert(
                          'Terms and Conditions',
                          'Terms and Conditions page will be connected later.'
                        )
                      }
                    >
                      <Text style={styles.termsLink}>
                        Terms and Conditions
                      </Text>
                    </Pressable>

                    <Text style={styles.termsText}> and </Text>

                    <Pressable
                      onPress={() =>
                        Alert.alert(
                          'Privacy Policy',
                          'Privacy Policy page will be connected later.'
                        )
                      }
                    >
                      <Text style={styles.termsLink}>
                        Privacy Policy
                      </Text>
                    </Pressable>

                    <Text style={styles.termsText}>.</Text>
                  </View>
                </View>

                {/* Create Account */}
                <Pressable
                  onPress={handleSignup}
                  style={styles.createAccountButton}
                >
                  <Text style={styles.createAccountText}>
                    Create Account
                  </Text>
                </Pressable>

                {/* Login link */}
                <View style={styles.loginContainer}>
                  <Text style={styles.loginPrompt}>
                    Already have an account?{' '}
                  </Text>

                  <Pressable onPress={() => router.push('/login')}>
                    <Text style={styles.loginLink}>Login</Text>
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
    marginBottom: 30,
  },
  backText: {
    color: COLORS.green,
    fontSize: 15,
    fontWeight: '700',
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: 30,
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
    textAlign: 'center',
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
  fieldGroup: {
    marginBottom: 18,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  fieldIcon: {
    color: COLORS.buttonGreen,
    fontSize: 18,
    width: 16,
    textAlign: 'center',
  },
  label: {
    color: COLORS.dark,
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    height: 51,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 17,
    fontSize: 14,
    color: COLORS.dark,
    backgroundColor: COLORS.white,
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
  passwordHint: {
    color: '#8A9BB3',
    fontSize: 12,
    marginTop: 6,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 18,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#8996A8',
    borderRadius: 3,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.buttonGreen,
    borderColor: COLORS.buttonGreen,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  termsTextContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  termsText: {
    color: COLORS.muted,
    fontSize: 12,
  },
  termsLink: {
    color: COLORS.green,
    fontSize: 12,
    fontWeight: '700',
  },
  createAccountButton: {
    height: 56,
    backgroundColor: COLORS.buttonGreen,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  createAccountText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 44,
  },
  loginPrompt: {
    color: COLORS.muted,
    fontSize: 14,
  },
  loginLink: {
    color: COLORS.green,
    fontSize: 14,
    fontWeight: '700',
  },
});
