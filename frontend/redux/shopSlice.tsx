import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReserveFrameInfo } from 'interfaces/ShopParam'
import { MonthlyPatmentPlanInfo } from 'interfaces/ShopParam'
import { TicketMasterInfo } from 'interfaces/ShopParam'
import { ProductInfo } from 'interfaces/ShopParam'
import { ReserveFrameParam } from 'interfaces/ReserveFrameParam'
import { ProductParam } from 'interfaces/ProductParam'
import { MonthlyPaymentPlanParam } from 'interfaces/MonthlyPaymentPlanParam'
import { TicketMasterParam } from 'interfaces/TicketMasterParam'
import { WebpageParam } from 'interfaces/WebpageParam'
import { ResourceParam } from 'interfaces/ResourceParam'
import { StaffResourceInfo } from 'interfaces/ShopParam'
import { EquipmentResourceInfo } from 'interfaces/ShopParam'

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    name: '',
    phoneNumber: '',
    description1: '',
    description2: '',
    description3: '',
    description4: '',
    description5: '',
    description6: '',
    postalCode: '',
    state: '',
    city: '',
    town: '',
    line1: '',
    line2: '',
    accessInfo: '',
    parkingLotGuidance: '',
    businessHoursText: '',
    remarks: '',
    publishStatus: '',
    brandImageFile: null as File | unknown,
    shopImage1File: null as File | unknown,
    shopImage2File:  null as File | unknown,
    shopImage3File:  null as File | unknown,
    shopImage4File:  null as File | unknown,
    shopImage5File:  null as File | unknown,
    shopImage6File:  null as File | unknown,
    shopImage1ImagePublicUrl: '',
    shopImage2ImagePublicUrl: '',
    shopImage3ImagePublicUrl: '',
    shopImage4ImagePublicUrl: '',
    shopImage5ImagePublicUrl: '',
    shopImage6ImagePublicUrl: '',
    businessType: '',
    reserveFrameInfo: [] as ReserveFrameInfo[],
    monthlyPatmentPlanInfo: [] as MonthlyPatmentPlanInfo[],
    ticketMasterInfo: [] as TicketMasterInfo[],
    productInfo: [] as ProductInfo[],
    selectedProductIds: [] as number[],
    selectedReserveFrameIds: [] as number[],
    selectedMonthlyPaymentPlanIds: [] as number[],
    selectedTicketMasterIds: [] as number[],
    selectedWebpageIds: [] as number[],
    selectedResourceIds: [] as number[],
    reserveFrames: [] as ReserveFrameParam[],
    products: [] as ProductParam[],
    ticketMasters: [] as TicketMasterParam[],
    monthlyPaymentPlans: [] as MonthlyPaymentPlanParam[],
    webpages: [] as WebpageParam[],
    resources: [] as ResourceParam[],
    staffResources: [] as StaffResourceInfo[],
    equipmentResources: [] as EquipmentResourceInfo[]
  },
  reducers: {
    nameChanged: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    phoneNumberChanged: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload
    },
    description1Changed: (state, action: PayloadAction<string>) => {
      state.description1 = action.payload
    },
    description2Changed: (state, action: PayloadAction<string>) => {
      state.description2 = action.payload
    },
    description3Changed: (state, action: PayloadAction<string>) => {
      state.description3 = action.payload
    },
    description4Changed: (state, action: PayloadAction<string>) => {
      state.description4 = action.payload
    },
    description5Changed: (state, action: PayloadAction<string>) => {
      state.description5 = action.payload
    },
    description6Changed: (state, action: PayloadAction<string>) => {
      state.description6 = action.payload
    },
    postalCodeChanged: (state, action: PayloadAction<string>) => {
      state.postalCode = action.payload
    },
    stateChanged: (state, action: PayloadAction<string>) => {
      state.state = action.payload
    },
    cityChanged: (state, action: PayloadAction<string>) => {
      state.city = action.payload
    },
    townChanged: (state, action: PayloadAction<string>) => {
      state.town = action.payload
    },
    line1Changed: (state, action: PayloadAction<string>) => {
      state.line1 = action.payload
    },
    line2Changed: (state, action: PayloadAction<string>) => {
      state.line2 = action.payload
    },
    accessInfoChanged: (state, action: PayloadAction<string>) => {
      state.accessInfo = action.payload
    },
    parkingLotGuidanceChanged: (state, action: PayloadAction<string>) => {
      state.parkingLotGuidance = action.payload
    },
    businessHoursTextChanged: (state, action: PayloadAction<string>) => {
      state.businessHoursText = action.payload
    },
    remarksChanged: (state, action: PayloadAction<string>) => {
      state.remarks = action.payload
    },
    publishStatusChanged: (state, action: PayloadAction<string>) => {
      state.publishStatus = action.payload
    },
    brandImageFileChanged: (state, action: PayloadAction<File>) => {
      state.brandImageFile = action.payload
    },
    shopImage1FileChanged: (state, action: PayloadAction<File>) => {
      state.shopImage1File = action.payload
    },
    shopImage2FileChanged: (state, action: PayloadAction<File>) => {
      state.shopImage2File = action.payload
    },
    shopImage3FileChanged: (state, action: PayloadAction<File>) => {
      state.shopImage3File = action.payload
    },
    shopImage4FileChanged: (state, action: PayloadAction<File>) => {
      state.shopImage4File = action.payload
    },
    shopImage5FileChanged: (state, action: PayloadAction<File>) => {
      state.shopImage5File = action.payload
    },
    shopImage6FileChanged: (state, action: PayloadAction<File>) => {
      state.shopImage6File = action.payload
    },
    shopImage1ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.shopImage1ImagePublicUrl = action.payload
    },
    shopImage2ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.shopImage2ImagePublicUrl = action.payload
    },
    shopImage3ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.shopImage3ImagePublicUrl = action.payload
    },
    shopImage4ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.shopImage4ImagePublicUrl = action.payload
    },
    shopImage5ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.shopImage5ImagePublicUrl = action.payload
    },
    shopImage6ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.shopImage6ImagePublicUrl = action.payload
    },
    businessTypeChanged: (state, action: PayloadAction<string>) => {
      state.businessType = action.payload
    },
    reserveFrameInfoChanged: (state, action: PayloadAction<ReserveFrameInfo[]>) => {
      state.reserveFrameInfo = action.payload
    },
    monthlyPatmentPlanInfoChanged: (state, action: PayloadAction<MonthlyPatmentPlanInfo[]>) => {
      state.monthlyPatmentPlanInfo = action.payload
    },
    ticketMasterInfoChanged: (state, action: PayloadAction<TicketMasterInfo[]>) => {
      state.ticketMasterInfo = action.payload
    },
    productInfoChanged: (state, action: PayloadAction<ProductInfo[]>) => {
      state.productInfo = action.payload
    },
    selectedProductIdsChanged: (state, action: PayloadAction<number[]>) => {
      state.selectedProductIds = action.payload
    },
    selectedReserveFrameIdsChanged: (state, action: PayloadAction<number[]>) => {
      state.selectedReserveFrameIds = action.payload
    },
    selectedMonthlyPaymentPlanIdsChanged: (state, action: PayloadAction<number[]>) => {
      state.selectedMonthlyPaymentPlanIds = action.payload
    },
    selectedTicketMasterIdsChanged: (state, action: PayloadAction<number[]>) => {
      state.selectedTicketMasterIds = action.payload
    },
    selectedWebpageIdsChanged: (state, action: PayloadAction<number[]>) => {
      state.selectedWebpageIds = action.payload
    },
    selectedResourceIdsChanged: (state, action: PayloadAction<number[]>) => {
      state.selectedResourceIds = action.payload
    },
    reserveFramesChanged: (state, action: PayloadAction<ReserveFrameParam[]>) => {
      state.reserveFrames = action.payload
    },
    productsChanged: (state, action: PayloadAction<ProductParam[]>) => {
      state.products = action.payload
    },
    ticketMastersChanged: (state, action: PayloadAction<TicketMasterParam[]>) => {
      state.ticketMasters = action.payload
    },
    monthlyPaymentPlansChanged: (state, action: PayloadAction<MonthlyPaymentPlanParam[]>) => {
      state.monthlyPaymentPlans = action.payload
    },
    webpagesChanged: (state, action: PayloadAction<WebpageParam[]>) => {
      state.webpages = action.payload
    },
    resourcesChanged: (state, action: PayloadAction<ResourceParam[]>) => {
      state.resources = action.payload
    },
    staffResourcesChanged: (state, action: PayloadAction<StaffResourceInfo[]>) => {
      state.staffResources = action.payload
    },
    equipmentResourcesChanged: (state, action: PayloadAction<EquipmentResourceInfo[]>) => {
      state.equipmentResources = action.payload
    },
  },
})

