import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from "react-native-elements";
import { Image } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/ducks/user";

import HomeScreen from "./screens/HomeScreen";
import ExploreScreen from "./screens/ExploreScreen";
import ProfileScreen from "./screens/ProfileScreen";

import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Navigation() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        dispatch(getUser())
    }, [])

    return (
        <NavigationContainer>
            {!!user ? (
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
                                iconName = focused ? 'person' : 'person-outline'
                                return user?.picture ? <Avatar size={"small"} title={user?.username.charAt(0)} rounded source={{ uri: user?.picture }} /> : <Ionicons name={iconName} size={size} color={color} />
                            }
                        },
                        tabBarLabel: () => {
                            return null
                        },
                        headerLeft: () => {
                            if (route.name === 'Home') {
                                return <Image source={require('../assets/River.png')} style={{ height: 35, width: 35, alignSelf: 'center', marginLeft: 20 }} />
                            }
                        }
                    })
                    }>
                    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShadowVisible: false, headerTitle: 'River'}} />
                    <Tab.Screen name="Explore" component={ExploreScreen} options={{ headerShadowVisible: false }} />
                    <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerTitle: user?.username ? user?.username : "Profile", headerShadowVisible: false }}/>
                </Tab.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="Login">
                        {(props) => <LoginScreen {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    )
}
