const axios = require("axios");

const baseURL =
  process.env.NODE_ENV === "production" ? "https://kanboardban.herokuapp.com/" : "http://localhost:5000";

export default axios.create({
  baseURL,
});
