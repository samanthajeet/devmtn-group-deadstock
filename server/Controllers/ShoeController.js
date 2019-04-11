module.exports = {
  getShoe: async (req, res) => {
    const db = req.app.get('db');
    const {shoe_id} = req.params;
    let response = await db.shoes.get_shoe({shoe_id})
    res.status(200).send(response)
  }, 

  getAllShoes: async (req, res) => {
    const db = req.app.get('db');
    let response = await db.shoes.get_all_shoes();
    res.status(200).send(response)
  }
}