const app = require("../../app");  // Import your app.js

const serverless = require("serverless-http");  // Use serverless-http to adapt Express for serverless

module.exports.handler = serverless(app);  // Export it as a serverless function
