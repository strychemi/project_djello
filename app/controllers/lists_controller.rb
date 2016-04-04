class ListsController < ApplicationController
  before_action :current_user

  def index
    @lists = current_user.owned_boards.find(params[:board_id]).lists
    respond_to do |format|
      format.json {render json: @lists}
    end
  end

  def create
    @board = current_user.owned_boards.find(params[:board_id])
    @list = @board.lists.build(title: "Give me a title...", description: "Give me a description...")
    respond_to do |format|
      if @list.save
        format.json { render json: @list, status: :created }
      else
        format.json { render json: @list, status: :unprocessable_entity }
      end
    end
  end

  def update
    @board = current_user.owned_boards.find(params[:board_id])
    @list = @board.lists.find(params[:id])
    respond_to do |format|
      if @list.update(board_params)
        format.json { render json: @list, status: 200 }
      else
        format.json { render json: @list, status: 404 }
      end
    end
  end

  def destroy
    @board = current_user.owned_boards.find(params[:board_id])
    @list = @board.lists.find(params[:id])
    respond_to do |format|
      if @list.destroy
        format.json { render json: @list, status: 200 }
      else
        format.json { render json: @list, status: 404 }
      end
    end
  end

  private

  def board_params
    params.require(:list).permit(:title, :description, :user_id)
  end
end
