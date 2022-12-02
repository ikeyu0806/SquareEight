import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const settingFormMerchantUserPermissionSlice = createSlice({
  name: 'settingFormMerchantUserPermission',
  initialState: {
    showPermissionGuideModal: false,
    allowReadMerchantUser: 'Unconfirmed',
    allowCreateMerchantUser: 'Unconfirmed',
    allowUpdateMerchantUser: 'Unconfirmed',
    allowDeleteMerchantUser: 'Unconfirmed',
    allowReadReserveFrame: 'Unconfirmed',
    allowCreateReserveFrame: 'Unconfirmed',
    allowUpdateReserveFrame: 'Unconfirmed',
    allowDeleteReserveFrame: 'Unconfirmed',
    allowReadReservation: 'Unconfirmed',
    allowCreateReservation: 'Unconfirmed',
    allowUpdateReservation: 'Unconfirmed',
    allowDeleteReservation: 'Unconfirmed',
    allowReadTicketMaster: 'Unconfirmed',
    allowCreateTicketMaster: 'Unconfirmed',
    allowUpdateTicketMaster: 'Unconfirmed',
    allowDeleteTicketMaster: 'Unconfirmed',
    allowReadMonthlyPaymentPlan: 'Unconfirmed',
    allowCreateMonthlyPaymentPlan: 'Unconfirmed',
    allowUpdateMonthlyPaymentPlan: 'Unconfirmed',
    allowDeleteMonthlyPaymentPlan: 'Unconfirmed',
    allowReadResource: 'Unconfirmed',
    allowCreateResource: 'Unconfirmed',
    allowUpdateResource: 'Unconfirmed',
    allowDeleteResource: 'Unconfirmed',
    allowReadProduct: 'Unconfirmed',
    allowCreateProduct: 'Unconfirmed',
    allowUpdateProduct: 'Unconfirmed',
    allowDeleteProduct: 'Unconfirmed',
    allowUpdateDeliveryTarget: 'Unconfirmed',
    allowReadCustomer: 'Unconfirmed',
    allowCreateCustomer: 'Unconfirmed',
    allowUpdateCustomer: 'Unconfirmed',
    allowDeleteCustomer: 'Unconfirmed',
    allowReadCustomerGroup: 'Unconfirmed',
    allowCreateCustomerGroup: 'Unconfirmed',
    allowUpdateCustomerGroup: 'Unconfirmed',
    allowDeleteCustomerGroup: 'Unconfirmed',
    allowReadWebpage: 'Unconfirmed',
    allowCreateWebpage: 'Unconfirmed',
    allowUpdateWebpage: 'Unconfirmed',
    allowDeleteWebpage: 'Unconfirmed',
    allowReadQuestionnaireMaster: 'Unconfirmed',
    allowCreateQuestionnaireMaster: 'Unconfirmed',
    allowUpdateQuestionnaireMaster: 'Unconfirmed',
    allowDeleteQuestionnaireMaster: 'Unconfirmed',
    allowReadQuestionnaireAnswer: 'Unconfirmed',
    allowReadPaymentRequest: 'Unconfirmed',
    allowCreatePaymentRequest: 'Unconfirmed',
    allowReadPaymentSales: 'Unconfirmed',
    allowUpdateCreditCard: 'Unconfirmed',
    allowReadStripeBusinessInfo: 'Unconfirmed',
    allowUpdateStripeBusinessInfo: 'Unconfirmed',
  },
  reducers: {
    showPermissionGuideModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showPermissionGuideModal = action.payload
    },
    allowReadMerchantUserChanged: (state, action: PayloadAction<string>) => {
      state.allowReadMerchantUser = action.payload
    },
    allowCreateMerchantUserChanged: (state, action: PayloadAction<string>) => {
      state.allowCreateMerchantUser = action.payload
    },
    allowUpdateMerchantUserChanged: (state, action: PayloadAction<string>) => {
      state.allowUpdateMerchantUser = action.payload
    },
    allowDeleteMerchantUserChanged: (state, action: PayloadAction<string>) => {
      state.allowDeleteMerchantUser = action.payload
    },
    allowReadReserveFrameChanged: (state, action: PayloadAction<string>) => {
      state.allowReadReserveFrame = action.payload
    },
    allowCreateReserveFrameChanged: (state, action: PayloadAction<string>) => {
      state.allowCreateReserveFrame = action.payload
    },
    allowUpdateReserveFrameChanged: (state, action: PayloadAction<string>) => {
      state.allowUpdateReserveFrame = action.payload
    },
    allowDeleteReserveFrameChanged: (state, action: PayloadAction<string>) => {
      state.allowDeleteReserveFrame = action.payload
    },
    allowReadReservationChanged: (state, action: PayloadAction<string>) => {
      state.allowReadReservation = action.payload
    },
    allowCreateReservationChanged: (state, action: PayloadAction<string>) => {
      state.allowCreateReservation = action.payload
    },
    allowUpdateReservationChanged: (state, action: PayloadAction<string>) => {
      state.allowUpdateReservation = action.payload
    },
    allowDeleteReservationChanged: (state, action: PayloadAction<string>) => {
      state.allowDeleteReservation = action.payload
    },
    allowReadTicketMasterChanged: (state, action: PayloadAction<string>) => {
      state.allowReadTicketMaster = action.payload
    },
    allowCreateTicketMasterChanged: (state, action: PayloadAction<string>) => {
      state.allowCreateTicketMaster = action.payload
    },
    allowUpdateTicketMasterChanged: (state, action: PayloadAction<string>) => {
      state.allowUpdateTicketMaster = action.payload
    },
    allowDeleteTicketMasterChanged: (state, action: PayloadAction<string>) => {
      state.allowDeleteTicketMaster = action.payload
    },
    allowReadMonthlyPaymentPlanChanged: (state, action: PayloadAction<string>) => {
      state.allowReadMonthlyPaymentPlan = action.payload
    },
    allowCreateMonthlyPaymentPlanChanged: (state, action: PayloadAction<string>) => {
      state.allowCreateMonthlyPaymentPlan = action.payload
    },
    allowUpdateMonthlyPaymentPlanChanged: (state, action: PayloadAction<string>) => {
      state.allowUpdateMonthlyPaymentPlan = action.payload
    },
    allowDeleteMonthlyPaymentPlanChanged: (state, action: PayloadAction<string>) => {
      state.allowDeleteMonthlyPaymentPlan= action.payload
    },
    allowReadResourceChanged: (state, action: PayloadAction<string>) => {
      state.allowReadResource = action.payload
    },
    allowCreateResourceChanged: (state, action: PayloadAction<string>) => {
      state.allowCreateResource = action.payload
    },
    allowUpdateResourceChanged: (state, action: PayloadAction<string>) => {
      state.allowUpdateResource = action.payload
    },
    allowDeleteResourceChanged: (state, action: PayloadAction<string>) => {
      state.allowDeleteResource = action.payload
    },
    allowReadProductChanged: (state, action: PayloadAction<string>) => {
      state.allowReadProduct = action.payload
    },
    allowCreateProductChanged: (state, action: PayloadAction<string>) => {
      state.allowCreateProduct = action.payload
    },
    allowUpdateProductChanged: (state, action: PayloadAction<string>) => {
      state.allowUpdateProduct = action.payload
    },
    allowDeleteProductChanged: (state, action: PayloadAction<string>) => {
      state.allowDeleteProduct = action.payload
    },
    allowReadCustomerChanged: (state, action: PayloadAction<string>) => {
      state.allowReadCustomer = action.payload
    },
    allowCreateCustomerChanged: (state, action: PayloadAction<string>) => {
      state.allowCreateCustomer = action.payload
    },
    allowUpdateCustomerChanged: (state, action: PayloadAction<string>) => {
      state.allowUpdateCustomer = action.payload
    },
    allowDeleteCustomerChanged: (state, action: PayloadAction<string>) => {
      state.allowDeleteCustomer = action.payload
    },
    allowReadCustomerGroupChanged: (state, action: PayloadAction<string>) => {
      state.allowReadCustomerGroup = action.payload
    },
    allowCreateCustomerGroupChanged: (state, action: PayloadAction<string>) => {
      state.allowCreateCustomerGroup = action.payload
    },
    allowUpdateCustomerGroupChanged: (state, action: PayloadAction<string>) => {
      state.allowUpdateCustomerGroup = action.payload
    },
    allowDeleteCustomerGroupChanged: (state, action: PayloadAction<string>) => {
      state.allowDeleteCustomerGroup = action.payload
    },
    allowReadWebpageChanged: (state, action: PayloadAction<string>) => {
      state.allowReadWebpage = action.payload
    },
    allowCreateWebpageChanged: (state, action: PayloadAction<string>) => {
      state.allowCreateWebpage = action.payload
    },
    allowUpdateWebpageChanged: (state, action: PayloadAction<string>) => {
      state.allowUpdateWebpage = action.payload
    },
    allowDeleteWebpageChanged: (state, action: PayloadAction<string>) => {
      state.allowDeleteWebpage = action.payload
    },
    allowReadQuestionnaireMasterChanged: (state, action: PayloadAction<string>) => {
      state.allowReadQuestionnaireMaster = action.payload
    },
    allowCreateQuestionnaireMasterChanged: (state, action: PayloadAction<string>) => {
      state.allowCreateQuestionnaireMaster = action.payload
    },
    allowUpdateQuestionnaireMasterChanged: (state, action: PayloadAction<string>) => {
      state.allowUpdateQuestionnaireMaster = action.payload
    },
    allowDeleteQuestionnaireMasterChanged: (state, action: PayloadAction<string>) => {
      state.allowDeleteQuestionnaireMaster = action.payload
    },
    allowReadQuestionnaireAnswerChanged: (state, action: PayloadAction<string>) => {
      state.allowReadQuestionnaireAnswer = action.payload
    },
    allowReadPaymentRequestChanged: (state, action: PayloadAction<string>) => {
      state.allowReadPaymentRequest = action.payload
    },
    allowCreatePaymentRequestChanged: (state, action: PayloadAction<string>) => {
      state.allowCreatePaymentRequest = action.payload
    },
    allowReadPaymentSalesChanged: (state, action: PayloadAction<string>) => {
      state.allowReadPaymentSales = action.payload
    },
    allowUpdateCreditCardChanged: (state, action: PayloadAction<string>) => {
      state.allowUpdateCreditCard = action.payload
    },
    allowReadStripeBusinessInfoChanged: (state, action: PayloadAction<string>) => {
      state.allowReadStripeBusinessInfo = action.payload
    },
    allowUpdateStripeBusinessInfoChanged: (state, action: PayloadAction<string>) => {
      state.allowUpdateStripeBusinessInfo = action.payload
    },
  },
})

