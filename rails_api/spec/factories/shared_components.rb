FactoryBot.define do
  factory :shared_components, class: SharedComponent do
    navbar_brand_text { 'SquareEight' }
    navbar_brand_type { 'text' }
    navbar_brand_background_color { 'light' }
    navbar_brand_variant_color { 'light' }
    footer_copyright_text { 'SquareEight' }
  end
end
