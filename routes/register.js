const router = require("express").Router();
const User = require("../model/user");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

/*
 * @route POST api/register
 * @desc Register user and return User object
 * @access Public
 * @param {String} email
 * @param {String} password
 * @param {String} name
 * @param {String} dob // yyyy/mm/dd
 * @return {JSON} user
 * @return {JSON} token
 */

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, dob } = req.body;
    const user = new User({ name, email, password, dob });
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ data: { user, token } });
  } catch ({ message }) {
    res.status(400).send({ error: message });
  }
});

module.exports = router;
