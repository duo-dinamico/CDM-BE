const { app } = require("../app");
const request = require("supertest");
const connection = require("../db/connection");

describe("/api/project/:project_number/register", () => {
  beforeAll(() => {
    return connection.seed.run();
  });
  afterAll(() => {
    return connection.destroy();
  });
  it.skip("INVALID METHODS - Should return method not allowed", () => {
    const methods = ["del", "post", "patch", "put"];
    const promises = methods.map((method) => {
      return request(app)
        [method]("/api/project/111111-11/register")
        .expect(405)
        .then(({ body: { msg } }) => {
          expect(msg).toEqual("Method not allowed.");
        });
    });
    return Promise.all(promises);
  });
  it("GET 200 - Returns all registers from a project", () => {
    return request(app).get("/api/project/111111-11/register").expect(200);
  });
  it("GET 200 - Should return an object", () => {
    return request(app)
      .get("/api/project/111111-11/register")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({ risks: expect.any(Array) })
        );
      });
  });
});
