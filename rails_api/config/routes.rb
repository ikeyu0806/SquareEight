Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
    namespace :internal do
      post 'sessions', to: 'sessions#create'
      delete 'sessions', to: 'sessions#destroy'
      post 'merchant_users/confirm_verification_code', to: 'merchant_users#confirm_verification_code'
      post 'merchant_users', to: 'merchant_users#create'
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
    end
  end

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
end
