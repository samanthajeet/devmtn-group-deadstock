const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    let account_creation_date = new Date();
    console.log(req.body);

    let {
      password,
      email,
      firstName: first_name,
      lastName: last_name
    } = req.body;
    console.log(email);
    let profile_pic =
      "https://banner2.kisspng.com/20180722/gfc/kisspng-user-profile-2018-in-sight-user-conference-expo-5b554c0968c377.0307553315323166814291.jpg";

    const { session } = req;

    let takenEmail = await db.auth.check_email({ email });
    takenEmail = +takenEmail[0].count;
    if (takenEmail !== 0) {
      res.sendStatus(409);
    }

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    let user = await db.auth.register({
      password: hash,
      email,
      first_name,
      last_name,
      profile_pic,
      account_creation_date
    });

    user = user[0];

    session.user = user;

    res.status(200).send(session.user);
  },

  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    const { session } = req;

    let user = await db.auth.login({ email });
    user = user[0];
    if (!user) {
      return res.sendStatus(401);
    }

    let authenticated = bcrypt.compareSync(password, user.password);

    if (authenticated) {
      delete user.password;
      session.user = user;
      res.status(200).send(session.user);
    } else {
      res.sendStatus(401);
    }
  },

  logout: (req, res) => {
    req.session.destroy(function() {
      res.sendStatus(200);
    });
  },

  checkUser: (req, res) => {
    const { user } = req.session;

    delete user.password;

    if (user) {
      res.status(200).send(user);
    } else {
      res.sendStatus(401);
    }
  },

  editProfile: (req, res) => {},

  deleteProfile: (req, res) => {
    const db = req.app.get.get("db");
    const { user_id } = req.session.user;

    db.auth.delete_profile({ user_id }).then(resp => {
      res.sendStatus(200);
    });
  }
};
