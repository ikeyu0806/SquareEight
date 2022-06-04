Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
    namespace :internal do
      post 'sessions', to: 'sessions#create'
      post 'users/confirm_verification_code', to: 'users#confirm_verification_code'
      post 'users', to: 'users#create'
      post 'homepages/create_web_page', to: 'homepages#create_web_page'
    end
  end

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
end
