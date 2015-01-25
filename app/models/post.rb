class Post < ActiveRecord::Base
  belongs_to :user
  belongs_to :parent, class_name: 'Post', foreign_key: 'parent'
  has_many :children, -> { includes(:user).order(created_at: :desc) }, class_name: 'Post', foreign_key: 'parent'

  validates :content, presence: true
  validates :user_id, presence: true

  def self.originals
    Post.where(parent: nil).includes(:user)
  end
end
