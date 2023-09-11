export default function dbFactoryFunc(db) {
  async function getTables() {
    // get all the available tables
    let tablesArr = await db.manyOrNone("select * from table_bookings");
    return tablesArr;
  }
  let tablename,
    capacityObj,
    capacity,
    booked,
    username,
    number_of_people,
    contact_number,
    table_id,
    customerTables;
  async function bookTable(tableName) {
    // get number of people in booking from the frontend
    number_of_people = tableName["people"];
    // get username from the frontend
    username = tableName["username"];
    // get the contact number from the frontend
    contact_number = tableName["phone_number"];
    // get the selected table from the frontend
    table_id = tableName["selectedTable"];

    // query if it is a existing customers
    let existingCustomer = await db.oneOrNone(
      "select * from customers where username=$1",
      [username]
    );

    // add only new customers to the database.
    if (existingCustomer === null) {
      //book the table for the customer only if they inputed all the fields
      if (
        number_of_people.length > 0 &&
        username.length > 0 &&
        contact_number.length > 0
      ) {
        // get the capacity for each table
        capacityObj = await db.oneOrNone(
          "select capacity from table_bookings where id = $1",
          [table_id]
        );
        capacity = capacityObj["capacity"];
        console.log(tableName);
        //book the table for the customer only if there're less people than
        // the tables capacity
        if (tableName["people"] < capacity) {
          //   return "capacity greater than the table seats";
          await db.none(
            "insert into customers (username, number_of_people, contact_number, table_id) values($1,$2,$3,$4)",
            [username, number_of_people, contact_number, table_id]
          );
        }
      }
    }

    if (!username) {
      // don't do anything.
    } else {
    }
    // if (!username) {
    //   return "Please enter a username";
    // }
    // // for table seats that are greater than the max capacity.
    // capacity = 0;
    //
    // contact_number = tableName["phoneNumber"];

    // if (!contact_number) {
    //   return "Please enter a contact number";
    // }
    // //for table name that does not exist on the database.
    // tablename = tableName["tableName"];
    // if (tableName["tableName"]) {
    //   return "Invalid table name provided";
    // if (tableName["seats"] < capacity) {
    //   return "capacity greater than the table seats";
    // }
    // }
  }

  async function getBookedTables() {
    // get all the booked tables
    customerTables = await db.manyOrNone("select * from customers");
    return customerTables;
  }

  async function isTableBooked(tableName) {
    // get booked table by name
  }

  async function cancelTableBooking(tableName) {
    // cancel a table by name
  }

  async function getBookedTablesForUser(username) {
    // get user table booking
  }

  return {
    getTables,
    bookTable,
    getBookedTables,
    isTableBooked,
    cancelTableBooking,
    // editTableBooking,
    getBookedTablesForUser,
  };
}
