module.exports = {
  apps: [
    {
      name: "managed",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
