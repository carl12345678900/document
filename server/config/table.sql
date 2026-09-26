create table notes(
  id int auto_increment primary key,
  title varchar(100) not null,
  content text,
  STATUS ENUM('active', 'pinned', 'archived', 'trash') DEFAULT 'active',
  date_created timestamp default current_timestamp,
  updated_at timestamp default CURRENT_TIMESTAMP 
  on update current_timestamp
)