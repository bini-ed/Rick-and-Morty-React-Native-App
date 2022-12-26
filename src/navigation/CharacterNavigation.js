import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Characters from '../screen/Characters';
import CharacterDetail from '../screen/CharacterDetail';

const CharacterNavigation = () => {
  const HomeStack = createStackNavigator();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Character"
        component={Characters}></HomeStack.Screen>
      <HomeStack.Screen
        name="CharacterDetail"
        options={{headerShown: false}}
        component={CharacterDetail}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

export default CharacterNavigation;

const styles = StyleSheet.create({});
