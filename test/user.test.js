const request = require("supertest");
const { app } = require("../src/app");
const User = require("../src/model/user");
const jwt = require("jsonwebtoken");
const { userOneId, userOne, dbSetup } = require("./fixture/db");

beforeEach(dbSetup);

test("GET all users", async () => {
  await request(app)
    .get("/api/user")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("can't GET all users without authentication", async () => {
  const response = await request(app).get("/api/user").send().expect(401);
});

test("Update user data", async () => {
  await request(app)
    .put(`/api/user/${userOneId}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Mr Aditya Kumar Mandal",
      email: "akm@gmail.com",
    })
    .expect(200);
});

test("can't update user data with valid + invalid fields", async () => {
  await request(app)
    .put(`/api/user/${userOneId}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      _id: userOneId,
      name: "Mr Aditya Kumar Mandal",
      email: "akm@gmail.com",
      gender: "Male",
    })
    .expect(400);
});

test("Can't Update user data with no body", async () => {
  await request(app)
    .put(`/api/user/${userOneId}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({})
    .expect(400);
});

test("Can't update user data with invalid body", async () => {
  await request(app)
    .put(`/api/user/${userOneId}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ gender: "male" })
    .expect(400);
});

test("Can't Delete a user without authentication", async () => {
  await request(app).delete(`/api/user`).send({ _id: userOneId }).expect(401);
  const user = await User.findById({ _id: userOneId });
  expect(user).not.toBeNull();
});

test("Delete a user", async () => {
  const response = await request(app)
    .delete(`/api/user`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ _id: userOneId })
    .expect(200);
  const user = await User.findById({ _id: userOneId });
  expect(user).toBeNull();
});

test("logout", async () => {
  await request(app)
    .post(`/api/logout`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById({ _id: userOneId });
});
