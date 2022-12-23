import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import Search from '../assets/search.png';
import AppColor from '../config/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export default function AppTextInput({value, onChangeText, handleSearch}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={text => onChangeText(text)}
        placeholderTextColor="whitesmoke"
        placeholder="Search Characters"></TextInput>

      <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
        <FontAwesome name="search" size={25}></FontAwesome>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    // backgroundColor: '#CCFFFF',
    backgroundColor: AppColor.primary,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    color: 'grey',
    flex: 0.8,
    height: 45,
  },
  searchBtn: {
    // backgroundColor: 'lightblue',
    backgroundColor: AppColor.secondary,
    height: 45,
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
