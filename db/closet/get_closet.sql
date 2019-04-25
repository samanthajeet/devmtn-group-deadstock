select u.image_1_url, u.image_2_url, u.image_3_url, u.image_4_url, u.details, u.bought_price, u.sale_price, s.shoe_model, s.colorway, s.shoe_id, u.user_id
from user_shoes u
join shoes s
on s.shoe_id = u.shoe_id
where u.user_id = ${user_id}