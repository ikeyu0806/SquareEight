class ReserveFrameQuestionnaireMaster < ApplicationRecord
  belongs_to :reserve_frame
  belongs_to :questionnaire_master
end
