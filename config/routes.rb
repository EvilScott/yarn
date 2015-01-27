Rails.application.routes.draw do
  root 'home#index'

  post 'user/register', defaults: { format: :json }
  post 'user/login', defaults: { format: :json }
  post 'user/logout', defaults: { format: :json }

  resources :posts, only: [:index, :create, :show], defaults: { format: :json }
end
