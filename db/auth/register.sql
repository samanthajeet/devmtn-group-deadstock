insert into users(email, password, first_name, last_name, profile_pic, account_creation_date)
values(${email}, ${password}, ${first_name}, ${last_name}, ${profile_pic}, ${account_creation_date})

returning *