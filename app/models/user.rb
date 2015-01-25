class User < ActiveRecord::Base
  has_many :posts, -> { includes(:user).order(created_at: :desc) }
  has_secure_password
end
