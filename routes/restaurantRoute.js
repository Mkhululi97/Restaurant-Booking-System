export default function RestaurantRoute(factoryFunc, dbFunc) {
  async function home(req, res) {
    try {
      // console.log(await dbFunc.getTables());
      res.render("index", { tables: await dbFunc.getTables() });
    } catch (err) {
      console.log(err);
    }
  }

  async function book(req, res) {
    try {
      let selectedTable = req.body.tableId;
      let people = req.body.booking_size;
      let username = req.body.username;
      let phone_number = req.body.phone_number;
      await dbFunc.bookTable({ people, username, phone_number, selectedTable });
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  }
  async function getBookings(req, res) {
    try {
      console.log(await dbFunc.getBookedTables());
      res.render("bookings", { bookTables: await dbFunc.getBookedTables() });
    } catch (err) {
      console.log(err);
    }
  }
  return { book, home, getBookings };
}
