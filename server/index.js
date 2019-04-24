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

aws.config.update({
  region: "us-west-1",
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});
// console.log(aws.config)
const s3 = new aws.S3();

app.get("/api/signs3", (req, res) => {
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

//Todd's S3 method
app.use(express.json({ limit: "8000000000000" }));
app.use(express.urlencoded({ limit: "8000000000000", extended: true }));

app.post("/api/s3", (req, res) => {
  // the body contains the string that is the photo
  // console.log('hit post', req.body)
  console.log("made it to post");
  let { file, filename, filetype } = req.body;

  // console.log(file)
  file = file.replace(/^data:image\/\w+;base64,/, "");

  console.log("made it to file");
  // the photo string needs to be converted into a 'base 64' string for s3 to understand how to read the image
  const buf = new Buffer.from(file, "base64");
  console.log("made it to buf");
  // this is the object that we will end to s3 with all the info about the photo, and the photo itself.
  const params = {
    Bucket: S3_BUCKET,
    Body: buf,
    Key: filename,
    ContentType: filetype,
    ACL: "public-read"
  };

  // using the S3 object we made above the endpoints we will pass it the image we want uploaded and the funciton to be run when the upload is finished.
  s3.upload(params, (err, data) => {
    let response, code;
    if (err) {
      response = err;
      code = 500;
    } else {
      response = data;
      code = 200;
    }
    // if the upload was sucessfull give them the data, if not send them the error
    res.status(code).send(response);
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
app.get("/api/closetstats1", closetCtrl.getStats1);
app.get("/api/closetstats2", closetCtrl.getStats2);
app.get("/api/closetstats3", closetCtrl.getStats3);
app.get(`/api/closet/:user_id`, closetCtrl.getCloset);
app.post(`/api/closet/addshoe`, closetCtrl.addShoe);
app.delete(`/api/closet/delete/:shoe_id`, closetCtrl.deleteShoe);

// Shoe Endpoints
const shoeCtrl = require(`./Controllers/ShoeController`);
app.get(`/api/shoes/:shoe_id`, shoeCtrl.getShoe);
app.get(`/api/sellers/:shoe_id`, shoeCtrl.getSellers);
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
