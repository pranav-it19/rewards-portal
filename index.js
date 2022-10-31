import express from "express";
import router from "./router/router.js";
import validateToken from "./services/middlewares/qv.js";
import startSheduler from "./services/sheduler/sheduler.js";
const app = express();
startSheduler()
app.use(express.json());
app.use(validateToken);
app.use(router);
app.listen(8080, () => console.log("SERVER STARTED AT PORT:", 8080));