const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// request, response
app.get("/", (req, res) => {
  res.json({ ok: true });
});

app.use("/uploads", express.static(__dirname + "/uploads"));

// initialize app routes
routes(app);

app.listen(port, function () {
  console.log(`Server running at http://localhost:${port}/`);
});
