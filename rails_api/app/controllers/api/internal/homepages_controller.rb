class Api::Internal::HomepagesController < ApplicationController
  def create_web_page
  end

  private

  def homepage_params
    params.require(:homepage).permit!
  end
end
