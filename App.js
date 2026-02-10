import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from './context/app-context';
import BudgetPlanner from './screens/BudgetPlanner';
import CartScreen from './screens/CartScreen';
import ContactScreen from './screens/ContactScreen';
import EventsScreen from './screens/EventsScreen';
import ExploreCategoriesScreen from './screens/ExploreCategoriesScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import ProductsScreen from './screens/ProductsScreen';
import ServicesScreen from './screens/ServicesScreen';
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
      </Stack.Navigator>
    </NavigationContainer>
    </AppProvider>
  );
}
