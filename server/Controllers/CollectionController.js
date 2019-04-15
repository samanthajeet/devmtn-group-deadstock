module.exports = {
  getCollection: async (req, res) => {
    const db = req.app.get('db');
    const {user_id} = req.session.user
    // const user_id = 3
    const response = await db.collection.get_collection({user_id})
    res.status(200).send(response)
  },

  addToCollection: async (req, res) => {
    const db = req.app.get('db');
    const {user_id} = req.session.user
    const {shoe_id} = req.body
    const response = await db.collection.add_to_collection({user_id, shoe_id})
    res.status(200).send(response)
  },
  
  checkFavorite: async (req, res) => {
    const db = req.app.get('db')
    const {user_id} = req.session.user
    const {shoe_id} = req.body
    const response = await db.collection.check_favorites({user_id, shoe_id})
    res.status(200).send(response)
  }
}