import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductType } from 'interfaces/ProductType'

export const productSlice = createSlice({
  name: 'alert',
  initialState: {
    name: '',
    price: 1000,
    taxRate: 10,
    inventory: 0,
    description: '',
    base64Image: null,
    s3ObjectPublicUrl: '',
    productTypes: [] as ProductType[]
  },
  reducers: {
    nameChanged: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    descriptionChanged: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    base64ImageChanged: (state, action: PayloadAction<any>) => {
      state.base64Image = action.payload
    },
    s3ObjectPublicUrlChanged: (state, action: PayloadAction<any>) => {
      state.s3ObjectPublicUrl = action.payload
    },
    inventoryChanged: (state, action: PayloadAction<number>) => {
      state.inventory = action.payload
    },
    priceChanged: (state, action: PayloadAction<number>) => {
      state.price = action.payload
    },
    taxRateChanged: (state, action: PayloadAction<number>) => {
      state.taxRate = action.payload
    },
    productTypesChanged: (state, action: PayloadAction<ProductType[]>) => {
      state.productTypes = action.payload
    },
  },
})

export const { nameChanged } = productSlice.actions
export const { descriptionChanged } = productSlice.actions
export const { base64ImageChanged } = productSlice.actions
export const { s3ObjectPublicUrlChanged } = productSlice.actions
export const { priceChanged } = productSlice.actions
export const { taxRateChanged } = productSlice.actions
export const { inventoryChanged } = productSlice.actions
export const { productTypesChanged } = productSlice.actions

export default productSlice.reducer
