class OrdersController < ApplicationController
  def index
    gon.public_key = ENV["PAYJP_PUBLIC_KEY"]
    @order = Order.new
  end

  def create
    @order = Order.new(order_params)
    if @order. valid? #この注文は正しいかな？
      pay_item
      @order.save #注文が正しければ、その注文を保存
      return redirect_to root_path 
    else
      render "index", status: :unprocessable_entity
    end
  end

  private
  def order_params
    params.require(:order).permit(:price).merge(token: params[:token])
  end

  def pay_item
  # Payjp.api_key = "sk_test_***********"  # 自身のPAY.JPテスト秘密鍵を記述しましょう
    Payjp.api_key = ENV["PAYJP_SECRET_KEY"]
    Payjp::Charge.create(
      amount: order_params[:price],  # 商品の値段
      card: order_params[:token],    # カードトークン
      currency: 'jpy'                 # 通貨の種類（日本円）
    )
  end
end