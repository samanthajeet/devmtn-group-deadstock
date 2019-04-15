select *
from favorites
join shoes 
on shoes.shoe_id = favorites.shoe_id
where favorites.user_id = ${user_id}


