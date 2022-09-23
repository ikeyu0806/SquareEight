class PasswordValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    if value.present?
      unless value =~ /\A(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])[0-9a-zA-Z\@\-\_]*\z/ # /\A[\w@_-]*[A-Za-z][\w@_-]*\z/
        record.errors.add(attribute, "大文字小文字英字および数値を必ず1文字以上含めて下さい")
      end
      if value.length < 8
        record.errors.add(attribute, "パスワードは8文字以上で入力してください")
      end
    end
  end
end
