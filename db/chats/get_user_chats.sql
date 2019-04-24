select distinct room_id
from chats 
where (room_id ilike ${room1} or room_id ilike ${room2}) and user_id in (
    select user_id
    from users
    where user_id = ${user_id}
    order by user_id asc
)
