module.exports = {
  getAllUsers: async(req, res) => {
      const db = req.app.get('db');
      const {user_id} = req.session.user
      let users = await db.user.get_all_users({user_id})
      res.status(200).send(users)
  },

  following: (req, res) => {

  },

  addFollower: (req, res) => {

  },

  unfollow: (req, res) => {

  }

}