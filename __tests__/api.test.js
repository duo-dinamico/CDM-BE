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
  it("INVALID METHODS - Should return method not allowed", () => {
    const methods = ["del", "post", "patch", "put"];
    const promises = methods.map((method) => {
      return request(app)
        [method]("/api")
        .expect(405)
        .then(({ body: { msg } }) => {
          expect(msg).toEqual("Method not allowed.");
        });
    });
    return Promise.all(promises);
  });
  it("GET 200 - Returns 200 response from server", () => {
    return request(app).get("/api").expect(200);
  });
  describe("/api/projects", () => {
    it("INVALID METHODS - Should return method not allowed", () => {
      const methods = ["del", "post", "patch", "put"];
      const promises = methods.map((method) => {
        return request(app)
          [method]("/api/projects")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toEqual("Method not allowed.");
          });
      });
      return Promise.all(promises);
    });
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
    it("GET 400 - Responds with 400 if the path is incorrect", () => {
      return request(app)
        .get("/api/potato")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Path does not exist.");
        });
    });
  });

  describe("/api/project/project_number", () => {
    it("GET 200 - Returns 200 response from server", () => {
      return request(app).get("/api/project/111111-11").expect(200);
    });
    it("GET 200 - Should return an object", () => {
      return request(app)
        .get("/api/project/111111-11")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(
            expect.objectContaining({
              project: expect.arrayContaining([expect.any(Object)]),
            })
          );
        });
    });
    it("GET 400 - Should return error for non existing project", () => {
      return request(app)
        .get("/api/project/aaaaaa-aa")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toEqual("Project not found");
        });
    });
    it("POST 201 - Should be able to post a project", () => {
      return request(app)
        .post("/api/project")
        .send({
          project_number: "111111-69",
          project_title: "Project 2",
          project_lead_office: "Campus",
          client: "JLR",
          stage: "As-Built",
        })
        .expect(201)
        .then(({ body }) => {
          expect(body).toEqual(
            expect.objectContaining({
              project: expect.objectContaining({
                project_number: "111111-69",
                project_title: expect.any(String),
                project_lead_office: expect.any(String),
                client: expect.any(String),
                stage: expect.any(String),
              }),
            })
          );
        });
    });
    it("POST 400 - Should return error when posting existing project number", () => {
      return request(app)
        .post("/api/project")
        .send({
          project_number: "111111-69",
          project_title: "Project 2",
          project_lead_office: "Campus",
          client: "JLR",
          stage: "As-Built",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Data already present in the database.");
        });
    });
    it("POST 400 - Request body must be filled out completely", () => {
      return request(app)
        .post("/api/project")
        .send({
          project_number: "111111-80",
          project_title: "Project 2",
          project_lead_office: "Campus",
          client: "JLR",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Column stage cannot be empty.");
        });
    });
    it("PATCH 200 - Returns 200 response from server and updated project", () => {
      return request(app)
        .patch("/api/project")
        .send({
          project_number: "111111-11",
          project_title: "Project 69",
          project_lead_office: "Campus",
          client: "JLR",
          stage: "As Built",
        })
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(
            expect.objectContaining({
              project: expect.objectContaining({
                project_number: "111111-11",
                project_title: "Project 69",
                project_lead_office: expect.any(String),
                client: expect.any(String),
                stage: expect.any(String),
              }),
            })
          );
        });
    });
    it("PATCH 200 - Returns 200 response from server and updated project", () => {
      return request(app)
        .patch("/api/project")
        .send({
          project_number: "111111-11",
          stage: "Demolished",
        })
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(
            expect.objectContaining({
              project: expect.objectContaining({
                project_number: "111111-11",
                project_title: "Project 69",
                project_lead_office: expect.any(String),
                client: expect.any(String),
                stage: "Demolished",
              }),
            })
          );
        });
    });
    it("PATCH 400 - Returns 400 when project number is not present", () => {
      return request(app)
        .patch("/api/project")
        .send({
          project_title: "Project 69",
          project_lead_office: "Campus",
          client: "JLR",
          stage: "As Built",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toEqual("Project number missing.");
        });
    });
    it("PATCH 400 - Returns 400 when project number does not exist", () => {
      return request(app)
        .patch("/api/project")
        .send({
          project_number: "111111-1000",
          project_title: "Project 69",
          project_lead_office: "Campus",
          client: "JLR",
          stage: "As Built",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toEqual("Project not found.");
        });
    });
    it("DELETE 200 - Should return a text", () => {
      return request(app)
        .del("/api/project/111111-22")
        .expect(204)
        .then(() => {
          return request(app)
            .get("/api/project/111111-22")
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toEqual("Project not found");
            });
        });
    });
  });
});
