class User < ActiveRecord::Base
  after_create :make_board
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :board_members, class_name: "BoardMember", foreign_key: :member_id
  has_many :boards, :through => :board_members

  has_many :lists, through: :boards

  has_many :card_members
  has_many :cards, through: :card_members



  def make_board
    board = Board.new(title: "Give me a title", user_id: self.id)
    board.save
  end

end
