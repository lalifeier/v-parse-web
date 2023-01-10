module.exports = {
  apps: [{
    name: 'v-parse-web',
    exec_mode: 'cluster',
    instances: 'max',
    script: './.output/server/index.mjs',
    env: {
      PORT: 3001,
    },
  }],
}
