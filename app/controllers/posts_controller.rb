class PostsController < ApplicationController
  def index
    @posts = Post.originals
  end

  def create
    parent = Post.find(post_params[:parent]) if post_params[:parent]
    user = User.find_by_token(post_params[:user_token])
    new_post = Post.create(parent: parent, user: user, content: post_params[:content])
    render partial: 'post.json', locals: { post: new_post }
  end

  def show
    @post = Post.find(post_id).includes(:user)
  end

  private

  def post_id
    params.require(:id)
  end

  def post_params
    params.require(:content)
    params.require(:user_token)
    params.permit(:content, :parent, :user_token)
  end
end
