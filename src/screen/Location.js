import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getLocationService} from '../services/locationService';
import AppText from '../components/AppText';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const Location = () => {
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadmore, setLoadmore] = useState(false);
  const [nextURL, setNextURL] = useState('');
  const [refresh, setRefresh] = useState(false);
  const {navigate} = useNavigation();

  useEffect(() => {
    getLocation();
  }, []);

  const handelRefresh = () => {
    setRefresh(true);
    getLocation();
    setRefresh(false);
  };

  const getLocation = async () => {
    setLoading(true);
    try {
      const {data} = await getLocationService();

      if (data.results) {
        setLocation(data.results);
      }
      data.info.next ? setNextURL(data.info.next) : setNextURL(null);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.error ?? 'Error occured',
      });
    }
    setLoading(false);
  };

  const loadMore = async () => {
    setLoadmore(true);
    if (nextURL !== null) {
      try {
        const res = await axios.get(nextURL.replace('http:', 'https:'), {});
        const {results} = res.data;
        if (results.length > 0) setLocation([...location, ...results]);
        setNextURL(res.data.info.next);
        setLoadmore(false);
      } catch (err) {
        setLoadmore(false);
        console.log('load more error:', err);
      }
    } else {
      setLoadmore(false);
    }
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      {loading ? (
        <ActivityIndicator animating={loading} color="lightblue" size={30} />
      ) : (
        <>
          <FlatList
            data={location}
            style={{
              flexGrow: 1,
            }}
            onEndReached={() => {
              loadMore();
            }}
            ListHeaderComponent={
              <AppText
                font={{
                  color: '#25A1C7',
                  fontSize: 35,
                  fontFamily: 'serif',
                  fontWeight: '500',
                }}>
                Locations
              </AppText>
            }
            onEndReachedThreshold={0.7}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigate('Characters', {item})}
                style={styles.locationContainer}>
                <AppText
                  font={{
                    color: '#156900',
                    fontWeight: '600',
                    fontFamily: 'serif',
                    fontSize: 18,
                  }}>
                  {item.name}
                </AppText>
                <AppText
                  font={{
                    color: 'black',
                    fontWeight: '200',
                    fontFamily: 'serif',
                    fontSize: 14,
                  }}>
                  {item.type}
                </AppText>
                <AppText
                  font={{
                    color: 'black',
                    fontWeight: '200',
                    fontFamily: 'serif',
                    fontSize: 14,
                  }}>
                  {item.dimension}
                </AppText>
                <AppText
                  font={{
                    color: 'black',
                    fontWeight: '200',
                    fontFamily: 'serif',
                    fontSize: 14,
                  }}>
                  Number of residents {item.residents?.length}
                </AppText>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
            removeClippedSubviews={true}
            // initialNumToRender={2} // Reduce initial render amount
            // maxToRenderPerBatch={1} // Reduce number in each render batch
            refreshing={refresh}
            onRefresh={handelRefresh}
          />

          {loadmore && (
            <ActivityIndicator
              style={{marginBottom: 70}}
              animating={loadmore}
              size={35}
              color="green"
            />
          )}
        </>
      )}
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  locationContainer: {
    marginVertical: 10,
    backgroundColor: 'whitesmoke',
    padding: 10,
    borderRadius: 10,
  },
});
