select message,chat_id,chats.user_id,first_name,last_name,profile_pic 
from chats
join users on users.user_id = chats.user_id
where room_id = ${room}