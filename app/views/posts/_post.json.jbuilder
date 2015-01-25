json.id post.id
json.content post.content
json.user post.user.name
json.posts post.children, partial: 'post', as: :post
json.created_at post.created_at
