Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
    namespace :internal do
      get 'accounts/page_links', to: 'accounts#page_links'
      get 'accounts/stripe_connected_account', to: 'accounts#stripe_connected_account'
      get 'accounts/payment_methods', to: 'accounts#payment_methods'
      get 'accounts/reserve_events', to: 'accounts#reserve_events'
      post 'accounts/register_credit_card', to: 'accounts#register_credit_card'
      post 'accounts/register_stripe_business_info', to: 'accounts#register_stripe_business_info'
      post 'accounts/register_stripe_bank_account', to: 'accounts#register_stripe_bank_account'
      post 'accounts/update_selected_bank_account', to: 'accounts#update_selected_bank_account'
      post 'accounts/:payment_method_id/update_payment_method', to: 'accounts#update_payment_method'
      delete 'accounts/:payment_method_id/detach_stripe_payment_method', to: 'accounts#detach_stripe_payment_method'
      delete 'accounts/delete_bank_account/:external_account_id', to: 'accounts#delete_bank_account'
      get 'merchant_users/current_merchant_user_info', to: 'merchant_users#current_merchant_user_info'
      post 'merchant_users/:id/update', to: 'merchant_users#update'
      post 'merchant_users/confirm_verification_code', to: 'merchant_users#confirm_verification_code'
      post 'merchant_users/confirm_update_email_verification_code', to: 'merchant_users#confirm_update_email_verification_code'
      post 'merchant_users/find_or_create_by_google_auth', to: 'merchant_users#find_or_create_by_google_auth'
      post 'merchant_users', to: 'merchant_users#create'
      delete 'merchant_users/disconnect_google_auth', to: 'merchant_users#disconnect_google_auth'
      get 'end_users/payment_methods', to: 'end_users#payment_methods'
      get 'end_users/current_end_user_info', to: 'end_users#current_end_user_info'
      post 'end_users/:id/update', to: 'end_users#update'
      post 'end_users/find_or_create_by_google_auth', to: 'end_users#find_or_create_by_google_auth'
      post 'end_users/register_credit_card', to: 'end_users#register_credit_card'
      post 'end_users/confirm_verification_code', to: 'end_users#confirm_verification_code'
      post 'end_users/confirm_update_email_verification_code', to: 'end_users#confirm_update_email_verification_code'
      post 'end_users/:payment_method_id/update_payment_method', to: 'end_users#update_payment_method'
      post 'end_users', to: 'end_users#create'
      delete 'end_users/:payment_method_id/detach_stripe_payment_method', to: 'end_users#detach_stripe_payment_method'
      delete 'end_users/disconnect_google_auth', to: 'end_users#disconnect_google_auth'
      post 'customers', to: 'customers#create'
      delete 'homepages/:id', to: 'homepages#destroy'
      get 'homepages/:id/shared_component', to: 'homepages#shared_component'
      get 'homepages/webpages', to: 'homepages#webpages'
      get 'homepages', to: 'homepages#index'
      post 'homepages/update_tag', to: 'homepages#update_tag'
      post 'homepages/publish', to: 'homepages#publish'
      post 'homepages/unpublish', to: 'homepages#unpublish'
      post 'homepages/update_shared_component', to: 'homepages#update_shared_component'
      post 'homepages', to: 'homepages#create'
      get 'webpages/edit', to: 'webpages#edit'
      get 'webpages/:id', to: 'webpages#show'
      post 'webpages/complete_create_homepage', to: 'webpages#complete_create_homepage'
      post 'webpages/update', to: 'webpages#update'
      post 'webpages', to: 'webpages#create'
      get 'ticket_masters/:id', to: 'ticket_masters#show'
      get 'ticket_masters', to: 'ticket_masters#index'
      post 'ticket_masters/purchase', to: 'ticket_masters#purchase'
      post 'ticket_masters/:id/update', to: 'ticket_masters#update'
      post 'ticket_masters', to: 'ticket_masters#create'
      get 'monthly_payment_plans/:id', to: 'monthly_payment_plans#show'
      get 'monthly_payment_plans', to: 'monthly_payment_plans#index'
      post 'monthly_payment_plans/purchase', to: 'monthly_payment_plans#purchase'
      post 'monthly_payment_plans/:id/update', to: 'monthly_payment_plans#update'
      post 'monthly_payment_plans', to: 'monthly_payment_plans#create'
      get 'resources/:id/edit', to: 'resources#edit'
      get 'resources', to: 'resources#index'
      post 'resources', to: 'resources#create'
      post 'business_hours/register', to: 'business_hours#register'
      post 'inquiry', to: 'inquiry#send_mail_to_admin'
      get 'reserve_frames/reserve_events', to: 'reserve_frames#reserve_events'
      get 'reserve_frames/settable_relation_data', to: 'reserve_frames#settable_relation_data'
      get 'reserve_frames/:id', to: 'reserve_frames#show'
      get 'reserve_frames', to: 'reserve_frames#index'
      post 'reserve_frames', to: 'reserve_frames#create'
      get 'orders/:order_id/order_items', to: 'orders#order_items'
      get 'calendar/monthly_reserve_frames', to: 'calendar#monthly_reserve_frames'
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
      end
    end
  end

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
end
