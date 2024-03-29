require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RailsApi
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true

    config.paths.add 'lib', eager_load: true

    config.middleware.use ActionDispatch::Cookies
    # config.middleware.use ActionDispatch::Session::CookieStore
    config.middleware.use ActionDispatch::Session::CacheStore

    config.time_zone = 'Asia/Tokyo'

    config.action_controller.forgery_protection_origin_check = false
    config.middleware.use ActionDispatch::Flash

    config.cache_store = :redis_cache_store, { expires_in: 1.day, host: ENV["REDIS_HOST"], port: 6379 }

    config.action_controller.allow_forgery_protection = false
  
    Rails.application.config.hosts << "api.square-eight.net"
    Rails.application.config.hosts << "healthcheck.localhost"
  end
end
