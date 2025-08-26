import { Router } from "express";
import { registerUser, loginUser, getUser} from "../controllers/usercontrollers.js";

const routes = Router(); // ✅ use Router() correctly
// Routes
routes.post("/signup", registerUser)
routes.post("/login", loginUser);
routes.get("/gets", getUser);

export default routes; // ✅ export router correctly

