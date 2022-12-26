import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {getCharacterDetail} from '../store/characterState';
import AppText from '../components/AppText';

const {height, width} = Dimensions.get('screen');
const CharacterDetail = () => {
  const navigate = useNavigation();
  const {params} = useRoute();
  const {detail, loading} = useSelector(state => state.character);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCharacterDetail(params.id));
  }, []);

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#32b1bc'}}
      contentContainerStyle={{paddingBottom: 90}}>
      <TouchableOpacity
        onPress={() => {
          navigate.goBack();
        }}
        style={{padding: 20}}>
        <MaterialIcons
          name="arrow-back-ios"
          color="whitesmoke"
          size={40}></MaterialIcons>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator animating={loading} size={35} color="yellow" />
      ) : (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image
            source={{uri: detail?.image}}
            style={{
              width: width - 20,
              height: height / 2,
              resizeMode: 'contain',
              borderRadius: 10,
            }}
          />
          <AppText
            font={{
              color: 'yellow',
              fontSize: 35,
              fontFamily: 'serif',
              fontWeight: '500',
              textAlign: 'left',
              width: width - 20,
            }}>
            {detail?.name}
          </AppText>

          <View
            style={{
              borderColor: 'white',
              borderWidth: 1,
              width: width - 20,
              //   flex: 1,
              borderRadius: 10,
            }}>
            <AppText
              font={{
                color: 'white',
                fontSize: 15,
                // fontWeight: '500',
                marginVertical: 10,
                paddingHorizontal: 10,
              }}>
              {detail?.status}
            </AppText>
            <AppText
              font={{
                color: 'white',
                fontSize: 15,
                // fontWeight: '500',
                marginVertical: 10,
                paddingHorizontal: 10,
              }}>
              {detail?.species}
            </AppText>
            <AppText
              font={{
                color: 'white',
                fontSize: 15,
                // fontWeight: '500',
                marginVertical: 10,
                paddingHorizontal: 10,
              }}>
              {detail?.origin?.name}
            </AppText>
            <AppText
              font={{
                color: 'white',
                fontSize: 15,
                // fontWeight: '500',
                marginVertical: 10,
                paddingHorizontal: 10,
              }}>
              {detail?.location?.name}
            </AppText>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default CharacterDetail;

const styles = StyleSheet.create({});
