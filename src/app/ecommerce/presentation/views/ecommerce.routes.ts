import { Routes } from '@angular/router';

const storePage = () => import('./store-page/store-page').then((m) => m.StorePage);
const storeProductList = () => import('./store-product-list/store-product-list').then((m) => m.StoreProductList);
const storeProductForm = () => import('./store-product-form/store-product-form').then((m) => m.StoreProductForm);
const couponList = () => import('./coupon-list/coupon-list').then((m) => m.CouponList);
const couponForm = () => import('./coupon-form/coupon-form').then((m) => m.CouponForm);
const paymentResult = () => import('./payment-result/payment-result').then((m) => m.PaymentResult);

export const ecommerceRoutes: Routes = [
  { path: 'store', loadComponent: storePage, title: 'SafeStep - Store' },
  {
    path: 'store/products/:id',
    loadComponent: storePage,
    title: 'SafeStep - Product',
  },
  {
    path: 'store/admin/products',
    loadComponent: storeProductList,
    title: 'SafeStep - Manage products',
  },
  {
    path: 'store/admin/products/new',
    loadComponent: storeProductForm,
    title: 'SafeStep - Add product',
  },
  {
    path: 'store/admin/products/edit/:id',
    loadComponent: storeProductForm,
    title: 'SafeStep - Edit product',
  },
  {
    path: 'store/admin/coupons',
    loadComponent: couponList,
    title: 'SafeStep - Manage coupons',
  },
  {
    path: 'store/admin/coupons/new',
    loadComponent: couponForm,
    title: 'SafeStep - Add coupon',
  },
  {
    path: 'store/admin/coupons/edit/:id',
    loadComponent: couponForm,
    title: 'SafeStep - Edit coupon',
  },
  {
    path: 'payment/success',
    loadComponent: paymentResult,
    data: { status: 'success' },
    title: 'SafeStep - Payment Success',
  },
  {
    path: 'payment/cancel',
    loadComponent: paymentResult,
    data: { status: 'cancel' },
    title: 'SafeStep - Payment Cancelled',
  },
];
