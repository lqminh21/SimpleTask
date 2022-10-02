module.exports = {
  apps : [
      {
        name: "myapp",
        script: "./app.js",
        watch: true,
        env: {
            "PORT": 8081,
            "NODE_ENV": "development"
        },
        env_production: {
            "PORT": 8080,
            "NODE_ENV": "production",
        }
      }
  ]
}