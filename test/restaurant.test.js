// import assert from "assert"
// import RestaurantTableBooking from "../services/restaurant.js";
// import pgPromise from 'pg-promise';
// const DATABASE_URL = '';
// const connectionString = process.env.DATABASE_URL || DATABASE_URL;
// const db = pgPromise()(connectionString);

/* ####### BRING IN ASSERT ####### */
import assert from "assert";
/* ##### BRING IN THE FACTORY FUNCTION ##### */
// import RestaurantTableBooking from "../services/restaurantdb.js";
/* ##### BRING IN THE DATABASE ##### */
import db from "../database.js";
/* ##### BRING IN THE DATABASE FACTORY FUNCTION ##### */
import DBFactoryFunc from "../services/restaurantdb.js";

describe("The restaurant booking table", function () {
  beforeEach(async function () {
    try {
      // clean the tables before each test run
      // await db.none("TRUNCATE TABLE table_booking RESTART IDENTITY CASCADE;");
    } catch (err) {
      console.log(err);
      throw err;
    }
  });

  // it("Get all the available tables", async function () {
  //   const DBFactoryFunc = await RestaurantTableBooking(db);

  //   assert.deepEqual([{}, {}, {}, {}, {}], await DBFactoryFunc.getTables());
  // });

  it("It should check if the capacity is not greater than the available seats.", async function () {
    const dbFactoryFunc = await DBFactoryFunc(db);

    const result = await dbFactoryFunc.bookTable({
      tableName: "Table four",
      username: "Kim",
      phoneNumber: "084 009 8910",
      seats: 3,
    });

    assert.deepEqual("capacity greater than the table seats", result);
  });

  // it("should check if there are available seats for a booking.", async function () {
  //   const DBFactoryFunc = await RestaurantTableBooking(db);

  //   // get all the tables

  //   // loop over the tables and see if there is a table that is not booked

  //   assert.deepEqual(true, false);
  // });

  it("Check if the booking has a user name provided.", async function () {
    const dbFactoryFunc = await DBFactoryFunc(db);

    assert.deepEqual(
      "Please enter a username",
      await dbFactoryFunc.bookTable({
        tableName: "Table eight",
        phoneNumber: "084 009 8910",
        seats: 2,
      })
    );
  });

  it("Check if the booking has a contact number provided.", async function () {
    const dbFactoryFunc = await DBFactoryFunc(db);
    assert.deepEqual(
      "Please enter a contact number",
      await dbFactoryFunc.bookTable({
        tableName: "Table eight",
        username: "Kim",
        seats: 2,
      })
    );
  });

  it("should not be able to book a table with an invalid table name.", async function () {
    const dbFactoryFunc = await DBFactoryFunc(db);

    let message = await dbFactoryFunc.bookTable({
      tableName: "Table eight",
      username: "Kim",
      phoneNumber: "084 009 8910",
      seats: 2,
    });

    assert.deepEqual("Invalid table name provided", message);
  });

  // it("should be able to book a table.", async function () {
  //   let DBFactoryFunc = RestaurantTableBooking(db);
  //   // Table three should not be booked
  //   assert.equal(true, await DBFactoryFunc.isTableBooked("Table three"));
  //   // book Table three

  //   await DBFactoryFunc.bookTable({
  //     tableName: "Table three",
  //     username: "Kim",
  //     phoneNumber: "084 009 8910",
  //     seats: 2,
  //   });

  //   // Table three should be booked now
  //   const booked = await DBFactoryFunc.isTableBooked("Table three");
  //   assert.equal(true, booked);
  // });

  // it("should list all booked tables.", async function () {
  //   let DBFactoryFunc = RestaurantTableBooking(db);
  //   let tables = await DBFactoryFunc.getTables();
  //   assert.deepEqual(6, tables.length);
  // });

  // it("should allow users to book tables", async function () {
  //   let DBFactoryFunc = await RestaurantTableBooking(db);

  //   assert.deepEqual([], await DBFactoryFunc.getBookedTablesForUser("jodie"));

  //   DBFactoryFunc.bookTable({
  //     tableName: "Table five",
  //     username: "Jodie",
  //     phoneNumber: "084 009 8910",
  //     seats: 4,
  //   });

  //   DBFactoryFunc.bookTable({
  //     tableName: "Table four",
  //     username: "Jodie",
  //     phoneNumber: "084 009 8910",
  //     seats: 2,
  //   });

  //   await DBFactoryFunc.bookTable({
  //     tableName: "Table five",
  //     username: "Jodie",
  //     phoneNumber: "084 009 8910",
  //     seats: 4,
  //   });

  //   // should only return 2 bookings as two of the bookings were for the same table
  //   assert.deepEqual(
  //     [{}, {}],
  //     await DBFactoryFunc.getBookedTablesForUser("jodie")
  //   );
  // });

  // it("should be able to cancel a table booking", async function () {
  //   let DBFactoryFunc = await RestaurantTableBooking(db);

  //   await DBFactoryFunc.bookTable({
  //     tableName: "Table five",
  //     username: "Jodie",
  //     phoneNumber: "084 009 8910",
  //     seats: 4,
  //   });

  //   DBFactoryFunc.bookTable({
  //     tableName: "Table four",
  //     username: "Kim",
  //     phoneNumber: "084 009 8910",
  //     seats: 2,
  //   });

  //   let bookedTables = await DBFactoryFunc.getBookedTables();
  //   assert.equal(2, bookedTables.length);

  //   await DBFactoryFunc.cancelTableBooking("Table four");

  //   bookedTables = await DBFactoryFunc.getBookedTables();
  //   assert.equal(1, bookedTables.length);
  // });

  after(function () {
    db.$pool.end;
  });
});
