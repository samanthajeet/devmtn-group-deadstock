require("dotenv").config();

const express = require("express");
session = require("express-session");
massive = require("massive");
pg = require("pg");
pgSession = require("connect-pg-simple")(session);

const app = express();
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(express.json());

var pgPool = new pg.Pool({
  connectionString: CONNECTION_STRING
});

app.use(
  session({
    store: new pgSession({
      pool: pgPool,
      pruneSessionInterval: 60 * 60 * 24
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    }
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  app.listen(SERVER_PORT, () => {
    console.log(`DeadStock on ${SERVER_PORT}`);
  });
});

// Auth Endpoints
const authCtrl = require("./Controllers/AuthController");
app.post(`/api/auth/register`, authCtrl.register);
app.post(`/api/auth/login`, authCtrl.login);
app.post(`/api/auth/logout`, authCtrl.logout);
app.post(`/api/auth/checkuser`, authCtrl.checkUser);
app.put(`/api/auth/editprofile`, authCtrl.editProfile);
app.delete(`/api/auth/deleteprofile`, authCtrl.deleteProfile);

// User Endpoints
const userCtrl = require(`./Controllers/UserController`);
app.get(`/api/users`, userCtrl.getAllUsers);
app.get(`/api/following`, userCtrl.following);
app.post("/api/following/add/:user_id", userCtrl.addFollower);
app.delete(`/api/unfollow/:user_id`, userCtrl.unfollow);

// Closet Endpoints
const closetCtrl = require("./Controllers/ClosetController");
app.get(`/api/closet/:user_id`, closetCtrl.getCloset);
app.get(`/api/closet/stats`, closetCtrl.getStats);
app.post(`/api.closet/addShoe`, closetCtrl.addShoe);
app.delete(`/api/closet/delete/:shoe_id`, closetCtrl.deleteShoe);

// Shoe Endpoints
const shoeCtrl = require(`./Controllers/ShoeController`);
app.get(`/api/shoes/:shoe_id`, shoeCtrl.getShoe);
app.get(`/api/shoes`, shoeCtrl.getAllShoes);
