import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AppProvider } from '@/context/app-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AppProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="product-details" options={{ title: 'Product Details', headerShown: true }} />
          <Stack.Screen name="cart" options={{ title: 'Shopping Cart', headerShown: true }} />
          <Stack.Screen name="booking-payment" options={{ title: 'Booking & Payment', headerShown: true }} />
          <Stack.Screen name="order-details" options={{ title: 'Order Details', headerShown: true }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Product Details' }} />
          <Stack.Screen name="booking" options={{ title: 'Book Event' }} />
          <Stack.Screen name="payment" options={{ title: 'Payment' }} />
          <Stack.Screen name="login" options={{ title: 'Login', headerShown: false }} />
          <Stack.Screen name="signup" options={{ title: 'Sign Up', headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </AppProvider>
    </ThemeProvider>
  );
}
