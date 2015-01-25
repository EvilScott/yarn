class PostsController < ApplicationController
  def index
    @posts = Post.originals
  end

  def create
    parent = Post.find(post_params[:parent])
    user = User.find(post_params[:user_id])
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
    params.require(:user_id)
    params.permit(:content, :parent, :user_id)
  end
end
