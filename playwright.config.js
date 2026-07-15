export default {
  testDir: 'tests/e2e',
  webServer: {
    command: 'PORT=8765 node e2e-server.js',
    port: 8765,
    reuseExistingServer: true,
  },
};
