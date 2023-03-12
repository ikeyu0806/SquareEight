class Api::Internal::CashRegistersController < ApplicationController
  before_action :end_user_login_only!

  def index
    default_payment_method_id, payment_methods = current_end_user.payment_methods
    delivery_targets = current_end_user.delivery_targets.order(:id)
    cart_items, total_price = current_end_user.cart_contents
    is_require_delivery_targets = cart_items.pluck(:item_type).include?("Product")
    render json: {  status: 'success',
                    current_end_user_id: current_end_user.id,
                    payment_methods: payment_methods,
                    delivery_targets: delivery_targets,
                    is_require_delivery_targets: is_require_delivery_targets,
                    total_price: total_price,
                    cart_items: cart_items,
                    include_no_remaining_inventory: cart_items.pluck(:remaining_inventory).include?(0),
                    default_payment_method_id: default_payment_method_id, }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def purchase
    order = current_end_user.orders.new
    include_product = false
    total_delivery_charge = 0
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    ActiveRecord::Base.transaction do
      current_end_user.cart_contents[0].each do |cart|
        case cart[:item_type]
        when 'Product' then
          include_product = true
          product = Product.find(cart[:parent_product_id])
          if cart[:product_type_id].present? && cart[:product_type_id].positive?
            product_type = ProductType.find(cart[:product_type_id])
            raise '在庫切れです' if product_type.inventory_allocation + cart[:quantity] > product_type.inventory
            product_type.inventory_allocation = product_type.inventory_allocation + cart[:quantity]
            product_type.save!
          else
            raise '在庫切れです' if product.inventory_allocation + cart[:quantity] > product.inventory
            product.inventory_allocation = product.inventory_allocation + cart[:quantity]
          end
          stripe_customer = Stripe::Customer.retrieve(current_end_user.stripe_customer_id)
          default_payment_method_id = stripe_customer["invoice_settings"]["default_payment_method"]
          account = product.account
          commission = (cart[:price] * account.application_fee_amount).to_i
          customer = account.customers.find_by(end_user_id: current_end_user.id)
          if customer.blank?
            customer = account.customers.create!(
              end_user_id: current_end_user.id,
              first_name: current_end_user.first_name,
              last_name: current_end_user.last_name,
              email: current_end_user.email,
              phone_number: current_end_user.phone_number
            )
          end
          delivery_charge = 0
          # 決済実行
          if product.delivery_charge_type == 'flatRate'
            delivery_charge += product.flat_rate_delivery_charge
          end
          if product.delivery_charge_type == 'perPrefectures'
            delivery_charge += product.prefecture_delivery_charge(current_end_user.delivery_targets.find_by(is_default: true).state)
          end
          if product.delivery_charge_with_order_number == 'withOrderNumber'
            delivery_charge = delivery_charge * cart[:quantity]
          end
          # 明細
          product_type = ProductType.find(cart[:product_type_id]) if cart[:product_type_id].present?
          order.save!
          order_item = order.order_items.create!(item_type: 'Product',
            product_id: product.id,
            product_name: product.name,
            product_type_id: product_type.present? ? product_type.id : nil,
            price: product.price,
            account_id: product.account.id,
            commission: commission,
            delivery_charge: delivery_charge,
            quantity: cart[:quantity],
            delivery_date_text: cash_register_params[:delivery_date_text])
          payment_intent = Stripe::PaymentIntent.create({
            amount: product.price * cart[:quantity] + delivery_charge,
            currency: 'jpy',
            payment_method_types: ['card'],
            payment_method: default_payment_method_id,
            customer: current_end_user.stripe_customer_id,
            application_fee_amount: commission,
            metadata: {
              'order_date': current_date_text,
              'order_item_id': order_item.id,
              'product_id': product.id,
              'account_business_name': product.account.business_name,
              'purchase_product_name': product.name,
              'price': product.price,
              'type': 'product',
              'end_user_id': current_end_user.id,
              'account_id': product.account_id,
              'customer_id': customer.id,
              'customer_fullname': customer.full_name
            },
            transfer_data: {
              destination: product.account.stripe_account_id
            }
          })
          Stripe::PaymentIntent.confirm(
            payment_intent.id
          )
          total_delivery_charge += delivery_charge
          product.save!
          current_end_user.cart_products.where(product_id: product.id).delete_all

          # エンドユーザ通知
          end_user_notification_title = product.name + 'を購入しました。'
          end_user_notification_url = '/customer_page/order'
          current_end_user.create_product_purchase_notification(end_user_notification_title)
          # ビジネスオーナー向け通知
          account_notification_title = customer.full_name + 'が' + product.name + 'を購入しました。'
          account_notification_url = '/admin/customer/' + customer.public_id + '/order'
          product.account
          .account_notifications
          .create!(title: account_notification_title, url: account_notification_url)
        when 'TicketMaster' then
          ticket_master = TicketMaster.find(cart[:parent_ticket_master_id])
          stripe_customer = Stripe::Customer.retrieve(current_end_user.stripe_customer_id)
          default_payment_method_id = stripe_customer["invoice_settings"]["default_payment_method"]
          account = ticket_master.account
          commission = (cart[:price] * account.application_fee_amount).to_i
          customer = account.customers.find_by(end_user_id: current_end_user.id)
          if customer.blank?
            customer = account.customers.create!(
              end_user_id: current_end_user.id,
              first_name: current_end_user.first_name,
              last_name: current_end_user.last_name,
              email: current_end_user.email,
              phone_number: current_end_user.phone_number
            )
          end
          order.save!
          order_item = order.order_items.create!(item_type: 'TicketMaster',
            ticket_master_id: ticket_master.id,
            product_name: ticket_master.name,
            price: cart[:price],
            quantity: cart[:quantity],
            account_id: ticket_master.account_id,
            commission: commission)
          payment_intent = Stripe::PaymentIntent.create({
            amount: cart[:price],
            currency: 'jpy',
            payment_method_types: ['card'],
            payment_method: default_payment_method_id,
            customer: current_end_user.stripe_customer_id,
            application_fee_amount: commission,
            metadata: {
              'order_date': current_date_text,
              'order_item_id': order_item.id,
              'account_business_name': ticket_master.account.business_name,
              'purchase_product_name': ticket_master.name,
              'price': cart[:price],
              'end_user_id': current_end_user.id,
              'account_id': ticket_master.account_id,
              'customer_id': customer.id,
              'ticket_master_id': ticket_master.id,
              'customer_fullname': customer.full_name
            },
            transfer_data: {
              destination: ticket_master.account.stripe_account_id
            }
          })
          Stripe::PaymentIntent.confirm(
            payment_intent.id
          )
          purchased_ticket = current_end_user
                            .purchased_tickets
                            .new(ticket_master_id: ticket_master.id,
                                 expired_at: Time.zone.now + ticket_master.effective_month.month,
                                 remain_number: cart[:issue_number])
          purchased_ticket.save!
          current_end_user.cart_ticket_masters.where(ticket_master_id: ticket_master.id).delete_all
          # エンドユーザ通知
          end_user_notification_title = ticket_master.name + 'を購入しました。'
          current_end_user.create_product_purchase_notification(end_user_notification_title)
          # ビジネスオーナー向け通知
          account_notification_title = customer.full_name + 'が' + ticket_master.name + 'を購入しました。'
          account_notification_url = '/admin/customer/' + customer.public_id + '/order'
          ticket_master.account
          .account_notifications
          .create!(title: account_notification_title, url: account_notification_url)
        when 'MonthlyPaymentPlan' then
          monthly_payment_plan = MonthlyPaymentPlan.find(cart[:parent_monthly_payment_plan_id])
          stripe_customer = Stripe::Customer.retrieve(current_end_user.stripe_customer_id)
          account = monthly_payment_plan.account
          customer = account.customers.find_by(end_user_id: current_end_user.id)
          if customer.blank?
            customer = account.customers.create!(
              end_user_id: current_end_user.id,
              first_name: current_end_user.first_name,
              last_name: current_end_user.last_name,
              email: current_end_user.email,
              phone_number: current_end_user.phone_number
            )
          end
          order.save!
          order_item = order.order_items.new(item_type: 'MonthlyPaymentPlan',
            monthly_payment_plan_id: monthly_payment_plan.id,
            product_name: monthly_payment_plan.name,
            price: monthly_payment_plan.price,
            account_id: monthly_payment_plan.account.id,
            commission: (monthly_payment_plan.price * account.application_fee_amount).to_i)
          stripe_subscription = Stripe::Subscription.create({
            customer: current_end_user.stripe_customer_id,
            application_fee_percent: account.application_fee_percent,
            description: monthly_payment_plan.name,
            metadata: {
              'account_business_name': monthly_payment_plan.account.business_name,
              'purchase_product_name': monthly_payment_plan.name,
              'price': monthly_payment_plan.price,
              'customer': current_end_user.stripe_customer_id,
              'order_item_id': order_item.id,
              'monthly_payment_plan_id': monthly_payment_plan.id,
              'end_user_id': current_end_user.id,
              'account_id': monthly_payment_plan.account_id,
              'customer_id': customer.id,
              'customer_fullname': customer.full_name,
              'item_type': 'end_user_to_merchant_subscription',
            },
            items: [{ plan: monthly_payment_plan.stripe_plan_id }],
            transfer_data:  {
              destination: monthly_payment_plan.account.stripe_account_id
            }
          })
          # postgreにも登録
          MerchantStripeSubscription.create!(
            monthly_payment_plan_id: monthly_payment_plan.id,
            end_user_id: current_end_user.id,
            stripe_subscription_id: stripe_subscription.id,
            billing_cycle_anchor_datetime: Time.at(JSON.parse(stripe_subscription.to_json)["billing_cycle_anchor"])
          )
          current_end_user.cart_monthly_payment_plans.where(monthly_payment_plan_id: monthly_payment_plan.id).delete_all
          # エンドユーザ通知
          end_user_notification_title = monthly_payment_plan.name + 'を購入しました。'
          current_end_user.create_product_purchase_notification(end_user_notification_title)
          # ビジネスオーナー向け通知
          account_notification_title = customer.full_name + 'が' + monthly_payment_plan.name + 'を購入しました。'
          account_notification_url = '/admin/customer/' + customer.public_id + '/order'
          monthly_payment_plan.account
          .account_notifications
          .create!(title: account_notification_title, url: account_notification_url)
        else
          raise '問題が発生しました。'
        end
      end
      # order.include_product?はスルーされる。save前にpluckが効かない？？
      if include_product
        order.set_delivery_target(current_end_user)
      end
      order.delivery_charge = total_delivery_charge
      order.save!
      render json: { status: 'success', order_public_id: order.public_id }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def cash_register_params
    params.require(:cash_register)
          .permit(:delivery_date_text)
  end
end
