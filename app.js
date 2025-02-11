const express = require("express");
const hbs = require("hbs");
const app = express();
const session = require("express-session");
const nocache = require("nocache");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(nocache());
app.use(
  session({
    secret: "irshad",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.set("view engine", "hbs");

const username = "Irshad";
const password = "admin@123";

//Home
app.get(["/", "/login", "/verify", "/*"], (req, res) => {
  if (req.session.user) {
    res.render("home", {
      message: `Welcome ${req.session.user}`,
      user: req.session.user,
    });
  } else {
    res.render("login");
  }
});

//Login
app.post("/verify", (req, res) => {
  if (req.body.username === username && req.body.password === password) {
    req.session.user = req.body.username;
    res.render("home", {
      message: `Welcome ${req.session.user}`,
      user: req.session.user,
    });
  } else {
    res.render("login", { message: "Invalid credential" });
  }
});
app.listen(3000, () => console.log("Server running on port 3000"));

//Logout
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.send("Error logging out.");
    }
    res.clearCookie("connect.sid");
    res.render("login", { message: "Logedout Succeffully" });
  });
});
