CREATE TABLE table_booking (
    id serial not null primary key.
    table_name text not null,
    capacity int not null,
    booked boolean not null,
)

CREATE TABLE customers (
    id serial not null primary key.
    username text,
    number_of_people int,
    contact_number int
    table_id int not null, 
    foreign key (table_id) references table_bookings(id) on delete cascade

);