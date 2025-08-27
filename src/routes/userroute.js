import { Router } from "express";
import { registerUser, loginUser, getUser, updateUser, getIndividualUser} from "../controllers/usercontrollers.js";


const routes = Router(); // ✅ use Router() correctly
// Routes
routes.post("/signup", registerUser)
routes.post("/login", loginUser);
routes.get("/gets", getUser);
routes.put("/updates/:id", updateUser);
routes.get("/:id", getIndividualUser);



export default routes; // ✅ export router correctly

