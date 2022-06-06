class Api::Internal::HomepagesController < ApplicationController
  def create_web_page
    page_content = JSON.parse(homepage_params[:page_content].to_json)
    root = Nokogiri::HTML::DocumentFragment.parse('')
    page_content.each do |content|
      case content["blockType"]
      when "heading" then
        Nokogiri::HTML::Builder.with(root) do |t|
          div_class = blockState = content["blockState"]["placement"] == "left" ? "text-left" : "text-center"
          t.div(class: div_class) do
            # メタプログラミングできそうだけどとりあえず愚直に実装
            case content["blockState"]["size"]
            when 1 then
              t.h1 content["blockState"]["text"]
            when 2 then
              t.h2 content["blockState"]["text"]
            when 3 then
              t.h3 content["blockState"]["text"]
            when 4 then
              t.h4 content["blockState"]["text"]
            when 5 then
              t.h5 content["blockState"]["text"]
            when 6 then
              t.h6 content["blockState"]["text"]
            else
              raise "見出しの形式が不正です"
            end
          end
        end
      when "textImage" then
        binding.pry
        Nokogiri::HTML::Builder.with(root) do |t|
          t.h2 content["blockState"]["title"]
          t.div content["blockState"]["text"]
        end
      else
        raise "不正なブロックタイプが含まれています"
      end
    end
    root.to_html
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def homepage_params
    params.require(:homepage).permit!
  end
end
# <div class="text-left"><h1>見出し</h1></div>
