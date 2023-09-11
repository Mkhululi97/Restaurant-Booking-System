import express from "express";
import pgp from "pg-promise";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import flash from "flash-express";

/* ##### BRING IN REGISTRATIONS FACTORY FUNCTION ##### */
import Restaurant from "./Restaurant.js";
/* ##### BRING IN THE DATABASE ##### */
import db from "./database.js";
/* ##### BRING IN REGISTRATIONS ROUTE ##### */
import routesFunctions from "./routes/restaurantRoute.js";
/* ##### BRING IN DATABASE FACTORY FUNCTION ##### */
import dbFunctions from "./services/restaurantdb.js";

/* -------------------- ALL INSTANCES -------------------- */
const app = express();
/* INITIALIZE FACTORY FUNCTION */
const factoryFunc = Restaurant();
/* INITIALIZE DATABASE FACTORY FUNCTION */
const dbFunc = dbFunctions(db);
const restaurantRoute = routesFunctions(factoryFunc, dbFunc);
/* -------------------- ALL INSTANCES -------------------- */

app.use(express.static("public"));
app.use(flash());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const handlebarSetup = exphbs.engine({
  partialsDir: "./views/partials",
  viewPath: "./views",
  layoutsDir: "./views/layouts",
});

app.engine("handlebars", handlebarSetup);
app.set("view engine", "handlebars");

/* -------------------- ALL ROUTES -------------------- */
app.get("/", restaurantRoute.home);
// app.get("/bookings", (req, res) => {
//   res.render("bookings", { tables: [{}, {}, {}, {}, {}, {}] });
// });
app.post("/book", restaurantRoute.book);
app.get("/bookings", restaurantRoute.getBookings);

/* -------------------- ALL ROUTES -------------------- */

var portNumber = process.env.PORT || 3000;

//start everything up
app.listen(portNumber, function () {
  console.log("🚀  server listening on:", portNumber);
});
