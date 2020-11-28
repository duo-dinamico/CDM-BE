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

  // No existing route
  it("GET 400 - Responds with 400 if the path is incorrect", () => {
    return request(app)
      .get("/api/potato")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Path does not exist.");
      });
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
    it("GET 200 - Should return projects with the same client", () => {
      return request(app)
        .get("/api/projects?client=Arup")
        .expect(200)
        .then(({ body: { projects } }) => {
          for (const project of projects) {
            expect(project.client).toEqual("Arup");
          }
        });
    });
    // No existing route in projects
    it("GET 400 - Responds with 400 if the path is incorrect", () => {
      return request(app)
        .get("/api/projects/potato")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Path does not exist.");
        });
    });
  });

  //
  // PROJECT
  //
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

  // Get All Records by project_number
  describe("/api/project/:project_number/records", () => {
    it("GET 200 - Returns 200 response from server", () => {
      return request(app).get("/api/project/111111-11/records").expect(200);
    });
    it("GET 200 - Should return an object", () => {
      return request(app)
        .get("/api/project/111111-11/records")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(expect.arrayContaining([expect.any(Object)]));
        });
    });
    it("GET 400 - if non existing project number", () => {
      return request(app)
        .get("/api/project/4444/records")
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Project not found");
        });
    });
  });

  // Get One Record by project_number
  describe("/api/project/:project_number/record/:version", () => {
    it("GET 200 - Returns 200 response from server", () => {
      return request(app).get("/api/project/111111-11/record/34").expect(200);
    });
    it("GET 200 - Should return an object", () => {
      return request(app)
        .get("/api/project/111111-11/record/34")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(expect.arrayContaining([expect.any(Object)]));
        });
    });
    it("GET 400 - if non existing project number", () => {
      return request(app)
        .get("/api/project/4444/record/34")
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Record not found");
        });
    });
  });

  // Add Record to existing project
  describe("/api/project/:project_number/record", () => {
    it("POST 201 - Should return an inserted record", () => {
      return request(app)
        .post("/api/project/111111-11/record")
        .send({
          // project_number: "111111-11",
          version_number: "69",
          stage_issued: "Construction",
          purpose: "INFORMATION",
          date: "2021-07-12",
          prepared: "JCS",
          checked: "JCS",
          approved: "GREAT",
          remarks: "among other problems, and others, this is a POST test.",
        })
        .expect(201)
        .then(({ body }) => {
          expect(body).toEqual(expect.arrayContaining([expect.any(Object)]));
        });
    });
    it("POST 400 - if non existing project number", () => {
      return request(app)
        .post("/api/project/4444/record")
        .send({
          // project_number: "111111-11",
          version_number: "69",
          stage_issued: "Construction",
          purpose: "INFORMATION",
          date: "2021-07-12",
          prepared: "JCS",
          checked: "JCS",
          approved: "GREAT",
          remarks: "among other problems, and others, this is a POST test.",
        })
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Project not found");
        });
    });
    it("POST 400 - if already exist version for that project number", () => {
      return request(app)
        .post("/api/project/111111-11/record")
        .send({
          // project_number: "111111-11",
          version_number: "69",
          stage_issued: "Construction",
          purpose: "INFORMATION",
          date: "2021-07-12",
          prepared: "JCS",
          checked: "JCS",
          approved: "GREAT",
          remarks: "among other problems, and others, this is a POST test.",
        })
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Version already exist.");
        });
    });
  });

  // Update Record to existing project
  describe("/api/project/:project_number/record/:version", () => {
    it("PATCH 201 - Should return an updated record", () => {
      return request(app)
        .patch("/api/project/111111-11/record/69")
        .send({
          stage_issued: "Construction",
          purpose: "INFORMATION",
          date: "2021-07-12",
          prepared: "JCS2",
          checked: "JCS2",
          approved: "THE GREAT",
          remarks:
            "among other problems, and others, this is a POST test, and has been rectified.",
        })
        .expect(201)
        .then(({ body }) => {
          expect(body).toEqual(expect.arrayContaining([expect.any(Object)]));
        });
    });
    it("PATCH 400 - if non existing project number", () => {
      return request(app)
        .patch("/api/project/4444/record/69")
        .send({
          stage_issued: "Construction",
          purpose: "INFORMATION",
          date: "2021-07-12",
          prepared: "JCS",
          checked: "JCS",
          approved: "GREAT",
          remarks: "among other problems, and others, this is a POST test.",
        })
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Project not found.");
        });
    });
    it("PATCH 400 - if non existing record version", () => {
      return request(app)
        .patch("/api/project/111111-11/record/234")
        .send({
          stage_issued: "Construction",
          purpose: "INFORMATION",
          date: "2021-07-12",
          prepared: "JCS",
          checked: "JCS",
          approved: "GREAT",
          remarks: "among other problems, and others, this is a POST test.",
        })
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Version not found.");
        });
    });
  });

  // Delete One Record by project_number
  describe("/api/project/:project_number/record/:version", () => {
    it("DEL 200 - Returns 200 response from server", () => {
      return request(app).del("/api/project/111111-11/record/34").expect(200);
    });
    it("DEL 400 - if non existing project number", () => {
      return request(app)
        .del("/api/project/4444/record/1")
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Record not found");
        });
    });
    it("DEL 400 - if non existing version", () => {
      return request(app)
        .del("/api/project/111111-11/record/58")
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Record not found");
        });
    });
  });

  // Get all records from a project number
  describe("/api/records/:project_number", () => {
    it("INVALID METHODS - Should return method not allowed", () => {
      const methods = ["del", "post", "patch", "put"];
      const promises = methods.map((method) => {
        return request(app)
          [method]("/api/records/111111-11")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toEqual("Method not allowed.");
          });
      });
      return Promise.all(promises);
    });
    it("GET 200 - Returns 200 response from server", () => {
      return request(app).get("/api/records/111111-11").expect(200);
    });
    it("GET 200 - Should return an object", () => {
      return request(app)
        .get("/api/records/1")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(
            expect.objectContaining({ records: expect.any(Array) })
          );
        });
    });

    it("GET 200 - Should return records of project number, with query", () => {
      return request(app)
        .get("/api/records/111111-11?approved=SM")
        .expect(200)
        .then(({ body: { records } }) => {
          for (const record of records) {
            expect(record.approved).toEqual("SM");
          }
        });
    });
  });
});
