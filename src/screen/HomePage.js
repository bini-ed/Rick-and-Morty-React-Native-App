import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Earth from '../assets/location/earth.png';
import Logo from '../assets/location/logo.png';
import Location1 from '../assets/location/location1.png';
import Location2 from '../assets/location/location2.png';
import Carousel from 'react-native-reanimated-carousel';
import {getEpisodeService} from '../services/episodeService';
import CustomCarousel from '../components/CustomCarousel';
import AppText from '../components/AppText';

const {width} = Dimensions.get('screen');

const HomePage = () => {
  const image = [
    {name: 'Earth', img: Earth},
    {name: 'Abadango', img: Location1},
    {name: "Worldender's lair", img: Location2},
  ];
  const [episode, setEpisode] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setRefresh(true);
    getEpisode();
    setRefresh(false);
  };

  useEffect(() => {
    getEpisode();
  }, []);

  const getEpisode = async () => {
    setLoading(true);
    try {
      const {data} = await getEpisodeService();
      if (data.results) {
        setEpisode(data.results);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.error ?? 'Error occured',
      });
    }
    setLoading(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={handleRefresh}></RefreshControl>
      }>
      <Image source={Logo} style={styles.image}></Image>
      <CustomCarousel image={image} />
      <View style={{flex: 1}}>
        <AppText
          font={{
            color: '#25A1C7',
            fontSize: 35,
            fontFamily: 'serif',
            fontWeight: '500',
            paddingLeft: 20,
          }}
          children={'Episodes'}
        />
        {loading ? (
          <ActivityIndicator animating={loading} size={35} color="lightblue" />
        ) : (
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {episode.map((item, index) => (
              <View key={index} style={styles.episodeContainer}>
                <AppText
                  font={{
                    color: 'grey',
                    fontSize: 15,
                  }}>
                  {item.name}
                </AppText>
                <AppText
                  font={{
                    color: 'grey',
                    fontSize: 15,
                  }}>
                  {item.episode}
                </AppText>
                <AppText
                  font={{
                    color: 'grey',
                    fontSize: 15,
                  }}>
                  {item.air_date}
                </AppText>
                <AppText
                  font={{
                    color: 'grey',
                    fontSize: 15,
                  }}>
                  {new Date(item.created).toDateString()}
                </AppText>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 70,
  },
  image: {
    resizeMode: 'contain',
    width: width,
    height: 150,
  },
  episodeContainer: {
    backgroundColor: 'whitesmoke',
    margin: 10,
    width: width / 2 - 20,
    borderRadius: 10,
    padding: 10,
    elevation: 0.8,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: width - 2 - 19},
    shadowRadius: 8,
  },
});
