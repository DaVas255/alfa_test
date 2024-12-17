import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '@/app/types';
import { getProducts } from '@/service/product.service';

interface ProductsState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<IProduct[]>(
  'products/fetchProducts',
  async () => {
    const products = await getProducts();
    return products;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<IProduct>) {
      state.products.push(action.payload);
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load products';
      });
  },
});

export const { addProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;
