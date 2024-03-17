import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DataProvider } from './src/hooks/hooks';
import Login from './src/pages/login';
import Home from './src/pages/home';
import Order from './src/pages/placeOrders';
import OrderRecipt from './src/pages/orderRecipt';
import Account from './src/pages/account';
import OrderList from './src/pages/orderList';
import Saved from './src/pages/saved';
import ForTest from './src/pages/for_test';



export type RootStackPramList = {

  Login: undefined;
  Home: undefined;
  Order: undefined;
  OrderRecipt: undefined;
  Account: undefined;
  OrderList: undefined;
  Saved: undefined;
  ForTest: undefined;

}
const Stack = createNativeStackNavigator<RootStackPramList>()


export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Order" component={Order} options={{ headerShown: false }} />
          <Stack.Screen name="OrderRecipt" component={OrderRecipt} options={{ headerShown: false }} />
          <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
          <Stack.Screen name="OrderList" component={OrderList} options={{ headerShown: false }} />
          <Stack.Screen name="Saved" component={Saved} options={{ headerShown: false }} />
          <Stack.Screen name="ForTest" component={ForTest} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}