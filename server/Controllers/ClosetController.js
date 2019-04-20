module.exports = {
  getCloset: async (req, res) => {
    const db = req.app.get('db');
    const { user_id } = req.params
    response = await db.closet.get_closet({user_id})
    res.status(200).send(response)
  },

  getStats1: async(req, res) => {
    const db = req.app.get('db');
    const {user_id} = req.session.user
    const brands = await db.closet.get_brand_counts({user_id})
    res.status(200).send(brands)
  },

  getStats2:async(req,res)=>{
    const db = req.app.get('db');
    const {user_id} = req.session.user
    const value = await db.closet.get_value({user_id})
    res.status(200).send(value)
  },

  getStats3:async(req,res)=>{
    const db = req.app.get('db');
    const {user_id} = req.session.user;
    const vintage = await db.closet.get_vintage({user_id})
    const regular = await db.closet.get_regular({user_id})
    const shoes = []
    shoes.push(regular[0],vintage[0])
    res.status(200).send(shoes)
  },


  addShoe: async (req, res) => {
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
    res.sendStatus(200);
  },

  deleteShoe: (req, res) => {}
};


// chart3Data: {
//   labels: [],
//   datasets: [
//     {
//       data: [],
//       backgroundColor: ["rgb(0, 0, 0, 1)", "rgb(38, 247, 255, 1)"],
//       borderColor: ["rgb(255, 255, 255, .8)", "rgb(255, 255, 255, .8)"],
//       borderWidth: 1
//     }
//   ]
// }