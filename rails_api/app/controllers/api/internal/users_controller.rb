class Api::Internal::UsersController < ApplicationController
  def create
    render json: { status: 'success' }
  end
end
