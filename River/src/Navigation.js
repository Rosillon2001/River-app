import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from "./screens/HomeScreen";
import ExploreScreen from "./screens/ExploreScreen";
import ProfileScreen from "./screens/ProfileScreen";

import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Navigation() {

    const auth = false

    return (
        <NavigationContainer>
            {auth ? (
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            if (route.name === 'Home') {
                                iconName = focused ? 'home' : 'home-outline'
                            }
                            if (route.name === 'Explore') {
                                iconName = focused ? 'search' : 'search-outline'
                            }
                            if (route.name === 'Profile') {
                                iconName = focused ? 'person' : 'person-outline'
                            }
                            return <Ionicons name={iconName} size={size} color={color} />
                        }
                    })
                    }>
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Explore" component={ExploreScreen} />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                </Tab.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    )
}
