module SessionHelper
  def login!(user)
    user.create_token!
    session[:token] = user.token
  end

  def logged_in?
    session[:token] && current_user
  end

  def current_user
    @current_user ||= User.find_by_token(session[:token])
  end

  def logout!
    current_user.destroy_token!
    session.delete(:token)
  end
end
