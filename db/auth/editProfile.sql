update users
set first_name = ${first_name}, last_name = ${last_name}, email = ${email}, profile_pic = ${profile_pic}, password = ${password}
where user_id = ${user_id};

select * from users
where user_id = ${user_id}