class CardsController < ApplicationController
  before_action :current_user
  before_action :get_board
  before_action :get_list
  before_action :get_card, except: [:index, :create]

  def index
    @cards = @list.cards
    respond_to do |format|
      format.json {render json: @cards}
    end
  end

  def create
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
    respond_to do |format|
      if @card.update(card_params)
        format.json { render json: @card, status: 200 }
      else
        format.json { render json: @card, status: 404 }
      end
    end
  end

  def destroy
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

  def get_board
    @board = current_user.owned_boards.find_by_id(params[:board_id])
    unless @board
      respond_to do |format|
        format.json { render json: @board, status: 422 }
      end
    end
  end

  def get_list
    @list = @board.lists.find_by_id(params[:list_id])
    unless @list
      respond_to do |format|
        format.json { render json: @list, status: 422 }
      end
    end
  end

  def get_card
    @card = @list.cards.find_by_id(params[:id])
    unless @card
      respond_to do |format|
        format.json { render json: @card, status: 422 }
      end
    end
  end
end
