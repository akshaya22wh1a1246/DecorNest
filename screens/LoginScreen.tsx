import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useApp } from '@/context/app-context';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={['#FFD6E0', '#E6E0FF', '#FFFFFF']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* Logo Section */}
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={['#E6E0FF', '#FFD6E0']}
                style={styles.logoCircle}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <IconSymbol name="sparkles" size={60} color="#8B5CF6" />
              </LinearGradient>
              <ThemedText style={styles.appName}>Decor Nest</ThemedText>
              <ThemedText style={styles.tagline}>Your Event, Our Expertise</ThemedText>
            </View>

            {/* Form Container */}
            <View style={styles.formContainer}>
              <ThemedText style={styles.title}>Welcome Back!</ThemedText>
              <ThemedText style={styles.subtitle}>Login to continue your journey</ThemedText>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIconContainer}>
                  <IconSymbol name="envelope.fill" size={20} color="#8B5CF6" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIconContainer}>
                  <IconSymbol name="lock.fill" size={20} color="#8B5CF6" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  <IconSymbol
                    name={showPassword ? 'eye.slash' : 'eye'}
                    size={22}
                    color="#8B5CF6"
                  />
                </TouchableOpacity>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity style={styles.forgotPassword} activeOpacity={0.7}>
                <ThemedText style={styles.forgotPasswordText}>Forgot Password?</ThemedText>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={handleLogin}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={isLoading ? ['#CCC', '#999'] : ['#E6E0FF', '#FFD6E0']}
                  style={styles.button}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <ThemedText style={styles.buttonText}>
                    {isLoading ? 'Logging in...' : 'Login'}
                  </ThemedText>
                </LinearGradient>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <ThemedText style={styles.dividerText}>or</ThemedText>
                <View style={styles.dividerLine} />
              </View>

              {/* Google Login */}
              <TouchableOpacity
                style={styles.googleButtonWrapper}
                onPress={() => Alert.alert('Google Sign In', 'Google authentication will be implemented here')}
                activeOpacity={0.8}
              >
                <View style={styles.googleButton}>
                  <IconSymbol name="globe" size={24} color="#DB4437" />
                  <ThemedText style={styles.googleButtonText}>Continue with Google</ThemedText>
                </View>
              </TouchableOpacity>

              {/* Footer */}
              <View style={styles.footer}>
                <ThemedText style={styles.footerText}>Don't have an account? </ThemedText>
                <TouchableOpacity 
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('Signup')}>
                  <ThemedText style={styles.link}>Sign Up</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    elevation: 8,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E6E0FF',
  },
  inputIconContainer: {
    padding: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 16,
    fontSize: 15,
    color: '#000',
  },
  eyeIcon: {
    padding: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  buttonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 24,
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#2D1B69',
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    fontSize: 14,
    color: '#999',
    marginHorizontal: 16,
  },
  googleButtonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 32,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    gap: 12,
  },
  googleButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  link: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '700',
  },
});