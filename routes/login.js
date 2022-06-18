const router = require("express").Router();
const User = require("../model/user");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

/*
 * @route POST api/login
 * @desc Login user and return User object and token
 * @access Public
 * @param {String} email
 * @param {String} password
 * @return {JSON} user
 * @return {JSON} token
 */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials({ email, password });
    const token = await user.generateAuthToken();
    res.status(201).send({ data: { user, token } });
  } catch ({ message }) {
    res.status(400).send({ error: message });
  }
});

router.post("/logout", async (req, res) => {});

module.exports = router;
