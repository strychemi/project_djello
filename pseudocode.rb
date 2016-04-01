Rails
  Models
    User
      Devise will be used to populate attributes

      has_many :board_members, class_name: "BoardMembers", foreign_key: :member_id
      has_many :boards, through: :board_members

      has_many :card_members, class_name: "CardMembers", foreign_key: :card_members
      has_many :cards, through: :card_members

      has_many :lists, through: :boards

    Boards (can have many members, belongs to User)
      title
      user_id
      has_many lists

    BoardMembers (join table of Users and Boards)
      belongs_to :board_id
      belongs_to :member_id

    List (belongs to a Board)
      title
      description
      board_id
      belongs_to :board
      has_many :cards

    Cards (belongs to a List)
      title
      description
      list_id
      has_many :members
      has_many :activities (polymorphic?)

    CardMembers (join table of Users and Cards)
      belongs_to card
      belongs_to :member, class_name: "User"

    Activities (polymorphic table)
      user_id
      activable_id
      activable_type
      description

AngularJS
  app.js
    .state("dashboard" {
      url: ""
      })
    .state("dashboard.board", {
      url: "/:id"
      })
  controllers
    boardController.js
    cardService.js
    listService.js
    userService.js
  directives
  filters
  services
    boardService.js
    cardService.js
    listService.js
    userService.js
