CREATE TABLE users(
    user_id SERIAL PRIMARY KEY NOT NULL,
    profile_pic TEXT,
    email VARCHAR(200),
    password VARCHAR(200),
    first_name VARCHAR(200),
    last_name VARCHAR(200),
    account_creation_date VARCHAR(50)
;)

CREATE TABLE shoes(
    shoe_id SERIAL PRIMARY KEY NOT NULL,
    shoe_model VARCHAR(200),
    brand VARCHAR(200),
    colorway VARCHAR(200),
    price INTEGER,
    description VARCHAR(1350),
    year_released NUMERIC(4,0),
    image_1_url text,
    image_2_url text,
    image_3_url text,
    image_4_url text
);

CREATE TABLE user_shoes(
    user_shoe_id SERIAL PRIMARY KEY NOT NULL,
    shoe_id INTEGER,
    user_id INTEGER,
    size NUMERIC(3,1),
    for_sale BOOLEAN,
    bought_price INTEGER,
    sale_price INTEGER,
    details VARCHAR(1350)
    image_1_url text,
    image_2_url text,
    image_3_url text,
    image_4_url text
);


CREATE TABLE FAVORITES(
    favorite_id SERIAL PRIMARY KEY NOT NULL,
    shoe_id INTEGER,
    user_id INTEGER,
    date_added VARCHAR(50)
);

CREATE TABLE FOLLOWING(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER,
    followed_user_id INTEGER,
    date_added VARCHAR(50)
);