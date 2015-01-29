class Post < ActiveRecord::Base
  belongs_to :user
  belongs_to :parent, class_name: 'Post', foreign_key: 'parent'
  has_many :children, class_name: 'Post', foreign_key: 'parent'

  validates :content, presence: true
  validates :user_id, presence: true

  POST_LIMIT = 10

  def self.get_posts(parent, page)
    offset = (page - 1) * POST_LIMIT
    where(parent: parent).includes(:user).order(created_at: :desc).offset(offset).limit(POST_LIMIT)
  end

  def self.count_by_parent(parent)
    where(parent: parent).count
  end

  def children(page = 1)
    self.class.get_posts(id, page)
  end

  def total_children
    self.class.count_by_parent(id)
  end

  def next_page?(page)
    self.class.next_page?(id, page)
  end

  def self.next_page?(parent, page)
    count_by_parent(parent) > page * POST_LIMIT
  end
end
