import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from './context/app-context';
import AddressManagementScreen from './screens/AddressManagementScreen';
import BudgetPlanner from './screens/BudgetPlanner';
import CartScreen from './screens/CartScreen';
import ContactScreen from './screens/ContactScreen';
import EventsScreen from './screens/EventsScreen';
import ExploreCategoriesScreen from './screens/ExploreCategoriesScreen';
import HelpSupportScreen from './screens/HelpSupportScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import OrdersScreen from './screens/OrdersScreen';
import PaymentMethodsScreen from './screens/PaymentMethodsScreen';
import PaymentScreen from './screens/PaymentScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import ProductsScreen from './screens/ProductsScreen';
import ProfileScreen from './screens/ProfileScreen';
import ServicesScreen from './screens/ServicesScreen';
import SignupScreen from './screens/SignupScreen';
import VendorDashboardScreen from './screens/VendorDashboardScreen';
import WishlistScreen from './screens/WishlistScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName="Login" 
        screenOptions={{ 
          headerShown: false,
          headerStyle: {
            backgroundColor: '#1E88E5',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login', headerShown: false }}
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
          options={{ title: 'Sign Up', headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Decor Nest', headerShown: false }}
        />
        <Stack.Screen 
          name="Products" 
          component={ProductsScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen 
          name="ExploreCategoriesScreen" 
          component={ExploreCategoriesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ProductDetails" 
          component={ProductDetailsScreen}
          options={{ title: 'Décor Details', headerShown: true }}
        />
        <Stack.Screen 
          name="Services" 
          component={ServicesScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen 
          name="Events" 
          component={EventsScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen 
          name="Cart" 
          component={CartScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen 
          name="BudgetPlanner" 
          component={BudgetPlanner}
          options={{ title: 'Your Event Budget', headerShown: true }}
        />
        <Stack.Screen 
          name="Wishlist" 
          component={WishlistScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen 
          name="Contact" 
          component={ContactScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen 
          name="Orders" 
          component={OrdersScreen}
          options={{ title: 'My Orders', headerShown: true }}
        />
        <Stack.Screen 
          name="PaymentMethods" 
          component={PaymentMethodsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Payment" 
          component={PaymentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="VendorDashboard" 
          component={VendorDashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="HelpSupport" 
          component={HelpSupportScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AddressManagement" 
          component={AddressManagementScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </AppProvider>
  );
}
