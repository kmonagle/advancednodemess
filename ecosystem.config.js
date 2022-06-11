module.exports = {
  apps : [{
    name: "advancdnodemess",
    script: "./bin/www",
    instances: 4,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
