/* eslint-disable no-console */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import AppCard from '../src/components/AppCard';
import renderer, {create} from 'react-test-renderer';
import * as actions from '../src/store/characterState';
import store from '../src/store/store';
import {Provider} from 'react-redux';

describe('Character and Location returns actions', () => {
  const tree = create(
    <Provider store={store}>
      <AppCard />
    </Provider>,
  );
  it('Check App card componenet', async () => {
    expect(tree).toMatchSnapshot();
  });

  it('Test fetch character action dispatch ', async () => {
    expect(store.getState().character).toEqual({
      list: [],
      next: null,
      loading: false,
      loadMore: false,
      searchload: false,
    });
  });
  it('Test fetch location action dispatch ', async () => {
    expect(store.getState().location).toEqual({
      list: [],
      next: null,
      loading: false,
      loadMore: false,
    });
  });
});
