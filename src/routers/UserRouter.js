import express from "express";
import { ERROR, SUCCESS } from "../Constant.js";
import { createUser, getAnyUser } from "../models/userModel/UserModel.js";

const router = express.Router(); // we want to define router here not app, because we not only want to get access express only but also Router() method within the express

router.get("/", (req, res, next) => {
  try {
    res.json({
      status: SUCCESS,
      message: "todo get user",
    });
  } catch (error) {
    next(error);
  }
});

//create user
router.post("/", async (req, res, next) => {
  try {
    const result = await createUser(req.body); //we not going to get any data in req.body, unless we parse it, we have to go to server.js and use middleware: app.use(express.json()), to parse data coming as a post method into req.body.
    //every time we create the user in the database successfully, it returns object
    console.log(result);
    result?._id
      ? res.json({
          status: SUCCESS,
          message: "User has been created successfully, you may login now",
        })
      : res.json({
          status: ERROR,
          message: "User can not created, please try again",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.code = 200;
      error.message =
        "Already have user with these details, please use different details";
    }
    next(error);
  }
});

//login user
router.post("/login", async (req, res, next) => {
  try {
    const data = req.body;
    const { email, password } = data;
    const user = await getAnyUser({ email });

    if (user?._id) {
      if (user.password !== password) {
        return res.json({
          status: ERROR,
          message: "Invalid login details",
        });
      }
      user.password = undefined;
      return res.json({
        status: SUCCESS,
        message: "You have login successfully",
        user,
      });
    }
    return res.json({
      status: ERROR,
      message: "Login unsuccessful, User not found",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.code = 200;
      error.message =
        "Already have user with these details, please use different details";
    }
    next(error);
  }
});
export default router;
