select distinct room_id,first_name,last_name,chats.user_id, profile_pic 
from chats 
join users on users.user_id = chats.user_id
where room_id ilike ${room1} or room_id ilike ${room2};