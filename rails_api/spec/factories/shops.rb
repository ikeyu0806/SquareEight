FactoryBot.define do
  factory :shop, class: Shop do
    name { "SquareEightデモページ" }
    phone_number { "09011112222" }
    business_hours_text { "07:00～22:00。不定休" }
    parking_lot_guidance { "有料の駐車場がございます。¥1200〜/日。" }
    description1 { "初心者からアスリートまで、全ての人々が結果を出せるようあらゆることについて考え抜かれたフィットネスクラブです。" }
    description2 { "生活スタイルに合った会員プランで、無理なく無駄なく続けられます。" }
    description3 { "インドアアウトドアテニスコート3面、アウトドアテニスコート5面を備えております。" }
    description4 { "サウナ、岩盤浴があり、フィットネス前に身体を温めたり、フィットネス後のリラックスにもおススメです。" }
    description5 { "経験豊富なパーソナルトレーナーが、お客様のご希望に沿った最適なトレーニングプログラムをご提案します。" }
    description6 { "幅広い時間帯で営業しているため、出勤前や出勤後にトレーニングをすることができます。" }
    postal_code { "150-0043" }
    state { "東京都" }
    city { "渋谷区" }
    town { "道玄坂1丁目" }
    line1 { "10番8号" }
    line2 { "渋谷道玄坂東急ビル2F-C" }
    access_info { "渋谷駅ハチ公前から徒歩5分" }
    remarks { "シューズ貸出あり" }
  end
end
