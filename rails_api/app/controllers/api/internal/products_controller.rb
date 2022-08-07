include Base64Image

class Api::Internal::ProductsController < ApplicationController
  before_action :merchant_login_only!, only: :create
  before_action :end_user_login_only!, only: :purchase


  def index
    products = current_merchant_user.account.products.order(:id)
    render json: { status: 'success', products: products }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    ActiveRecord::Base.transaction do
      product = current_merchant_user.account.products.new(product_params.except(:base64_image))
      if product_params[:base64_image].present?
        file_name = "product_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        product.s3_object_public_url = put_s3_http_request_data(product_params[:base64_image], ENV["PRODUCT_IMAGE_BUCKET"], file_name)
        product.s3_object_name = file_name
      end
      product.save!
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def purchase_info
    product = Product.find(params[:id])
    if current_end_user.present?
      default_payment_method_id, payment_methods = current_end_user.payment_methods
      login_status = 'Login'
    else
      default_payment_method_id = nil
      payment_methods = []
      login_status = 'Logout'
    end
    render json: { status: 'success',
                   product: product,
                   payment_methods: payment_methods,
                   default_payment_method_id: default_payment_method_id,
                   login_status: login_status }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def purchase
    ActiveRecord::Base.transaction do
      product = Product.find(product_params[:id])
      raise '購入数量が不正な値です' if product_params[:purchase_quantities] < 1
      product.inventory = product.inventory - product_params[:purchase_quantities]
      raise '在庫切れです' if product.inventory.negative?
      customer = Stripe::Customer.retrieve(current_end_user.stripe_customer_id)
      default_payment_method_id = customer["invoice_settings"]["default_payment_method"]
      commission = (product.price * 0.04).to_i
      Stripe.api_key = Rails.configuration.stripe[:secret_key]
      payment_intent = Stripe::PaymentIntent.create({
        amount: product.price,
        currency: 'jpy',
        payment_method_types: ['card'],
        payment_method: default_payment_method_id,
        customer: current_end_user.stripe_customer_id,
        application_fee_amount: commission,
        metadata: {
          'order_date': current_date_text,
          'account_business_name': product.account.business_name,
          'name': product.name,
          'price': product.price,
          'product_type': 'product'
        },
        transfer_data: {
          destination: product.account.stripe_account_id
        }
      })
      Stripe::PaymentIntent.confirm(
        payment_intent.id
      )
      order = current_end_user.orders.new(account_id: product.account_id)
      order.order_items.new(product_type: 'Product',
                            product_id: product.id,
                            product_name: product.name,
                            price: product.price,
                            commission: commission)
      order.save!
      product.save!
      render json: { status: 'success', order_id: order.id }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def product_params
    params.require(:product)
          .permit(:id,
                  :name,
                  :price,
                  :tax_rate,
                  :base64_image,
                  :inventory,
                  :description,
                  :s3_object_public_url,
                  :s3_object_name,
                  :purchase_quantities,
                  product_types: [:name, :inventory])
  end
end
