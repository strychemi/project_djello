
# Clear whole database

User.destroy_all

# Multiplier for scaling seed data

MULTIPLIER = 3


# Make harry potter master account

u = User.create(email: "harry@potter.com", password: "qwerqwer")
MULTIPLIER.times do
  b = u.owned_boards.build
  b.title = Faker::Book.title
  b.save
  MULTIPLIER.times do
    l = b.lists.build
    l.title = Faker::Superhero.name
    l.description = Faker::ChuckNorris.fact
    l.save
    MULTIPLIER.times do
      c = l.cards.build
      c.title = Faker::Hipster.word
      c.description = Faker::Hipster.sentence
      c.save
    end
  end
end

def generate_one_of_each

  puts "Generating users, boards, lists, and cards"
  u = User.new
  u.email = Faker::Internet.free_email
  u.password = "qwerqwer"
  u.save

  MULTIPLIER.times do
    b = u.owned_boards.build
    b.title = Faker::Book.title
    b.save
    MULTIPLIER.times do
      l = b.lists.build
      l.title = Faker::Superhero.name
      l.description = Faker::ChuckNorris.fact
      l.save
      MULTIPLIER.times do
        c = l.cards.build
        c.title = Faker::Hipster.word
        c.description = Faker::Hipster.sentence
        c.save
      end
    end
  end

end

def generate_board_memberships
  puts "Generating Board Memberships"
  User.all.each_with_index do |user, index|
    b = BoardMember.new
    b.member_id = ((index + 7) % User.all.size) + 1
    b.board_id = ((index + 11) % Board.all.size) + 1
    user.board_memberships << b
  end
end

def generate_card_memberships
  puts "Generating Card Memberships"
  User.all.each_with_index do |user, index|
    b = CardMember.new
    b.member_id = ((index + 7) % User.all.size) + 1
    b.card_id = ((index + 11) % Card.all.size) + 1
    user.card_memberships << b
  end
end

MULTIPLIER.times { generate_one_of_each }
generate_board_memberships
generate_card_memberships
