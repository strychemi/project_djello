class Board < ActiveRecord::Base

  has_many :lists
  belongs_to :user

  has_many :board_members, class_name: "BoardMember"
  has_many :members, :through => :board_members
end
