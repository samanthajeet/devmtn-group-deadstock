select user_id, profile_pic, email, first_name, last_name 
from users
where user_id != ${user_id}
