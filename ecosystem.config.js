module.exports = {
  apps: [{
    name: 'v-parse-web',
    // exec_mode: 'cluster',
    // instances: 'max',
    instances: 1,
    watch: true,
    // watch: ['.output'],
    script: './.output/server/index.mjs',
    env: {
      PORT: 3001,
    },
    env_test: {
      PORT: 30001,
      NODE_ENV: "test",
    },
    env_production: {
      PORT: 60001,
      NODE_ENV: "production",
    }
  }],
  deploy : {
    production : {
      user : "node",
      host : "localhost",
      repo : "git@github.com:repo.git",
      ref  : "origin/master",
      path : "/var/www/v-parse-web",
      "post-deploy" : "pm2 startOrRestart ecosystem.config.js --env production"
    },
  }
}
