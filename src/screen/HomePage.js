import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Earth from '../assets/location/earth.png';
import Logo from '../assets/location/logo.png';
import Location1 from '../assets/location/location1.png';
import Location2 from '../assets/location/location2.png';
import Carousel from 'react-native-reanimated-carousel';

const {width} = Dimensions.get('screen');

const HomePage = () => {
  const image = [
    {name: 'Earth', img: Earth},
    {name: 'Abadango', img: Location1},
    {name: "Worldender's lair", img: Location2},
  ];
  return (
    <View style={{flex: 1}}>
      <Image
        source={Logo}
        style={{
          resizeMode: 'contain',
          width: width,
          height: 150,
        }}></Image>
      <Carousel
        style={{borderColor: 'none'}}
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={image}
        scrollAnimationDuration={3000}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              width: '90%',
              alignSelf: 'center',
              paddingBottom: 10,
            }}>
            <Image
              source={item.img}
              style={{
                width: '100%',
                borderRadius: 15,
                height: '90%',
                resizeMode: 'contain',
              }}></Image>
            <Text
              style={{
                textAlign: 'center',
                color: '#23a2bd',
                fontWeight: 'semibold',
                fontFamily: 'serif',
                fontSize: 20,
              }}>
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
