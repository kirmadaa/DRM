module.exports = {
  apps : [
    {
      name      : 'WEB_FRONTEND',
      script    : 'npm',
      args      : 'run start',
      env_production : {
        NODE_ENV: 'production'
      }
    },
  ]
};
