class UserController < ApplicationController
  def login
    user = User.find_by_name(user_params[:name])
    if user && user.authenticate(user_params[:password])
      login!(user)
      render json: { success: true, user: { name: user.name, token: user.token } }
    else
      render json: { errors: [ 'Invalid username/password' ] }
    end
  end

  def register
    user = User.new(user_params)
    if user && user.validate
      login!(user)
      render json: { success: true, user: { name: user.name, token: user.token } }
    else
      errors = []
      user.errors.each { |ele, msg| errors << "#{ele.to_s.capitalize} #{msg}" }
      render json: { errors: errors }
    end
  end

  def logout
    logout!
    render json: { success: true }
  end

  private

  def user_params
    params.permit(:name, :password)
  end
end
