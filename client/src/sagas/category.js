import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
  fetchParentCategoriesSuccess,
  fetchParentCategoriesFailed,
  submitCategorySuccess,
  submitCategoryFailed,
  fetchCategoryDetailsSuccess,
  fetchCategoryDetailsFailed,
  clearToken,
} from '../actions';
import config from '../config';

export function* fetchCategories(action) {
  try {
    const { storeId, pageNo, pageSize } = action.value;
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${storeId}/categories?page=${pageNo}&size=${pageSize}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchCategoriesSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(fetchCategoriesFailed());
    }
  }
}

export function* fetchParentCategories(action) {
  try {
    const { storeId, pageNo, pageSize } = action.value;
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${storeId}/categories?page=${pageNo}&size=${pageSize}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchParentCategoriesSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(fetchParentCategoriesFailed());
    }
  }
}

export function* fetchCategoryDetails(action) {
  try {
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${action.value.storeId}/categories/${
        action.value.categoryId
        }`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchCategoryDetailsSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(fetchCategoryDetailsFailed());
    }
  }
}

export function* upsertCategory(action) {
  try {
    const { value } = action;
    const res = yield axios({
      method: value.mode === 'new' ? 'post' : 'put',
      url: `${config.apiDomain}/stores/${action.value.storeId}/categories${value.mode === 'new' ? '' : '/' + value.categoryId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
      data: value,
    });

    yield put(submitCategorySuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(submitCategoryFailed());
    }
  }
}