import React, { createContext, useReducer } from 'react';

export const appContext = createContext();

const initialState = {
  products: [],
  user: {
    user: JSON.parse(localStorage.getItem('user')) || {},
  },
  cart: {
    cartItems: JSON.parse(localStorage.getItem('products')) || [],
  },
  shipping: JSON.parse(localStorage.getItem('address')) || {
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phoneNo: '',
  },
  singelProduct: [],
  orders: [],
  users: [],
};

function appRedux(state, action) {
  switch (action.type) {
    case 'all_products_request':
      return { ...state, loading: true, products: [] };
    case 'all_products_success':
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productCount,
        productCount: action.payload.productCount,
        queryPage: action.payload.queryPage,
        count: action.payload.count,
        sendenProduct: action.payload.sendenProduct,
      };
    case 'all_products_fatil':
      return {
        ...state,
        loading: false,
        products: [],
        error: action.payload,
      };

    case 'singleProductRequest':
      return {
        ...state,
        loading: true,
        singelProduct: [],
      };
    case 'singleProductSuccess':
      return {
        ...state,
        loading: false,
        singelProduct: action.payload,
      };
    case 'singleProductFail':
      return {
        ...state,
        loading: false,
        singelProduct: [],
        error: action.payload,
      };

    case 'deleteProduct':
      return {
        ...state,
        products: action.payload,
      };

    case 'allOrdersRequest':
      return {
        ...state,
        loading: true,
        orders: [],
      };

    case 'allOrdersSuccess':
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
        error: null,
      };

    case 'allOrdersFail':
      return {
        ...state,
        loading: false,
        orders: [],
        totalAmount: 0,
        error: action.payload,
      };

    case 'singleOrderSuccess':
      return {
        ...state,
        loading: false,
        order: action.payload,
        totalAmount: 0,
      };

    case 'userLogin':
      return { ...state, user: { user: action.payload } };
    case 'userLogout':
      return { ...state, user: { user: {} } };
    case 'clere_error':
      return { ...state, error: null };

    case 'allUsersRequest':
      return {
        ...state,
        loading: true,
        users: [],
      };

    case 'allUsersSuccess':
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case 'allUsersFail':
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };

    case 'addToCart':
      return {
        ...state,
        cart: { ...state.cart, cartItems: action.payload },
      };
    case 'increaseItem':
      return {
        ...state,
        cart: { ...state.cart, cartItems: action.payload },
      };
    case 'decreaseItem':
      return {
        ...state,
        cart: { ...state.cart, cartItems: action.payload },
      };
    case 'deleteItem':
      return {
        ...state,
        cart: { ...state.cart, cartItems: action.payload },
      };

    case 'addShipping':
      return {
        ...state,
        shipping: {
          ...state.shipping,
          address: action.payload.address,
          city: action.payload.city,
          country: action.payload.country,
          phoneNo: action.payload.phoneNo,
          postalCode: action.payload.postalCode,
        },
      };

    default:
      return state;
  }
}

export default function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(appRedux, initialState);

  return (
    <appContext.Provider value={{ state, dispatch }}>
      {children}
    </appContext.Provider>
  );
}
