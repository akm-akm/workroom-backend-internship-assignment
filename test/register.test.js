const request = require("supertest");
const { app } = require("../src/app");
const User = require("../src/model/user");
const jwt = require("jsonwebtoken");
const { userOneId, userOne, dbSetup } = require("./fixture/db");

beforeEach(dbSetup);

test("register", async () => {
  const response = await request(app)
    .post("/api/register")
    .send({
      name: "Aditya",
      email: "akm@akm.com",
      password: "23345345dew",
      dob: "2000/01/08",
    })
    .expect(201);
  const user = await User.findOne({ email: "akm@akm.com" });

  expect(user).not.toBeNull();
  expect(response.body.data.token).toBe(user.tokens[0].token);
});