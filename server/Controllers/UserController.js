module.exports = {
  getAllUsers: async(req, res) => {
      const db = req.app.get('db');
      const {user_id} = req.session.user
      let users = await db.user.get_all_users({user_id})
      res.status(200).send(users)
  },

  following: (req, res) => {

  },

  addFollower: async (req, res) => {
    console.log('backend')
    const db = req.app.get('db');
    const {user_id} = req.session.user
    const {followed_user_id} = req.params
    await db.user.follow_user({user_id, followed_user_id})
    res.sendStatus(200)
  },

  unfollow: (req, res) => {

  },

  checkFollowing: async (req, res) => {
    const db = req.app.get('db');
    const {user_id} = req.session.user
    const {followed_user_id} = req.params
    let response = await db.user.check_following({user_id, followed_user_id})
    if(response[0]){
      res.status(200).send(response[0])
    }
  }
}