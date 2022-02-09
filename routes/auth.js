const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const User = require("../models").user;
const bcrypt = require("bcrypt");
const router = new Router();

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
      res.send({ token, auth_user, message: "success" });
    }
  }
});

module.exports = router;
