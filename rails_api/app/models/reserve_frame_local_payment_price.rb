class ReserveFrameLocalPaymentPrice < ApplicationRecord
  # 予約画面の予約人数初期表示
  def default_reserve_number_of_people
    1
  end

  def reserve_number_of_people
    JSON.parse(self.to_json(methods: [:default_reserve_number_of_people]))
  end
end
