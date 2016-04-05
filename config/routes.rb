
Rails.application.routes.draw do

  root 'staticpages#app'

  devise_for :users

  scope :api do
    scope :v1 do
      resources :boards, except: [:new, :edit]
      resources :lists, except: [:new, :show, :edit]
      resources :cards, except: [:new, :show, :edit]
    end
  end

end
