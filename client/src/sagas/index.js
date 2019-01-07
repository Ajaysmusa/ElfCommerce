import { call, all, takeEvery } from 'redux-saga/effects';
import { fetchOrders, fetchOrderDetails } from './order';
import {
  fetchProducts,
  fetchProductDetails,
  upsertProduct,
  searchProducts,
} from './product';
import {
  fetchCategories,
  fetchParentCategories,
  fetchCategoryDetails,
  upsertCategory,
} from './category';
import { fetchSalesReportProducts, fetchSalesReportCategories } from './report';
import { fetchDashboardData } from './dashboard';
import { fetchStoreSettings } from './setting';
import { submitLoginData, clearToken } from './auth';
import {
  fetchSuppliers,
  fetchSupplierDetails,
  upsertSupplier,
} from './supplier';
import {
  fetchManufacturers,
  fetchManufacturerDetails,
  upsertManufacturer,
} from './manufacturer';
import { fetchCountries, fetchCurrencies } from './public';
import { fetchAccount } from './account';
import {
  CLEAR_TOKEN,
  FETCH_ORDERS,
  FETCH_ORDER_DETAILS,
  FETCH_CATEGORIES,
  FETCH_PARENT_CATEGORIES,
  FETCH_CATEGORY_DETAILS,
  FETCH_PRODUCTS,
  FETCH_PRODUCT_DETAILS,
  SEARCH_PRODUCTS,
  SUBMIT_PRODUCT,
  SUBMIT_CATEGORY,
  FETCH_SUPPLIERS,
  FETCH_SUPPLIER_DETAILS,
  SUBMIT_SUPPLIER,
  FETCH_MANUFACTURERS,
  FETCH_MANUFACTURER_DETAILS,
  SUBMIT_MANUFACTURER,
  FETCH_DASHBOARD_DATA,
  FETCH_SALES_REPORT_PRODUCTS,
  FETCH_SALES_REPORT_CATEGORIES,
  FETCH_STORE_SETTINGS,
  SUBMIT_LOGIN_DATA,
  FETCH_COUNTRIES,
  FETCH_CURRENCIES,
  FETCH_ACCOUNT,
} from '../actions';
import { takeLatest } from 'redux-saga';

export default function* rootSaga() {
  yield all([
    takeEvery(CLEAR_TOKEN, clearToken),
    takeEvery(FETCH_ORDERS, fetchOrders),
    takeEvery(FETCH_ORDER_DETAILS, fetchOrderDetails),
    takeEvery(FETCH_CATEGORIES, fetchCategories),
    takeEvery(FETCH_PARENT_CATEGORIES, fetchParentCategories),
    takeEvery(FETCH_PRODUCTS, fetchProducts),
    takeEvery(FETCH_PRODUCT_DETAILS, fetchProductDetails),
    takeEvery(SEARCH_PRODUCTS, searchProducts),
    takeEvery(SUBMIT_PRODUCT, upsertProduct),
    takeEvery(SUBMIT_CATEGORY, upsertCategory),
    takeEvery(FETCH_DASHBOARD_DATA, fetchDashboardData),
    takeEvery(FETCH_SALES_REPORT_PRODUCTS, fetchSalesReportProducts),
    takeEvery(FETCH_SALES_REPORT_CATEGORIES, fetchSalesReportCategories),
    takeEvery(FETCH_STORE_SETTINGS, fetchStoreSettings),
    takeEvery(SUBMIT_LOGIN_DATA, submitLoginData),
    takeEvery(FETCH_SUPPLIERS, fetchSuppliers),
    takeEvery(FETCH_SUPPLIER_DETAILS, fetchSupplierDetails),
    takeEvery(SUBMIT_SUPPLIER, upsertSupplier),
    takeEvery(FETCH_MANUFACTURERS, fetchManufacturers),
    takeEvery(SUBMIT_MANUFACTURER, upsertManufacturer),
    takeEvery(FETCH_MANUFACTURER_DETAILS, fetchManufacturerDetails),
    takeEvery(FETCH_CATEGORY_DETAILS, fetchCategoryDetails),
    takeEvery(FETCH_COUNTRIES, fetchCountries),
    takeEvery(FETCH_CURRENCIES, fetchCurrencies),
    takeEvery(FETCH_ACCOUNT, fetchAccount),
  ]);
}
