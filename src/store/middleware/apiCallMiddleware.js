import axios from 'axios';
import {URL} from '../../config/config';
import * as actions from '../apiAction';

const apiCall =
  ({dispatch}) =>
  next =>
  async action => {
    if (action.type !== actions.apiCallBegan().type) {
      return next(action);
    }

    const {url, method, data, onStart, params, onSuccess, onError} =
      action.payload;

    if (onStart) dispatch({type: onStart});
    next(action);

    try {
      const {data} = await axios.request({
        baseURL: URL,
        url: url,
        method,
        params,
        data,
      });

      dispatch(actions.apiCallSuccess(data));

      if (onSuccess) dispatch({type: onSuccess, payload: data});
    } catch (error) {
      dispatch(actions.apiCallFailed(error.message));
      if (onError) dispatch({type: onError, payload: error.response.data});
    }
  };

export default apiCall;
