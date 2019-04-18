module.exports = {
  getCloset: async (req, res) => {
    const db = req.app.get('db');
    const { user_id } = req.params
    response = await db.closet.get_closet({user_id})
    res.status(200).send(response)
  },

  getStats: (req, res) => {},

  addShoe: async (req, res) => {
    console.log("hit addShoe");
    const db = req.app.get('db')
    const { user_id } = req.session.user;

    let {
      shoe_id,
      images,
      shoeSize: size,
      shoeDetails: details,
      sellingPrice: sale_price,
      boughtPrice: bought_price,
      isForSale: for_sale
    } = req.body;

    let image_1_url = images[0];
    let image_2_url = images[1];
    let image_3_url = images[2];
    let image_4_url = images[3];

    let resp = await db.closet.add_user_shoe({
      shoe_id,
      user_id,
      size,
      for_sale,
      bought_price,
      sale_price,
      details,
      image_1_url,
      image_2_url,
      image_3_url,
      image_4_url
    });
    console.log(size);
    res.sendStatus(200);
  },

  deleteShoe: (req, res) => {}
};
