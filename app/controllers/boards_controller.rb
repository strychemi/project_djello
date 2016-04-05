class BoardsController < ApplicationController
  before_action :current_user

  def index
    @boards = current_user.owned_boards
    respond_to do |format|
      format.json {render json: @boards.to_json(include: [:lists => {include: :cards}])}
    end
  end

  def create
    @board = current_user.owned_boards.build(title: "Give me a title...")
    respond_to do |format|
      if @board.save
        format.json { render json: @board.to_json(include: [:lists => {include: :cards}]), status: :created }
      else
        format.json { render json: @board.to_json(include: [:lists => {include: :cards}]), status: :unprocessable_entity }
      end
    end
  end

  def update
    @board = current_user.owned_boards.find(params[:id])
    respond_to do |format|
      if @board.update(board_params)
        format.json { render json: @board.to_json(include: [:lists => {include: :cards}]), status: 200 }
      else
        format.json { render json: @board.to_json(include: [:lists => {include: :cards}]), status: 404 }
      end
    end
  end

  def destroy
    @board = current_user.owned_boards.find(params[:id])
    respond_to do |format|
      if @board.destroy
        format.json { render json: @board.to_json(include: [:lists => {include: :cards}]), status: 200 }
      else
        format.json { render json: @board.to_json(include: [:lists => {include: :cards}]), status: 404 }
      end
    end
  end

  private

  def board_params
    params.require(:board).permit(:title)
  end
end
