class Card < ActiveRecord::Base

  belongs_to :list

  has_many :members, :through => :card_members, scope: :users

end
