module.exports = {
  apps : [
      {
        name: "obs-messages",
        script: "./server/index.js",
        instances: 1,
        exec_mode: "cluster",
        watch: true,
        increment_var : 'PORT',
        env: {
            "PORT": 80,
            "NODE_ENV": "development"
        }
      }
  ]
}

