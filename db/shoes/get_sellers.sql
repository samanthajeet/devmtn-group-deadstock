select u.user_id, x.first_name, x.last_name, x.profile_pic, u.sale_price
from shoes s
join user_shoes u
on u.shoe_id = s.shoe_id
join users x
on x.user_id = u.user_id
where u.for_sale = true and s.shoe_id = ${shoe_id}