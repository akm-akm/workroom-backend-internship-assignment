const request = require("supertest");
const { app } = require("../src/app");
const User = require("../src/model/user");
const jwt = require("jsonwebtoken");
const { userOneId, userOne, dbSetup } = require("./fixture/db");

beforeEach(dbSetup);

test("Login", async () => {
  const response = await request(app)
    .post("/api/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(201);
  const user = await User.findOne({ email: userOne.email });
  // expect(response.body.data.token).toBe(user.tokens[1].token);
  // expect(response.body.data.token).not.toBe(user.tokens[0].token);
  expect(user).not.toBeNull();
});

test("logout", async () => {
  await request(app)
    .post(`/api/logout`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById({ _id: userOneId });
});
