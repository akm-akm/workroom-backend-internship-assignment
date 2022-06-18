const router = require("express").Router();
const User = require("../model/user");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.get("/user", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).send({ data: user });
  } catch ({ message }) {
    res.status(400).send({ error: message });
  }
});

router.put("/user", async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "dob", "_id"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }
    const user = await User.findById({ _id: req.body._id });
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.status(200).send({ data: user });
  } catch ({ message }) {
    res.status(400).send({ error: message });
  }
});

router.delete("/user", async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findByIdAndDelete({ _id });
    res.status(200).send({ data: user });
  } catch ({ message }) {
    res.status(400).send({ error: message });
  }
});

module.exports = router;