export const { nameChanged } = shopSlice.actions
export const { phoneNumberChanged } = shopSlice.actions
export const { description1Changed } = shopSlice.actions
export const { description2Changed } = shopSlice.actions
export const { description3Changed } = shopSlice.actions
export const { description4Changed } = shopSlice.actions
export const { description5Changed } = shopSlice.actions
export const { description6Changed } = shopSlice.actions
export const { postalCodeChanged } = shopSlice.actions
export const { stateChanged } = shopSlice.actions
export const { cityChanged } = shopSlice.actions
export const { townChanged } = shopSlice.actions
export const { line1Changed } = shopSlice.actions
export const { line2Changed } = shopSlice.actions
export const { accessInfoChanged } = shopSlice.actions
export const { parkingLotGuidanceChanged } = shopSlice.actions
export const { businessHoursTextChanged } = shopSlice.actions
export const { remarksChanged } = shopSlice.actions
export const { publishStatusChanged } = shopSlice.actions
export const { brandImageFileChanged } = shopSlice.actions
export const { shopImage1FileChanged } = shopSlice.actions
export const { shopImage2FileChanged } = shopSlice.actions
export const { shopImage3FileChanged } = shopSlice.actions
export const { shopImage4FileChanged } = shopSlice.actions
export const { shopImage5FileChanged } = shopSlice.actions
export const { shopImage6FileChanged } = shopSlice.actions
export const { shopImage1ImagePublicUrlChanged } = shopSlice.actions
export const { shopImage2ImagePublicUrlChanged } = shopSlice.actions
export const { shopImage3ImagePublicUrlChanged } = shopSlice.actions
export const { shopImage4ImagePublicUrlChanged } = shopSlice.actions
export const { shopImage5ImagePublicUrlChanged } = shopSlice.actions
export const { shopImage6ImagePublicUrlChanged } = shopSlice.actions
export const { businessTypeChanged } = shopSlice.actions
export const { reserveFrameInfoChanged } = shopSlice.actions
export const { monthlyPatmentPlanInfoChanged } = shopSlice.actions
export const { ticketMasterInfoChanged } = shopSlice.actions
export const { productInfoChanged } = shopSlice.actions
export const { selectedProductIdsChanged } = shopSlice.actions
export const { selectedReserveFrameIdsChanged } = shopSlice.actions
export const { selectedMonthlyPaymentPlanIdsChanged } = shopSlice.actions
export const { selectedTicketMasterIdsChanged } = shopSlice.actions
export const { selectedWebpageIdsChanged } = shopSlice.actions
export const { selectedResourceIdsChanged } = shopSlice.actions
export const { reserveFramesChanged } = shopSlice.actions
export const { productsChanged } = shopSlice.actions
export const { ticketMastersChanged } = shopSlice.actions
export const { monthlyPaymentPlansChanged } = shopSlice.actions
export const { webpagesChanged } = shopSlice.actions
export const { resourcesChanged } = shopSlice.actions
export const { staffResourcesChanged } = shopSlice.actions
export const { equipmentResourcesChanged } = shopSlice.actions

export default shopSlice.reducer
