const express = require("express");
const { create } = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();

const app = express();
const hbs = create({
  extname: "hbs",
  defaultLayout: "layout",
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
  },
});

require("./helper/db")();
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "mySession",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "some secret key",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

const client = require("./routers/index");
const admin = require("./routers/admin/index");
const auth = require("./routers/admin/auth");
const Auth = require('./middleware/auth.js')

app.use("/", client);
app.use("/admin/auth",  auth);
app.use("/admin", Auth , admin);

try {
  const port = normalizePort(process.env.PORT || 3000);
  app.listen(port, () => {
    console.log(`Server ${port} porti bilan ishlayapti`);
  });
} catch (error) {
  console.error(error);
}

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
