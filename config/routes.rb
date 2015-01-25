Rails.application.routes.draw do
  root 'home#index'

  get 'user/register'
  get 'user/login'
  get 'user/logout'

  resources :posts, only: [:index, :create, :show], defaults: { format: :json }
end
