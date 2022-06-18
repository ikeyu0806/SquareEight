FactoryBot.define do
  factory :title_block, class: WebpageBlock do
    content_json { "{\"blockID\"=>\"18170e4ec21\", \"blockType\"=>\"heading\", \"sortOrder\"=>2, \"blockState\"=>{\"text\"=>\"見出し\", \"placement\"=>\"left\", \"size\"=>1}}" }
    block_type  { 0 }
  end
end
