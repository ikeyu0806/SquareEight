import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductType } from 'interfaces/ProductType'
import { DeliveryCharge } from 'interfaces/DeliveryCharge'
import { prefecturesDeliveryTargetInitValue } from 'constants/prefecturesDeliveryTargetInitValue'

export const productSlice = createSlice({
  name: 'alert',
  initialState: {
    name: '',
    price: 1000,
    taxRate: 10,
    inventory: 1,
    description: '',
    publishStatus: '',
    base64Image: null,
    s3ObjectPublicUrl: '',
    applyProductType: false,
    showProductTypeForm: false,
    productTypes: [{name: '', inventory: 1}, {name: '', inventory: 1}] as ProductType[],
    deliveryChargeType: 'noSetting',
    flatRateDeliveryCharge: 100,
    prefectureDeliveryCharges: prefecturesDeliveryTargetInitValue as DeliveryCharge[],
    showPerPrefecturesChargeModal: false,
    deliveryChargeWithOrderNumber: 'nationwideUniform',
    deliveryDatetimeTargetFlg: true,
    showInventoryDescriptionModal: false
  },
  reducers: {
    nameChanged: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    descriptionChanged: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    publishStatusChanged: (state, action: PayloadAction<string>) => {
      state.publishStatus = action.payload
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
    applyProductTypeChanged: (state, action: PayloadAction<boolean>) => {
      state.applyProductType = action.payload
    },
    showProductTypeFormChanged: (state, action: PayloadAction<boolean>) => {
      state.showProductTypeForm = action.payload
    },
    productTypesChanged: (state, action: PayloadAction<ProductType[]>) => {
      state.productTypes = action.payload
    },
    deliveryChargeTypeChanged: (state, action: PayloadAction<string>) => {
      state.deliveryChargeType = action.payload
    },
    flatRateDeliveryChargeChange: (state, action: PayloadAction<number>) => {
      state.flatRateDeliveryCharge = action.payload
    },
    prefectureDeliveryChargesChange: (state, action: PayloadAction<DeliveryCharge[]>) => {
      state.prefectureDeliveryCharges = action.payload
    },
    showPerPrefecturesChargeModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showPerPrefecturesChargeModal = action.payload
    },
    deliveryChargeWithOrderNumberChanged: (state, action: PayloadAction<string>) => {
      state.deliveryChargeWithOrderNumber = action.payload
    },
    deliveryDatetimeTargetFlgChanged: (state, action: PayloadAction<boolean>) => {
      state.deliveryDatetimeTargetFlg = action.payload
    },
    showInventoryDescriptionModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showInventoryDescriptionModal = action.payload
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
export const { publishStatusChanged } = productSlice.actions
export const { applyProductTypeChanged } = productSlice.actions
export const { showProductTypeFormChanged } = productSlice.actions
export const { productTypesChanged } = productSlice.actions
export const { deliveryChargeTypeChanged } = productSlice.actions
export const { flatRateDeliveryChargeChange } = productSlice.actions
export const { prefectureDeliveryChargesChange } = productSlice.actions
export const { showPerPrefecturesChargeModalChanged } = productSlice.actions
export const { deliveryChargeWithOrderNumberChanged } = productSlice.actions
export const { deliveryDatetimeTargetFlgChanged } = productSlice.actions
export const { showInventoryDescriptionModalChanged } = productSlice.actions

export default productSlice.reducer
