Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post 'stripe_webhooks', to: 'stripe_webhooks#index'

  namespace :api do
    namespace :internal do
      get 'accounts/stripe_account_info', to: 'accounts#stripe_account_info'
      get 'accounts/dashboard_contents', to: 'accounts#dashboard_contents'
      get 'accounts/page_links', to: 'accounts#page_links'
      get 'accounts/questionnaire_answers', to: 'accounts#questionnaire_answers'
      get 'accounts/stripe_connected_account', to: 'accounts#stripe_connected_account'
      get 'accounts/payment_methods', to: 'accounts#payment_methods'
      get 'accounts/stripe_payment_history', to: 'accounts#stripe_payment_history'
      get 'accounts/account_info', to: 'accounts#account_info'
      post 'accounts/register_credit_card', to: 'accounts#register_credit_card'
      post 'accounts/register_stripe_business_info', to: 'accounts#register_stripe_business_info'
      post 'accounts/register_stripe_bank_account', to: 'accounts#register_stripe_bank_account'
      post 'accounts/update_selected_bank_account', to: 'accounts#update_selected_bank_account'
      post 'accounts/register_stripe_person', to: 'accounts#register_stripe_person'
      post 'accounts/update_plan', to: 'accounts#update_plan'
      post 'accounts/update', to: 'accounts#update'
      delete 'accounts/cancel_plan', to: 'accounts#cancel_plan'
      post 'accounts/withdrawal', to: 'accounts#withdrawal'
      post 'accounts/:public_id/update_payment_method', to: 'accounts#update_payment_method'
      delete 'accounts/:public_id/detach_stripe_payment_method', to: 'accounts#detach_stripe_payment_method'
      delete 'accounts/delete_bank_account/:external_account_id', to: 'accounts#delete_bank_account'
      get 'merchant_users/current_merchant_user_info', to: 'merchant_users#current_merchant_user_info'
      post 'merchant_users/:public_id/update', to: 'merchant_users#update'
      post 'merchant_users/confirm_verification_code', to: 'merchant_users#confirm_verification_code'
      post 'merchant_users/confirm_update_email_verification_code', to: 'merchant_users#confirm_update_email_verification_code'
      post 'merchant_users/find_or_create_by_google_auth', to: 'merchant_users#find_or_create_by_google_auth'
      post 'merchant_users/send_reset_password_email', to: 'merchant_users#send_reset_password_email'
      post 'merchant_users/update_password', to: 'merchant_users#update_password'
      post 'merchant_users/resend_verification_code', to: 'merchant_users#resend_verification_code'
      post 'merchant_users', to: 'merchant_users#create'
      delete 'merchant_users/disconnect_google_auth', to: 'merchant_users#disconnect_google_auth'
      get 'end_users/customer_toppage_info', to: 'end_users#customer_toppage_info'
      get 'end_users/stripe_payment_history', to: 'end_users#stripe_payment_history'
      get 'end_users/subscription_lists', to: 'end_users#subscription_lists'
      get 'end_users/payment_methods', to: 'end_users#payment_methods'
      get 'end_users/current_end_user_info', to: 'end_users#current_end_user_info'
      get 'end_users/mypage_info', to: 'end_users#mypage_info'
      post 'end_users/:public_id/update', to: 'end_users#update'
      post 'end_users/find_or_create_by_google_auth', to: 'end_users#find_or_create_by_google_auth'
      post 'end_users/register_credit_card', to: 'end_users#register_credit_card'
      post 'end_users/confirm_verification_code', to: 'end_users#confirm_verification_code'
      post 'end_users/confirm_update_email_verification_code', to: 'end_users#confirm_update_email_verification_code'
      post 'end_users/:payment_method_id/update_payment_method', to: 'end_users#update_payment_method'
      post 'end_users/send_reset_password_email', to: 'end_users#send_reset_password_email'
      post 'end_users/update_password', to: 'end_users#update_password'
      post 'end_users/resend_verification_code', to: 'end_users#resend_verification_code'
      post 'end_users', to: 'end_users#create'
      delete 'end_users/:payment_method_id/detach_stripe_payment_method', to: 'end_users#detach_stripe_payment_method'
      delete 'end_users/disconnect_google_auth', to: 'end_users#disconnect_google_auth'
      delete 'end_users/:public_id/cancel_subscription', to: 'end_users#cancel_subscription'
      get 'customers/:customer_public_id/questionnaire_answers', to: 'customers#questionnaire_answers'
      post 'customers', to: 'customers#create'
      get 'webpages/edit', to: 'webpages#edit'
      get 'webpages/:public_id', to: 'webpages#show'
      get 'webpages', to: 'webpages#index'
      post 'webpages/complete_create_homepage', to: 'webpages#complete_create_homepage'
      post 'webpages/:public_id/update', to: 'webpages#update'
      post 'webpages', to: 'webpages#create'
      delete 'webpages/:public_id', to: 'webpages#destroy'
      get 'products/:public_id/purchase_info', to: 'products#purchase_info'
      get 'products/:public_id', to: 'products#show'
      get 'products', to: 'products#index'
      post 'products', to: 'products#create'
      post 'products/insert_cart', to: 'products#insert_cart'
      post 'products/:public_id/update', to: 'products#update'
      delete 'products/:public_id', to: 'products#logical_delete'
      get 'ticket_masters/:public_id/purchase_info', to: 'ticket_masters#purchase_info'
      get 'ticket_masters/:public_id', to: 'ticket_masters#show'
      get 'ticket_masters', to: 'ticket_masters#index'
      post 'ticket_masters/insert_cart', to: 'ticket_masters#insert_cart'
      post 'ticket_masters/:public_id/update', to: 'ticket_masters#update'
      post 'ticket_masters', to: 'ticket_masters#create'
      delete 'ticket_masters/:public_id', to: 'ticket_masters#logical_delete'
      get 'purchased_tickets', to: 'purchased_tickets#index'
      get 'purchased_tickets/:public_id', to: 'purchased_tickets#show'
      get 'monthly_payment_plans/:public_id/purchase_info', to: 'monthly_payment_plans#purchase_info'
      get 'monthly_payment_plans/:public_id', to: 'monthly_payment_plans#show'
      get 'monthly_payment_plans', to: 'monthly_payment_plans#index'
      post 'monthly_payment_plans/insert_cart', to: 'monthly_payment_plans#insert_cart'
      post 'monthly_payment_plans/:public_id/update', to: 'monthly_payment_plans#update'
      post 'monthly_payment_plans', to: 'monthly_payment_plans#create'
      delete 'monthly_payment_plans/:public_id', to: 'monthly_payment_plans#logical_delete'
      get 'resources/:public_id/edit', to: 'resources#edit'
      get 'resources', to: 'resources#index'
      post 'resources', to: 'resources#create'
      post 'resources/:public_id/update', to: 'resources#update'
      post 'inquiry', to: 'inquiry#send_mail_to_admin'
      get 'reserve_frames/settable_relation_data', to: 'reserve_frames#settable_relation_data'
      get 'reserve_frames/:public_id', to: 'reserve_frames#show'
      get 'reserve_frames', to: 'reserve_frames#index'
      post 'reserve_frames/:public_id', to: 'reserve_frames#update'
      post 'reserve_frames', to: 'reserve_frames#create'
      delete 'reserve_frames/:public_id', to: 'reserve_frames#logical_delete'
      get 'delivery_targets', to: 'delivery_targets#index'
      post 'delivery_targets/:public_id/update_default', to: 'delivery_targets#update_default'
      post 'delivery_targets', to: 'delivery_targets#create'
      delete 'delivery_targets/:public_id', to: 'delivery_targets#destroy'
      get 'orders/:public_id', to: 'orders#show'
      get 'orders/:order_public_id/order_items', to: 'orders#order_items'
      get 'orders', to: 'orders#index'
      get 'order_items', to: 'order_items#index'
      post 'order_items/:public_id/update_shipped', to: 'order_items#update_shipped'
      get 'calendar/:public_id/monthly_reserve_frames', to: 'calendar#monthly_reserve_frames'
      get 'account_notifications', to: 'account_notifications#index'
      get 'system_account_notifications/:public_id', to: 'system_account_notifications#show'
      get 'system_account_notifications', to: 'system_account_notifications#index'
      post 'system_account_notifications/:public_id', to: 'system_account_notifications#update'
      post 'system_account_notifications', to: 'system_account_notifications#create'
      get 'end_user_notifications', to: 'end_user_notifications#index'
      get 'system_end_user_notifications/:public_id', to: 'system_end_user_notifications#show'
      get 'system_end_user_notifications', to: 'system_end_user_notifications#index'
      post 'system_end_user_notifications/:public_id', to: 'system_end_user_notifications#update'
      post 'system_end_user_notifications', to: 'system_end_user_notifications#create'
      get 'carts/account_index', to: 'carts#account_index'
      delete 'carts/delete_cart_item/:public_id', to: 'carts#delete_cart_item'
      get 'cash_registers', to: 'cash_registers#index'
      post 'cash_registers/purchase', to: 'cash_registers#purchase'
      get 'reservations/input_customer_info', to: 'reservations#input_customer_info'
      get 'reservations/register_reservation_info', to: 'reservations#register_reservation_info'
      get 'reservations/:public_id', to: 'reservations#show'
      post 'reservations/:public_id/update_status', to: 'reservations#update_status'
      post 'reservations/insert_time_payment_method', to: 'reservations#insert_time_payment_method'
      post 'reservations/register_by_merchant_control', to: 'reservations#register_by_merchant_control'
      post 'reservations/:public_id/confirm', to: 'reservations#confirm'
      post 'reservations', to: 'reservations#register_by_merchant_control'
      delete 'reservations/:public_id', to: 'reservations#cancel'
      get 'questionnaire_masters/:public_id/edit_info', to: 'questionnaire_masters#edit_info'
      get 'questionnaire_masters/:public_id/answers', to: 'questionnaire_masters#answers'
      get 'questionnaire_masters/:public_id', to: 'questionnaire_masters#show'
      get 'questionnaire_masters', to: 'questionnaire_masters#index'
      post 'questionnaire_masters', to: 'questionnaire_masters#create'
      post 'questionnaire_masters/:public_id/update', to: 'questionnaire_masters#update'
      delete 'questionnaire_masters/:public_id', to: 'questionnaire_masters#logical_delete'
      get 'questionnaire_answers/:public_id', to: 'questionnaire_answers#show'
      post 'questionnaire_answers/:questionnaire_master_public_id', to: 'questionnaire_answers#create'
      get 'message_templates', to: 'message_templates#index'
      post 'message_templates/send_mail', to: 'message_templates#send_mail'
      post 'message_templates/:public_id', to: 'message_templates#update'
      post 'message_templates', to: 'message_templates#create'
      delete 'message_templates/:public_id', to: 'message_templates#destroy'
      get 'shared_components', to: 'shared_components#show'
      post 'shared_components/register', to: 'shared_components#register'
      get 'delivery_datetime_settings', to: 'delivery_datetime_settings#index'
      post 'delivery_datetime_settings/register', to: 'delivery_datetime_settings#register'
      get 'payment_requests/init_state', to: 'payment_requests#init_stat'
      get 'payment_requests/:public_id', to: 'payment_requests#show'
      get 'payment_requests', to: 'payment_requests#index'
      post 'payment_requests/send_payment_request_mail', to: 'payment_requests#send_payment_request_mail'
      post 'payment_requests/exec_payment', to: 'payment_requests#exec_payment'
      namespace :merchant do
        get 'sessions', to: 'sessions#login_status'
        post 'sessions/create_by_google_auth', to: 'sessions#create_by_google_auth'
        post 'sessions', to: 'sessions#create'
        delete 'sessions', to: 'sessions#destroy'
      end
      namespace :end_user do
        get 'sessions', to: 'sessions#login_status'
        post 'sessions/create_by_google_auth', to: 'sessions#create_by_google_auth'
        post 'sessions', to: 'sessions#create'
        delete 'sessions', to: 'sessions#destroy'
        get 'reservations', to: 'reservations#index'
        delete 'reservations/:public_id/cancel_reservation', to: 'reservations#cancel_reservation'
      end
      namespace :account do
        get 'stripe_payment_intents/system_plan_subscription_payments', to: 'stripe_payment_intents#system_plan_subscription_payments'
        get 'reservations', to: 'reservations#index'
        get 'customers', to: 'customers#index'
        get 'orders/:public_id', to: 'orders#show'
        get 'customers/:customer_public_id/charges', to: 'customers#charges'
        get 'customers/:customer_public_id/orders', to: 'customers#orders'
        post 'customers', to: 'customers#create'
        post 'customers/:public_id/update', to: 'customers#update'
        get 'customer_groups/:public_id', to: 'customer_groups#show'
        get 'customer_groups', to: 'customer_groups#index'
        post 'customer_groups', to: 'customer_groups#create'
        post 'customer_groups/:public_id/update', to: 'customer_groups#update'
      end
      namespace :system_admin_user do
        get 'sessions', to: 'sessions#login_status'
        post 'sessions', to: 'sessions#create'
        delete 'sessions', to: 'sessions#destroy'
      end
    end
  end

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
end
