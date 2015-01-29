json.id post.id
json.content post.content
json.user post.user.name
json.created_at post.created_at
json.tier tier
json.postCount post.total_children
json.nextPage posts_url(page: @page + 1, parent_id: post.id) if post.next_page?(@page)
json.posts post.children, partial: 'post', as: :post, tier: tier + 1
