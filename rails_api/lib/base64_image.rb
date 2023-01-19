module Base64Image
  def put_s3_http_request_form_data(image_data, bucket_name, file_name)
    resource = Aws::S3::Resource.new(
      access_key_id: ENV['AWS_ACCESS_KEY'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: "ap-northeast-1"
    )
    binding.pry
    bucket = resource.bucket(bucket_name)
    obj = bucket.object(image_data.original_filename)
    obj.put(acl: "public-read", body: image_data.tempfile, content_type: image_data.content_type)
    return obj.public_url
  end

  # フロントエンドからhttp postされたBase64画像をs3に保存してpublic_urlを返却する
  def put_s3_http_request_base64_data(base64_image_data, bucket_name, file_name)
    resource = Aws::S3::Resource.new(
      access_key_id: ENV['AWS_ACCESS_KEY'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: "ap-northeast-1"
    )
    image_data = base64_image_data.gsub(/^data:\w+\/\w+;base64,/, "")
    decode_image = Base64.decode64(image_data)
    extension = base64_image_data.split("/")[1].split(";")[0]
    content_type = base64_image_data.split(":")[1].split(";")[0]
    bucket = resource.bucket(bucket_name)
    file_name = file_name +  + "." + extension
    obj = bucket.object(file_name)
    obj.put(acl: "public-read", body: decode_image, content_type: content_type)
    return obj.public_url
  end
end
