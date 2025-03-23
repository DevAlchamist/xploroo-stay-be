const app = require("../app"); // Import your app.js

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const serverless = require("serverless-http"); // Use serverless-http to adapt Express for serverless

module.exports.handler = serverless(app); // Export it as a serverless function
