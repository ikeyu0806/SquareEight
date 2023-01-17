FactoryBot.define do
  factory :title_block, class: WebpageBlock do
    content_json { "{\"blockID\"=>\"185bf8127ab\", \"sortOrder\"=>1, \"atoms\"=>[{\"atomType\"=>\"heading\", \"text\"=>\"見出し\", \"placement\"=>\"left\", \"size\"=>1}]}" }
    block_type  { 0 }
  end
end
