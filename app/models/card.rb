class Card < ActiveRecord::Base

  belongs_to :list

  has_many :card_members, class_name: "CardMember"
  has_many :members, :through => :card_members
end
