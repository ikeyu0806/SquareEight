class ReserveFrame < ApplicationRecord
  belongs_to :account
  has_many :unreservable_frames
  has_many :reserve_frame_resorces
  has_many :reserve_frame_monthly_payment_plans
  has_many :reserve_frame_ticket_masters

  enum repeat_interval_type: { Day: 0, Week: 1, Month: 2 }
  enum publish_status: { Unpublish: 0, Publish: 1 }
  enum reception_type: { Immediate: 0, Temporary: 1, PhoneOnly: 2 }
  enum cancel_reception: { OnlyOnTheDay: 0, PossibleBeforeTheDay: 1 }

  def payment_methods
    # TODO
  end
end
