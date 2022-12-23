import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
const {width} = Dimensions.get('screen');

const CustomCarousel = ({image}) => {
  return (
    <View style={{paddingHorizontal: 10}}>
      <Carousel
        loop
        width={width - 20}
        height={width / 2}
        autoPlay={true}
        data={image}
        scrollAnimationDuration={3000}
        renderItem={({item}) => (
          <View style={styles.carousel}>
            <Image source={item.img} style={styles.image}></Image>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '99%',
    borderRadius: 15,
    height: '90%',
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'center',
    color: '#23a2bd',
    fontWeight: 'semibold',
    fontFamily: 'serif',
    fontSize: 20,
  },
});
