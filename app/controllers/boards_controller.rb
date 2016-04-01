class BoardsController < ApplicationController
  before_action :current_user

  def index
    @boards = current_user.owned_boards
    respond_to do |format|
      format.json {render json: @boards}
    end
  end
end
