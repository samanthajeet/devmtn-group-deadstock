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
});

// Sockets
const socket = require("socket.io");
const io = socket(
  app.listen(SERVER_PORT, () => {
    console.log(`DeadStock on ${SERVER_PORT}`);
  })
);

const aws = require("aws-sdk");

const { S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

app.get("/api/signs3", (req, res) => {
  aws.config = {
    region: "us-west-1",
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  };

  const s3 = new aws.S3();
  const fileName = req.query["file-name"];
  const fileType = req.query["file-type"];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: "public-read"
  };

  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://s3-${
        aws.config.region
      }.amazonaws.com/${S3_BUCKET}/${fileName}`
    };

    return res.send(returnData);
  });
});

// Auth Endpoints
const authCtrl = require("./Controllers/AuthController");
app.get(`/api/auth/getuser`, authCtrl.getUser);
app.post(`/api/auth/register`, authCtrl.register);
app.post(`/api/auth/login`, authCtrl.login);
app.post(`/api/auth/logout`, authCtrl.logout);
app.post(`/api/auth/checkuser`, authCtrl.checkUser);
app.put(`/api/auth/editprofile`, authCtrl.editProfile);
app.delete(`/api/auth/deleteprofile`, authCtrl.deleteProfile);

// User Endpoints
const userCtrl = require(`./Controllers/UserController`);
app.get(`/api/users`, userCtrl.getAllUsers);
app.post(`/api/following/add/:followed_user_id`, userCtrl.addFollower);
app.get(`/api/following`, userCtrl.following);
app.get(`/api/checkFollowing/:followed_user_id`, userCtrl.checkFollowing);
app.delete(`/api/unfollow/:followed_user_id`, userCtrl.unfollow);

// Closet Endpoints
const closetCtrl = require("./Controllers/ClosetController");
app.get(`/api/closet/:user_id`, closetCtrl.getCloset);
app.get(`/api/closet/stats`, closetCtrl.getStats);
app.post(`/api/closet/addshoe`, closetCtrl.addShoe);
app.delete(`/api/closet/delete/:shoe_id`, closetCtrl.deleteShoe);

// Shoe Endpoints
const shoeCtrl = require(`./Controllers/ShoeController`);
app.get(`/api/shoes/:shoe_id`, shoeCtrl.getShoe);
app.get(`/api/sellers/:shoe_id`, shoeCtrl.getSellers)
app.get(`/api/shoes`, shoeCtrl.getAllShoes);

// Collection Endpoints
const collCtrl = require(`./Controllers/CollectionController`);
app.post(`/api/collection/favorite`, collCtrl.addToCollection);
app.get(`/api/collection/checkFavorites/:shoe_id`, collCtrl.checkFavorite);
app.delete(
  `/api/collection/deleteFavorite/:shoe_id`,
  collCtrl.deleteFromCollection
);
app.get(`/api/collection`, collCtrl.getCollection);

// Chat Endpoints
const sockCtrl = require("./Controllers/SocketsController");
app.get(`/api/chats`, sockCtrl.getChats);

//Socket Endpoints
io.on("connection", function(socket) {
  socket.on("endChat", function(room) {
    socket.leave(room);
  });

  socket.on("startChat", async function(room) {
    const db = app.get("db");
    const checkedRoom = await db.chats.check_room({ room });
    !checkedRoom[0] && (await db.chats.create_room({ room }));
    const messages = await db.chats.get_chats({ room });
    socket.join(room);
    io.to(room).emit("returnJoin", messages);
  });

  socket.on("sendMessage", async function(data) {
    const db = app.get("db");
    const { message, user_id, room } = data;
    const messages = await db.chats.create_message({ message, user_id, room });
    io.to(room).emit("returnMessages", messages);
  });
});
