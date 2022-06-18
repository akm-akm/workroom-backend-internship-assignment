const auth = require("../middleware/auth");
const router = require("express").Router();
const bodyParser = require("body-parser");
const User = require("../model/user");
router.use(bodyParser.json());

router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({ data: user });
  } catch ({ message }) {
    res.status(400).json({ error: message });
  }
});

router.put("/user/:id", async (req, res) => {
  try {
    const { id: _id } = req.params;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "dob"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation || updates.length === 0) {
      return res.status(400).json({ error: "Invalid updates!" });
    }
    const user = await User.findById({ _id });
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.status(200).json({ data: user });
  } catch ({ message }) {
    res.status(400).json({ error: message });
  }
});

router.delete("/user", auth, async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findByIdAndDelete({ _id });
    res.status(200).json({ data: user });
  } catch ({ message }) {
    res.status(400).json({ error: message });
  }
});

module.exports = router;
