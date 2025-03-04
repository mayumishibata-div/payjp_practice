class OrdersController < ApplicationController
  def index
    @order = Order.new
  end

  def create
    @order = Order.new(order_params)
    if @order. valid? #この注文は正しいかな？
      @order.save #注文が正しければ、その注文を保存
      return redirect_to root_path 
    else
      render "index", status: :unprocessable_entity
    end
  end

  private
  def order_params
    params.require(:order).permit(:price)
  end
end