json.page @page
json.postCount @originals_count
json.previousPage posts_url(page: @page - 1, parent_id: @parent_id) if @page > 1
json.nextPage posts_url(page: @page + 1, parent_id: @parent_id) if @next_page
json.posts @posts, partial: 'post', as: :post, tier: @tier
