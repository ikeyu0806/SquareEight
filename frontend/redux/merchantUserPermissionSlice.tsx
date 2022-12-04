import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const merchantUserPermissionSlice = createSlice({
  name: 'merchantUserPermission',
  initialState: {
    showPermissionGuideModal: false,
    allowReadMerchantUser: 'Unconfirmed',
    allowCreateMerchantUser: 'Unconfirmed',
    allowUpdateMerchantUser: 'Unconfirmed',
    allowDeleteMerchantUser: 'Unconfirmed',
    allowUpdateMerchantUserPermission: 'Unconfirmed',
    allowReadReserveFrame: 'Unconfirmed',
    allowCreateReserveFrame: 'Unconfirmed',
    allowUpdateReserveFrame: 'Unconfirmed',
    allowDeleteReserveFrame: 'Unconfirmed',
    allowReadReservation: 'Unconfirmed',
    allowCreateReservation: 'Unconfirmed',
    allowConfirmReservation: 'Unconfirmed',
    allowCancelReservation: 'Unconfirmed',
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
    allowUpdateDeliveryDatetime: 'Unconfirmed',
    allowReadCustomer: 'Unconfirmed',
    allowCreateCustomer: 'Unconfirmed',
    allowUpdateCustomer: 'Unconfirmed',
    allowDeleteCustomer: 'Unconfirmed',
    allowReadCustomerGroup: 'Unconfirmed',
    allowCreateCustomerGroup: 'Unconfirmed',
    allowUpdateCustomerGroup: 'Unconfirmed',
    allowDeleteCustomerGroup: 'Unconfirmed',
    allowReadMessageTemplate: 'Unconfirmed',
    allowCreateMessageTemplate: 'Unconfirmed',
    allowUpdateMessageTemplate: 'Unconfirmed',
    allowDeleteMessageTemplate: 'Unconfirmed',
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
    allowReadSales: 'Unconfirmed',
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
    allowUpdateMerchantUserPermissionChanged: (state, action: PayloadAction<string>) => {
      state.allowUpdateMerchantUserPermission = action.payload
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
    allowConfirmReservationChanged: (state, action: PayloadAction<string>) => {
      state.allowConfirmReservation = action.payload
    },
    allowCancelReservationChanged: (state, action: PayloadAction<string>) => {
      state.allowCancelReservation = action.payload
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
    allowUpdateDeliveryDatetimeChanged: (state, action: PayloadAction<string>) => {
      state.allowUpdateDeliveryDatetime = action.payload
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
    allowReadMessageTemplateChanged: (state, action: PayloadAction<string>) => {
      state.allowReadMessageTemplate = action.payload
    },
    allowCreateMessageTemplateChanged: (state, action: PayloadAction<string>) => {
      state.allowCreateMessageTemplate = action.payload
    },
    allowUpdateMessageTemplateChanged: (state, action: PayloadAction<string>) => {
      state.allowUpdateMessageTemplate = action.payload
    },
    allowDeleteMessageTemplateChanged: (state, action: PayloadAction<string>) => {
      state.allowDeleteMessageTemplate = action.payload
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
    allowReadSalesChanged: (state, action: PayloadAction<string>) => {
      state.allowReadSales = action.payload
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

export const { showPermissionGuideModalChanged } = merchantUserPermissionSlice.actions
export const { allowReadMerchantUserChanged } = merchantUserPermissionSlice.actions
export const { allowCreateMerchantUserChanged } = merchantUserPermissionSlice.actions
export const { allowUpdateMerchantUserChanged } = merchantUserPermissionSlice.actions
export const { allowDeleteMerchantUserChanged } = merchantUserPermissionSlice.actions
export const { allowUpdateMerchantUserPermissionChanged } = merchantUserPermissionSlice.actions
export const { allowReadReserveFrameChanged } = merchantUserPermissionSlice.actions
export const { allowCreateReserveFrameChanged } = merchantUserPermissionSlice.actions
export const { allowUpdateReserveFrameChanged } = merchantUserPermissionSlice.actions
export const { allowDeleteReserveFrameChanged } = merchantUserPermissionSlice.actions
export const { allowReadReservationChanged } = merchantUserPermissionSlice.actions
export const { allowCreateReservationChanged } = merchantUserPermissionSlice.actions
export const { allowConfirmReservationChanged } = merchantUserPermissionSlice.actions
export const { allowCancelReservationChanged } = merchantUserPermissionSlice.actions
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
export const { allowUpdateDeliveryDatetimeChanged } = merchantUserPermissionSlice.actions
export const { allowReadCustomerChanged } = merchantUserPermissionSlice.actions
export const { allowCreateCustomerChanged } = merchantUserPermissionSlice.actions
export const { allowUpdateCustomerChanged } = merchantUserPermissionSlice.actions
export const { allowDeleteCustomerChanged } = merchantUserPermissionSlice.actions
export const { allowReadCustomerGroupChanged } = merchantUserPermissionSlice.actions
export const { allowCreateCustomerGroupChanged } = merchantUserPermissionSlice.actions
export const { allowUpdateCustomerGroupChanged } = merchantUserPermissionSlice.actions
export const { allowDeleteCustomerGroupChanged } = merchantUserPermissionSlice.actions
export const { allowReadMessageTemplateChanged } = merchantUserPermissionSlice.actions
export const { allowCreateMessageTemplateChanged } = merchantUserPermissionSlice.actions
export const { allowUpdateMessageTemplateChanged } = merchantUserPermissionSlice.actions
export const { allowDeleteMessageTemplateChanged } = merchantUserPermissionSlice.actions
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
export const { allowReadSalesChanged } = merchantUserPermissionSlice.actions
export const { allowUpdateCreditCardChanged } = merchantUserPermissionSlice.actions
export const { allowReadStripeBusinessInfoChanged } = merchantUserPermissionSlice.actions
export const { allowUpdateStripeBusinessInfoChanged } = merchantUserPermissionSlice.actions

export default merchantUserPermissionSlice.reducer
