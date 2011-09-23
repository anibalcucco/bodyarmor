Bodyarmor::Application.routes.draw do
  resources :stores do
    member do
      get 'preview'
    end
    collection do
      get 'search'
    end
  end
  match 'map' => 'map#index'
end