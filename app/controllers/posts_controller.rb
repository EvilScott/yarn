class PostsController < ApplicationController
  def index
    @page = page
    @parent_id = parent_id
    @posts = Post.get_posts(parent_id, page)
    @originals_count = Post.count_by_parent(parent_id)
    @next_page = Post.next_page?(parent_id, @page)
  end

  def create
    parent = Post.find(post_params[:parent]) if post_params[:parent]
    user = User.find_by_token(post_params[:user_token])
    new_post = Post.create(parent: parent, user: user, content: post_params[:content])
    render partial: 'post.json', locals: { post: new_post }
  end

  def show
    @page = page
    @post = Post.find(post_id).includes(:user)
  end

  private

  def page
    page = params.permit(:page)[:page].to_i
    page == 0 ? 1 : page
  end

  def parent_id
    parent_id = params.permit(:parent_id)[:parent_id].to_i
    parent_id == 0 ? nil : parent_id
  end

  def post_id
    params.require(:id)
  end

  def post_params
    params.require(:content)
    params.require(:user_token)
    params.permit(:content, :parent, :user_token)
  end
end
