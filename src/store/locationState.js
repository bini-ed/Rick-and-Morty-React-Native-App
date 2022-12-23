import {createSlice} from '@reduxjs/toolkit';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {apiCallBegan} from './apiAction';

const slice = createSlice({
  name: 'location',
  initialState: {
    list: [],
    next: null,
    loading: false,
    loadMore: false,
  },
  reducers: {
    locationFetchLoading: location => {
      location.loading = true;
    },
    locationFetch: (location, action) => {
      location.list = action.payload?.results;
      location.next = action.payload?.info?.next;
      location.loading = false;
    },
    locationFetchFailed: (location, action) => {
      location.loading = false;
      Toast.show({type: 'error', text1: action.payload.error});
    },
    locationFetchMoreLoading: location => {
      location.loadMore = true;
    },
    locationFetchMore: (location, action) => {
      action.payload.results.map(items => {
        location.list.push(items);
      });
      location.next = action.payload?.info?.next;
      location.loadMore = false;
    },
    locationFetchMoreFailed: (location, action) => {
      location.loading = false;
      Toast.show({type: 'error', text1: action.payload.error});
    },
  },
});

export default slice.reducer;

export const {
  locationFetch,
  locationFetchFailed,
  locationFetchLoading,
  locationFetchMore,
  locationFetchMoreLoading,
  locationFetchMoreFailed,
} = slice.actions;

export const fetchLocation = () =>
  apiCallBegan({
    url: 'location',
    onStart: locationFetchLoading.type,
    onSuccess: locationFetch.type,
    onError: locationFetchFailed.type,
  });

export const fetchMoreLocation = url =>
  apiCallBegan({
    url: url,
    onStart: locationFetchMoreLoading.type,
    onSuccess: locationFetchMore.type,
    onError: locationFetchMoreFailed.type,
  });
