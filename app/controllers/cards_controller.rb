class CardsController < ApplicationController
  before_action :current_user

  def index
    @board = current_user.owned_boards.find(params[:board_id])
    @list = lists.find(params[:list_id])
    @cards = @list.cards
    respond_to do |format|
      format.json {render json: @cards}
    end
  end

  def create
    @board = current_user.owned_boards.find(params[:board_id])
    @list = lists.find(params[:list_id])
    @card = @list.cards.build(card_params)
    respond_to do |format|
      if @card.save
        format.json { render json: @card, status: :created }
      else
        format.json { render json: @card, status: :unprocessable_entity }
      end
    end
  end

  def update
    @board = current_user.owned_boards.find(params[:board_id])
    @list = lists.find(params[:list_id])
    @card = @card.cards.find(params[:id])
    respond_to do |format|
      if @card.update(card_params)
        format.json { render json: @card, status: 200 }
      else
        format.json { render json: @card, status: 404 }
      end
    end
  end

  def destroy
    @board = current_user.owned_boards.find(params[:board_id])
    @list = @board.lists.find(params[:list_id])
    @card = @card.cards.find(params[:id])
    respond_to do |format|
      if @card.destroy
        format.json { render json: @card, status: 200 }
      else
        format.json { render json: @card, status: 404 }
      end
    end
  end

  private

  def card_params
    params.require(:card).permit(:title, :description, :list_id)
  end
end
