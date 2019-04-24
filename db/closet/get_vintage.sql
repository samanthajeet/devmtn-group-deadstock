select sum(vintage) as vintage
from (
    select count(*) as vintage 
    from user_shoes
    join shoes on shoes.shoe_id = user_shoes.shoe_id
    where user_id = ${user_id} and year_released < 2015
    ) as vintCount;