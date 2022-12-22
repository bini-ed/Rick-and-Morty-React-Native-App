import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getLocationService} from '../services/locationService';
import AppText from '../components/AppText';
import axios from 'axios';

const Location = () => {
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadmore, setLoadmore] = useState(false);
  const [nextURL, setNextURL] = useState('');
  const [refresh, setRefresh] = useState(false);

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
    console.log('called');
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
              <View
                style={{
                  marginVertical: 10,
                  backgroundColor: 'whitesmoke',
                  padding: 10,
                  borderRadius: 10,
                }}>
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
              </View>
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
              style={{marginVertical: 25}}
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
