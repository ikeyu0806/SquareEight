Rails.application.config.session_store :redis_store,
  servers: {
    host: ENV["REDIS_HOST"],
    port: 6379
  }