export const { showPermissionGuideModalChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowReadMerchantUserChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowCreateMerchantUserChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowUpdateMerchantUserChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowReadReserveFrameChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowCreateReserveFrameChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowUpdateReserveFrameChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowDeleteReserveFrameChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowReadReservationChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowCreateReservationChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowUpdateReservationChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowDeleteReservationChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowReadTicketMasterChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowCreateTicketMasterChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowUpdateTicketMasterChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowDeleteTicketMasterChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowReadMonthlyPaymentPlanChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowCreateMonthlyPaymentPlanChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowUpdateMonthlyPaymentPlanChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowDeleteMonthlyPaymentPlanChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowReadResourceChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowCreateResourceChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowUpdateResourceChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowDeleteResourceChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowReadProductChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowCreateProductChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowUpdateProductChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowDeleteProductChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowReadCustomerChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowCreateCustomerChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowUpdateCustomerChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowDeleteCustomerChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowReadCustomerGroupChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowCreateCustomerGroupChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowUpdateCustomerGroupChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowDeleteCustomerGroupChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowReadWebpageChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowCreateWebpageChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowUpdateWebpageChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowDeleteWebpageChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowReadQuestionnaireMasterChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowCreateQuestionnaireMasterChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowUpdateQuestionnaireMasterChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowDeleteQuestionnaireMasterChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowReadQuestionnaireAnswerChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowCreatePaymentRequestChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowReadPaymentSalesChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowUpdateCreditCardChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowReadStripeBusinessInfoChanged } = settingFormMerchantUserPermissionSlice.actions
export const { allowUpdateStripeBusinessInfoChanged } = settingFormMerchantUserPermissionSlice.actions

export default settingFormMerchantUserPermissionSlice.reducer
