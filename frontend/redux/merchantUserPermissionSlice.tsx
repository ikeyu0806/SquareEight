import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const merchantUserPermissionSlice = createSlice({
  name: 'merchantUserPermission',
  initialState: {
    showPermissionGuideModal: false,
    allowReadMerchantUser: false,
    allowCreateMerchantUser: false,
    allowUpdateMerchantUser: false,
    allowDeleteMerchantUser: false,
    allowReadReserveFrame: false,
    allowCreateReserveFrame: false,
    allowUpdateReserveFrame: false,
    allowDeleteReserveFrame: false,
    allowReadReservation: false,
    allowCreateReservation: false,
    allowUpdateReservation: false,
    allowDeleteReservation: false,
    allowReadTicketMaster: false,
    allowCreateTicketMaster: false,
    allowUpdateTicketMaster: false,
    allowDeleteTicketMaster: false,
    allowReadMonthlyPaymentPlan: false,
    allowCreateMonthlyPaymentPlan: false,
    allowUpdateMonthlyPaymentPlan: false,
    allowDeleteMonthlyPaymentPlan: false,
    allowReadResource: false,
    allowCreateResource: false,
    allowUpdateResource: false,
    allowDeleteResource: false,
    allowReadProduct: false,
    allowCreateProduct: false,
    allowUpdateProduct: false,
    allowDeleteProduct: false,
    allowUpdateDeliveryTarget: false,
    allowReadCustomer: false,
    allowCreateCustomer: false,
    allowUpdateCustomer: false,
    allowDeleteCustomer: false,
    allowReadCustomerGroup: false,
    allowCreateCustomerGroup: false,
    allowUpdateCustomerGroup: false,
    allowDeleteCustomerGroup: false,
    allowReadWebpage: false,
    allowCreateWebpage: false,
    allowUpdateWebpage: false,
    allowDeleteWebpage: false,
    allowReadQuestionnaireMaster: false,
    allowCreateQuestionnaireMaster: false,
    allowUpdateQuestionnaireMaster: false,
    allowDeleteQuestionnaireMaster: false,
    allowReadQuestionnaireAnswer: false,
    allowReadPaymentRequest: false,
    allowCreatePaymentRequest: false,
    allowReadPaymentSales: false,
    allowUpdateCreditCard: false,
    allowReadStripeBusinessInfo: false,
    allowUpdateStripeBusinessInfo: false,
  },
  reducers: {
    showPermissionGuideModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showPermissionGuideModal = action.payload
    },
    allowReadMerchantUserChanged: (state, action: PayloadAction<boolean>) => {
      state.allowReadMerchantUser = action.payload
    },
    allowCreateMerchantUserChanged: (state, action: PayloadAction<boolean>) => {
      state.allowCreateMerchantUser = action.payload
    },
    allowUpdateMerchantUserChanged: (state, action: PayloadAction<boolean>) => {
      state.allowUpdateMerchantUser = action.payload
    },
    allowDeleteMerchantUserChanged: (state, action: PayloadAction<boolean>) => {
      state.allowDeleteMerchantUser = action.payload
    },
    allowReadReserveFrameChanged: (state, action: PayloadAction<boolean>) => {
      state.allowReadReserveFrame = action.payload
    },
    allowCreateReserveFrameChanged: (state, action: PayloadAction<boolean>) => {
      state.allowCreateReserveFrame = action.payload
    },
    allowUpdateReserveFrameChanged: (state, action: PayloadAction<boolean>) => {
      state.allowUpdateReserveFrame = action.payload
    },
    allowDeleteReserveFrameChanged: (state, action: PayloadAction<boolean>) => {
      state.allowDeleteReserveFrame = action.payload
    },
    allowReadReservationChanged: (state, action: PayloadAction<boolean>) => {
      state.allowReadReservation = action.payload
    },
    allowCreateReservationChanged: (state, action: PayloadAction<boolean>) => {
      state.allowCreateReservation = action.payload
    },
    allowUpdateReservationChanged: (state, action: PayloadAction<boolean>) => {
      state.allowUpdateReservation = action.payload
    },
    allowDeleteReservationChanged: (state, action: PayloadAction<boolean>) => {
      state.allowDeleteReservation = action.payload
    },
    allowReadTicketMasterChanged: (state, action: PayloadAction<boolean>) => {
      state.allowReadTicketMaster = action.payload
    },
    allowCreateTicketMasterChanged: (state, action: PayloadAction<boolean>) => {
      state.allowCreateTicketMaster = action.payload
    },
    allowUpdateTicketMasterChanged: (state, action: PayloadAction<boolean>) => {
      state.allowUpdateTicketMaster = action.payload
    },
    allowDeleteTicketMasterChanged: (state, action: PayloadAction<boolean>) => {
      state.allowDeleteTicketMaster = action.payload
    },
    allowReadMonthlyPaymentPlanChanged: (state, action: PayloadAction<boolean>) => {
      state.allowReadMonthlyPaymentPlan = action.payload
    },
    allowCreateMonthlyPaymentPlanChanged: (state, action: PayloadAction<boolean>) => {
      state.allowCreateMonthlyPaymentPlan = action.payload
    },
    allowUpdateMonthlyPaymentPlanChanged: (state, action: PayloadAction<boolean>) => {
      state.allowUpdateMonthlyPaymentPlan = action.payload
    },
    allowDeleteMonthlyPaymentPlanChanged: (state, action: PayloadAction<boolean>) => {
      state.allowDeleteMonthlyPaymentPlan= action.payload
    },
    allowReadResourceChanged: (state, action: PayloadAction<boolean>) => {
      state.allowReadResource = action.payload
    },
    allowCreateResourceChanged: (state, action: PayloadAction<boolean>) => {
      state.allowCreateResource = action.payload
    },
    allowUpdateResourceChanged: (state, action: PayloadAction<boolean>) => {
      state.allowUpdateResource = action.payload
    },
    allowDeleteResourceChanged: (state, action: PayloadAction<boolean>) => {
      state.allowDeleteResource = action.payload
    },
    allowReadProductChanged: (state, action: PayloadAction<boolean>) => {
      state.allowReadProduct = action.payload
    },
    allowCreateProductChanged: (state, action: PayloadAction<boolean>) => {
      state.allowCreateProduct = action.payload
    },
    allowUpdateProductChanged: (state, action: PayloadAction<boolean>) => {
      state.allowUpdateProduct = action.payload
    },
    allowDeleteProductChanged: (state, action: PayloadAction<boolean>) => {
      state.allowDeleteProduct = action.payload
    },
    allowReadCustomerChanged: (state, action: PayloadAction<boolean>) => {
      state.allowReadCustomer = action.payload
    },
    allowCreateCustomerChanged: (state, action: PayloadAction<boolean>) => {
      state.allowCreateCustomer = action.payload
    },
    allowUpdateCustomerChanged: (state, action: PayloadAction<boolean>) => {
      state.allowUpdateCustomer = action.payload
    },
    allowDeleteCustomerChanged: (state, action: PayloadAction<boolean>) => {
      state.allowDeleteCustomer = action.payload
    },
    allowReadCustomerGroupChanged: (state, action: PayloadAction<boolean>) => {
      state.allowReadCustomerGroup = action.payload
    },
    allowCreateCustomerGroupChanged: (state, action: PayloadAction<boolean>) => {
      state.allowCreateCustomerGroup = action.payload
    },
    allowUpdateCustomerGroupChanged: (state, action: PayloadAction<boolean>) => {
      state.allowUpdateCustomerGroup = action.payload
    },
    allowDeleteCustomerGroupChanged: (state, action: PayloadAction<boolean>) => {
      state.allowDeleteCustomerGroup = action.payload
    },
    allowReadWebpageChanged: (state, action: PayloadAction<boolean>) => {
      state.allowReadWebpage = action.payload
    },
    allowCreateWebpageChanged: (state, action: PayloadAction<boolean>) => {
      state.allowCreateWebpage = action.payload
    },
    allowUpdateWebpageChanged: (state, action: PayloadAction<boolean>) => {
      state.allowUpdateWebpage = action.payload
    },
    allowDeleteWebpageChanged: (state, action: PayloadAction<boolean>) => {
      state.allowDeleteWebpage = action.payload
    },
    allowReadQuestionnaireMasterChanged: (state, action: PayloadAction<boolean>) => {
      state.allowReadQuestionnaireMaster = action.payload
    },
    allowCreateQuestionnaireMasterChanged: (state, action: PayloadAction<boolean>) => {
      state.allowCreateQuestionnaireMaster = action.payload
    },
    allowUpdateQuestionnaireMasterChanged: (state, action: PayloadAction<boolean>) => {
      state.allowUpdateQuestionnaireMaster = action.payload
    },
    allowDeleteQuestionnaireMasterChanged: (state, action: PayloadAction<boolean>) => {
      state.allowDeleteQuestionnaireMaster = action.payload
    },
    allowReadQuestionnaireAnswerChanged: (state, action: PayloadAction<boolean>) => {
      state.allowReadQuestionnaireAnswer = action.payload
    },
    allowReadPaymentRequestChanged: (state, action: PayloadAction<boolean>) => {
      state.allowReadPaymentRequest = action.payload
    },
    allowCreatePaymentRequestChanged: (state, action: PayloadAction<boolean>) => {
      state.allowCreatePaymentRequest = action.payload
    },
    allowReadPaymentSalesChanged: (state, action: PayloadAction<boolean>) => {
      state.allowReadPaymentSales = action.payload
    },
    allowUpdateCreditCardChanged: (state, action: PayloadAction<boolean>) => {
      state.allowUpdateCreditCard = action.payload
    },
    allowReadStripeBusinessInfoChanged: (state, action: PayloadAction<boolean>) => {
      state.allowReadStripeBusinessInfo = action.payload
    },
    allowStripeBusinessInfoChanged: (state, action: PayloadAction<boolean>) => {
      state.allowUpdateStripeBusinessInfo = action.payload
    },
  },
})

