import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LoginScreen from "../screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import OperacionesScreen from "../screens/OperacionesScreen";
import RegisterScreen from "../screens/RegisterScreen";
import OfertaScreen from "../screens/OfertaScreen";
import ProductosScreen from "../screens/ProductosScreen";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Tabs" component={MyTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    height: 80,
                    paddingTop: 30,
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                },
                tabBarIndicatorStyle: {
                    backgroundColor: 'black'
                }
            }}
        >
            <Tab.Screen name="Operaciones" component={OperacionesScreen} />
            <Tab.Screen name="Productos" component={ProductosScreen} />
            <Tab.Screen name="Oferta" component={OfertaScreen} />
        </Tab.Navigator>
    );
}

export default function MainNavigator() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
