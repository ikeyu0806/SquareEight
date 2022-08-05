class Tasks::CreateSystemAdminUser
  #
  # bundle exec rails runner "Tasks::CreateSystemAdminUser.execute" -e <RAILS_ENV>
  #
  def self.execute
    puts "GoocoIDのGCS管理ユーザを作成します。"
    puts ""
    puts "ユーザ名を入力してください。"
    name = $stdin.gets
    puts ""
    puts "メールアドレスを入力してください。"
    email = $stdin.gets
    puts ""
    puts "電話番号を入力してください。"
    phone_number = $stdin.gets
    puts ""
    puts "パスワードを入力してください"
    password = $stdin.gets
    puts ""
    puts "確認パスワードを入力してください"
    confirm_password = $stdin.gets
    puts ""

    if password != confirm_password
      puts "パスワードと確認パスワードが違います。"
      raise "登録失敗しました"
    end

    # 改行コードが含まれるので削除
    name = name.chomp
    email = email.chomp
    phone_number = phone_number.chomp
    password = password.chomp

    SystemAdminUser.create!(
      name: name,
      email: email,
      phone_number: phone_number,
      password: password
    )

    puts "登録完了しました"
  rescue => error
    puts error
  end
end