export const { showPermissionGuideModalChanged } = merchantUserPermissionSlice.actions
export const { allowReadMerchantUserChanged } = merchantUserPermissionSlice.actions
export const { allowCreateMerchantUserChanged } = merchantUserPermissionSlice.actions
export const { allowUpdateMerchantUserChanged } = merchantUserPermissionSlice.actions
export const { allowCreateReserveFrameChanged } = merchantUserPermissionSlice.actions
export const { allowUpdateReserveFrameChanged } = merchantUserPermissionSlice.actions
export const { allowDeleteReserveFrameChanged } = merchantUserPermissionSlice.actions
export const { allowReadReservationChanged } = merchantUserPermissionSlice.actions
export const { allowCreateReservationChanged } = merchantUserPermissionSlice.actions
export const { allowUpdateReservationChanged } = merchantUserPermissionSlice.actions
export const { allowDeleteReservationChanged } = merchantUserPermissionSlice.actions
export const { allowReadTicketMasterChanged } = merchantUserPermissionSlice.actions
export const { allowCreateTicketMasterChanged } = merchantUserPermissionSlice.actions
export const { allowUpdateTicketMasterChanged } = merchantUserPermissionSlice.actions
export const { allowDeleteTicketMasterChanged } = merchantUserPermissionSlice.actions
export const { allowReadMonthlyPaymentPlanChanged } = merchantUserPermissionSlice.actions
export const { allowCreateMonthlyPaymentPlanChanged } = merchantUserPermissionSlice.actions
export const { allowUpdateMonthlyPaymentPlanChanged } = merchantUserPermissionSlice.actions
export const { allowDeleteMonthlyPaymentPlanChanged } = merchantUserPermissionSlice.actions
export const { allowReadResourceChanged } = merchantUserPermissionSlice.actions
export const { allowCreateResourceChanged } = merchantUserPermissionSlice.actions
export const { allowUpdateResourceChanged } = merchantUserPermissionSlice.actions
export const { allowDeleteResourceChanged } = merchantUserPermissionSlice.actions
export const { allowReadProductChanged } = merchantUserPermissionSlice.actions
export const { allowCreateProductChanged } = merchantUserPermissionSlice.actions
export const { allowUpdateProductChanged } = merchantUserPermissionSlice.actions
export const { allowDeleteProductChanged } = merchantUserPermissionSlice.actions
export const { allowReadCustomerChanged } = merchantUserPermissionSlice.actions
export const { allowCreateCustomerChanged } = merchantUserPermissionSlice.actions
export const { allowUpdateCustomerChanged } = merchantUserPermissionSlice.actions
export const { allowDeleteCustomerChanged } = merchantUserPermissionSlice.actions
export const { allowReadCustomerGroupChanged } = merchantUserPermissionSlice.actions
export const { allowCreateCustomerGroupChanged } = merchantUserPermissionSlice.actions
export const { allowUpdateCustomerGroupChanged } = merchantUserPermissionSlice.actions
export const { allowDeleteCustomerGroupChanged } = merchantUserPermissionSlice.actions
export const { allowReadWebpageChanged } = merchantUserPermissionSlice.actions
export const { allowCreateWebpageChanged } = merchantUserPermissionSlice.actions
export const { allowUpdateWebpageChanged } = merchantUserPermissionSlice.actions
export const { allowDeleteWebpageChanged } = merchantUserPermissionSlice.actions
export const { allowReadQuestionnaireMasterChanged } = merchantUserPermissionSlice.actions
export const { allowCreateQuestionnaireMasterChanged } = merchantUserPermissionSlice.actions
export const { allowUpdateQuestionnaireMasterChanged } = merchantUserPermissionSlice.actions
export const { allowDeleteQuestionnaireMasterChanged } = merchantUserPermissionSlice.actions
export const { allowReadQuestionnaireAnswerChanged } = merchantUserPermissionSlice.actions
export const { allowCreatePaymentRequestChanged } = merchantUserPermissionSlice.actions
export const { allowReadPaymentSalesChanged } = merchantUserPermissionSlice.actions
export const { allowUpdateCreditCardChanged } = merchantUserPermissionSlice.actions
export const { allowReadStripeBusinessInfoChanged } = merchantUserPermissionSlice.actions
export const { allowStripeBusinessInfoChanged } = merchantUserPermissionSlice.actions

export default merchantUserPermissionSlice.reducer
