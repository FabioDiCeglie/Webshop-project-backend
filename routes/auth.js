const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const auth = require("../auth/middleware");
const User = require("../models").user;
const bcrypt = require("bcrypt");
const router = new Router();

router.get("/me", auth, async (req, res, next) => {
  const user = req.user;
  res.send({ auth_user: user, message: "success" });
});

router.post("/login", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!password) {
    res.status(400).send("no email or password provided");
  } else {
    const auth_user = await User.findOne({
      where: { email: email },
    });

    if (!auth_user) {
      res.status(400).send("User not found");
    } else {
      bcrypt.compareSync(password, auth_user.password);
      const token = toJWT({
        userId: auth_user.id,
      });
      res.send({ auth_user, token, message: "success" });
    }
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const createUser = await User.create({
      name: name,
      email: email,
      password: password,
    });

    res.status(200).send(createUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//Update one user by id
router.put("/users/:userId", auth, async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      res.status(404).send("User not found");
    } else {
      const updatedUser = await userToUpdate.update(req.body);
      res.json(updatedUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
