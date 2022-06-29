class MonthlyPaymentPlan < ApplicationRecord
  enum reserve_interval_unit: { Day: 0, Week: 1 }
end
