class Api::Internal::WebpagesController < ApplicationController
  def edit
    webpage = Webpage.find(params[:id])
    webpage_json = JSON.parse(webpage.to_json(methods: :block_contents))
    render json: { status: 'success', webpage: webpage_json }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def merchant_user_params
    params.require(:webpage).permit(:id)
  end
end
