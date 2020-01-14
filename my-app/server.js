const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//this is for static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//api routes
app.use(routes);

//mongoose stuff
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", {
  useNewUrlParser: true
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
