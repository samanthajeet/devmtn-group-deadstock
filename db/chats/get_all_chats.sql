select first_name,last_name,user_id,profile_pic 
from users
where users.user_id in (
    select user_id 
    from chats
    where room_id ilike ${room1} or room_id ilike ${room2}
) and user_id != ${user_id}