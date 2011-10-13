Bodyarmor::Application.routes.draw do
  resources :stores do
    member do
      get 'preview'
    end
  end
  match 'map' => 'map#index'
  match 'map/near' => 'map#near'
end