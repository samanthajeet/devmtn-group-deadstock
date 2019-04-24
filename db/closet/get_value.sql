select sum(price),brand
from user_shoes
join shoes on shoes.shoe_id = user_shoes.shoe_id
where user_shoes.user_id = ${user_id}
group by brand
order by brand