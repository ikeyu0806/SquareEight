module FileParamModule
  extend ActiveSupport::Concern

  # postされた画像データと画像名を引数に取ってpng変換して返す。
  # stripeがHEICなどの画像ファイルを受け付けてくれないことへの対応
  def convert_to_png(form_type_file_param, image_prefix_text)
    file = File.new(form_type_file_param)
    image = Magick::Image.read(file).first
    png_image = image.write("#{image_prefix_text}_#{Time.zone.now.strftime('%Y%m%d%H%M%S%3N')}.png")
    png_file = File.new(png_image.filename)
    return png_file
  end
end
