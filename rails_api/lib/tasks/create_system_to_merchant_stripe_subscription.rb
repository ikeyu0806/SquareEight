class Tasks::CreateSystemToMerchantStripeSubscription
  #
  # bundle exec rails runner "Tasks::CreateSystemToMerchantStripeSubscription.execute" -e <RAILS_ENV>
  #
  def self.execute
    puts "プラン名を入力してください。"
    plan_name = $stdin.gets
    puts "料金を入力してください。"
    price =  $stdin.gets

    plan_name = plan_name.chomp
    price = price.chomp

    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    product = Stripe::Product.create({
      name: plan_name,
      metadata: {
        'product_type': 'merchant_to_service_subscription'
      }
    })
    stripe_plan = Stripe::Plan.create({
      amount: price.to_i,
      currency: 'jpy',
      interval: 'month',
      nickname: plan_name,
      product: product.id
    })
    puts "登録しました"
  end
end
