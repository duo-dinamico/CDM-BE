const { app } = require("../app");
const request = require("supertest");
const connection = require("../db/connection");

describe("/api", () => {
  beforeAll(() => {
    return connection.seed.run();
  });
  afterAll(() => {
    return connection.destroy();
  });
  it("GET 200 - Returns 200 response from server", () => {
    return request(app).get("/api").expect(200);
  });
  describe("/api/projects", () => {
    it("GET 200 - Returns 200 response from server", () => {
      return request(app).get("/api/projects").expect(200);
    });
    it("GET 200 - Should return an object", () => {
      return request(app)
        .get("/api/projects")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(
            expect.objectContaining({ projects: expect.any(Array) })
          );
        });
    });
  });
  describe("/api/project/project_number", () => {
    it("GET 200 - Returns 200 response from server", () => {
      return request(app).get("/api/project/111111-11").expect(200);
    });
    it("GET 200 - Should return an object", () => {
      return request(app)
        .get("/api/project/1")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(
            expect.objectContaining({ project: expect.any(Object) })
          );
        });
    });
  });

});
