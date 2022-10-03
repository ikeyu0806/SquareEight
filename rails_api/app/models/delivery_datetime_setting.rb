class DeliveryDatetimeSetting < ApplicationRecord
  enum delivery_time_type: { yamato: 0, sagawa: 1, yupack: 2, other: 3 }
end
