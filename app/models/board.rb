class Board < ActiveRecord::Base

  has_many :lists, dependent: :destroy
  belongs_to :user, foreign_key: :user_id

  has_many :board_members, class_name: "BoardMember", dependent: :destroy
  has_many :members, :through => :board_members
end
