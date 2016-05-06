class BoardsController < ApplicationController
  before_action :current_user

  def index
    @boards = current_user.owned_boards
    respond_to do |format|
      format.json { render json: @boards }
    end
  end

  def show
    @board = current_user.owned_boards.find_by_id(params[:id])
    respond_to do |format|
      format.json { render json: @board.to_json(include: {lists: {include: :cards}})}
    end
  end

  def create
    @board = current_user.owned_boards.build(title: "Give me a title...")
    respond_to do |format|
      if @board.save
        format.json { render json: @board, status: :created }
      else
        format.json { render json: @board, status: :unprocessable_entity }
      end
    end
  end

  def update
    @board = current_user.owned_boards.find_by_id(params[:id])
    respond_to do |format|
      if @board.update(board_params)
        format.json { render json: @board, status: 200 }
      else
        format.json { render json: @board, status: 404 }
      end
    end
  end

  def destroy
    @board = current_user.owned_boards.find(params[:id])
    respond_to do |format|
      if @board.destroy
        format.json { render json: @board, status: 200 }
      else
        format.json { render json: @board, status: 404 }
      end
    end
  end

  private

  def board_params
    params.require(:board).permit(:title)
  end

  def show_board_json(board)
    json = board.as_json
    json["lists"] = {}

    # populate lists
    board.lists.each do |list|
      json["lists"][list.id] = list.as_json
      json["lists"][list.id]["cards"] = {}
      # populate cards for each list
      list.cards.each do |card|
        json["lists"][list.id]["cards"][card.id] = card.as_json
      end
    end

    return json
  end
end
