class BoardMember < ActiveRecord::Base

  belongs_to :board
  belongs_to :user, foreign_key: :member_id
end
