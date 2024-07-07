const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var itinerariesRouter = require("./routes/itineraries");

const corsOptions = {
  origin: "http://localhost:5173", // Specify your client domain
  credentials: true, // This is important for setting cookies
};

app.use(cors(corsOptions));
const PORT = process.env.PORT || 5000;

// User data - In real applications, this should come from a database
const users = [
  { id: 1, username: "user", password: bcrypt.hashSync("password", 10) },
];
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/itineraries", itinerariesRouter);

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret", // Change this to a secure secret in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find((u) => u.username === username);
    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
  })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

// Routes
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: false,
  })
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

// Serve static files (React app)
app.use(express.static(path.join(__dirname, "../client")));

// Fallback to React's index.html for any other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "index.html"));
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ai-tinerary.zeh2asn.mongodb.net/cpsc455project?appName=ai-tinerary`
  )
  .then(() => {
    console.log("connected to database cluster");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
