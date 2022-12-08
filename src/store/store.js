import { createSlice, configureStore } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: { status: true },
  reducers: {
    setIsLoadingToTrue(state) {
      state.status = true;
    },
    setIsLoadingToFalse(state) {
      state.status = false;
    },
  },
});

const loginStatusSlice = createSlice({
  name: "loginStatus",
  initialState: { status: false },
  reducers: {
    loginUser(state) {
      state.status = true;
    },
    logoutUser(state) {
      state.status = false;
    },
    toggleUserStatus(state) {
      state.status = !state.status;
    },
  },
});

const productsSlice = createSlice({
  name: "products",
  initialState: { productsList: [] },
  reducers: {
    setAllProducts(state, payload) {
      state.productsList = payload.payload;
    },
  },
});

const initialFilterValues = {
  search: "",
  category: "all",
  company: "all",
  color: "all",
  price: 3100,
  freeShipping: false,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: initialFilterValues,
  reducers: {
    setSearchFilter(state, payolad) {
      return { ...initialFilterValues, search: payolad.payload };
    },

    setCategoryFilter(state, payload) {
      return { ...initialFilterValues, category: payload.payload };
    },

    setCompanyFilter(state, payload) {
      return { ...initialFilterValues, company: payload.payload };
    },

    setColorsFilter(state, payload) {
      return { ...initialFilterValues, color: payload.payload };
    },

    setPriceFilter(state, payolad) {
      return { ...initialFilterValues, price: payolad.payload };
    },
    setFreeShippingFilter(state, payolad) {
      return { ...initialFilterValues, freeShipping: payolad.payload };
    },
    setToInitialValue(state) {
      return initialFilterValues;
    },
  },
});

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addProductToCart(state, payload) {
      state.push(payload.payload);
    },
    updateQuantityOfItem(state, payolad) {
      return payolad.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    loginStatus: loginStatusSlice.reducer,
    products: productsSlice.reducer,
    filters: filtersSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export const loadingActions = loadingSlice.actions;
export const loginStatusActions = loginStatusSlice.actions;
export const productsAction = productsSlice.actions;
export const filtersActions = filtersSlice.actions;
export const cartActions = cartSlice.actions;
export default store;
