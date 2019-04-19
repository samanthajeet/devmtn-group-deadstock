select p.shoe_model, p.colorway, p.brand, p.shoe_id, s.user_shoe_id, s.bought_price, s.for_sale, s.sale_price, s.image_1_url, s.image_2_url, s.image_3_url, s.image_4_url, s.details, u.profile_pic, u.first_name, u.last_name, u.user_id
from following f
join user_shoes s
on f.followed_user_id = s.user_id
join users u
on u.user_id = f.followed_user_id
join shoes p
on s.shoe_id = p.shoe_id
where f.user_id = ${user_id}
order by s.user_shoe_id

