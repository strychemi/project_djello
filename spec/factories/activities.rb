FactoryGirl.define do
  factory :activity do
    user_id 1
    activable_id 1
    activable_type "MyString"
    description "MyString"
  end
end
