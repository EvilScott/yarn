require 'securerandom'

class User < ActiveRecord::Base
  has_many :posts, -> { includes(:user).order(created_at: :desc) }
  has_secure_password

  validates :name, length: { in: 5..15 }, uniqueness: true
  validates :password, length: { minimum: 5 }, on: :create

  def create_token!
    update!(token: SecureRandom.base64(16))
  end

  def destroy_token!
    update!(token: nil)
  end
end
