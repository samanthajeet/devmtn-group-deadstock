select first_name,last_name,profile_pic,user_id
from users
where user_id = ${id1}
order by user_id asc