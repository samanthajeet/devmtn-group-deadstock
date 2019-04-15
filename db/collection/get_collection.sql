select *
from favorites
join shoes 
on shoes.shoe_id = favorites.shoe_id
where favorites.user_id = ${user_id}
order by favorites.date_added desc


