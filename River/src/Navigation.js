import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from "react-native-elements";

import { useSelector } from "react-redux";

import HomeScreen from "./screens/HomeScreen";
import ExploreScreen from "./screens/ExploreScreen";
import ProfileScreen from "./screens/ProfileScreen";

import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Navigation() {

    const [auth, setAuth] = useState(false);
    const user = useSelector(state => state.user);

    useEffect(() => {
        readToken()
    }, [])

    const readToken = async () => {
        const token = await AsyncStorage.getItem('TOKEN')
        setAuth(!!token)
    }

    return (
        <NavigationContainer>
            {auth ? (
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            if (route.name === 'Home') {
                                iconName = focused ? 'home' : 'home-outline'
                                return <Ionicons name={iconName} size={size} color={color} />
                            }
                            if (route.name === 'Explore') {
                                iconName = focused ? 'search' : 'search-outline'
                                return <Ionicons name={iconName} size={size} color={color} />
                            }
                            if (route.name === 'Profile') {                                
                                return <Avatar size={"small"} rounded title={user.username ? user.username.charAt(0) : null} source={{ uri: user.picture }} />
                            }
                        },
                        tabBarLabel: () => {
                            return null
                        }
                    })
                    }>
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Explore" component={ExploreScreen} />
                    <Tab.Screen name="Profile" options={{ headerTitle: user.username, headerShadowVisible: false }}>
                        {() => <ProfileScreen onAuthChange={setAuth} />}
                    </Tab.Screen>
                </Tab.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="Login">
                        {(props) => <LoginScreen {...props} onAuthChange={setAuth} />}
                    </Stack.Screen>
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    )
}
