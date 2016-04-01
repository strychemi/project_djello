class CardMember < ActiveRecord::Base

  belongs_to :card
  belongs_to :user, foreign_key: :member_id
end
