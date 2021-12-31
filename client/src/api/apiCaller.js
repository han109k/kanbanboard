// Axios configuration
const axios = require("axios");

// Backend entry point
const baseURL =
  process.env.NODE_ENV === "production" ? "https://kanboardban.herokuapp.com/" : "http://localhost:5000";

export default axios.create({
  baseURL,
});
