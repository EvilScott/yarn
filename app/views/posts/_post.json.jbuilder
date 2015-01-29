json.id post.id
json.content post.content
json.user post.user.name
json.created_at post.created_at
json.postCount post.total_children
json.nextPage posts_url(page: @page + 1, parent_id: post.id) if post.next_page?(@page)
if tier < Post::TIER_LIMIT
  json.posts post.children, partial: 'post', as: :post, tier: tier + 1
elsif post.total_children > 0
  json.deeper posts_url(parent_id: post.id)
end
