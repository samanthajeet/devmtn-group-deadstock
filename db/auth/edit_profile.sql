update users
set first_name = ${first_name}, last_name = ${last_name}, email = ${email}, profile_pic = ${profile_pic}, password = ${password}, bio = ${bio}
where user_id = ${user_id};

select first_name, last_name, bio, user_id, profile_pic, email from users
where user_id = ${user_id}