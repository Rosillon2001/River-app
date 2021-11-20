import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from "./screens/HomeScreen";
import ExploreScreen from "./screens/ExploreScreen";
import ProfileScreen from "./screens/ProfileScreen";

const tabNavigator = createBottomTabNavigator();

export default function Navigation(){
    return(
        <NavigationContainer>
            <tabNavigator.Navigator
                screenOptions = {({ route }) => ({
                    tabBarIcon:({ focused, color, size}) =>{
                        let iconName;
                        if(route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline'
                        }
                        if(route.name === 'Explore') {
                            iconName = focused ? 'search' : 'search-outline'
                        }
                        if(route.name === 'Profile') {
                            iconName = focused ? 'person' : 'person-outline'
                        }
                        return <Ionicons name={iconName} size={size} color={color}/>
                    }
                })
                }>
                <tabNavigator.Screen name="Home" component = {HomeScreen}/>
                <tabNavigator.Screen name="Explore" component = {ExploreScreen}/>
                <tabNavigator.Screen name="Profile" component = {ProfileScreen}/>
            </tabNavigator.Navigator>
        </NavigationContainer>
    )
}
