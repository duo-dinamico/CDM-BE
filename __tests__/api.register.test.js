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
  //METHOD
  it("INVALID METHODS - Should return method not allowed", () => {
    const methods = ["delete", "patch"];
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
  //GET
  it("GET 200 - Returns all registers from a project", () => {
    return request(app).get("/api/project/111111-11/register").expect(200);
  });
  it("GET 200 - Should return an object with an array of projects", () => {
    return request(app)
      .get("/api/project/111111-11/register")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({ risks: expect.any(Array) })
        );
      });
  });
  it("GET 200 - Should return a message if the project in question has no registers", () => {
    return request(app)
      .get("/api/project/111111-44/register")
      .expect(200)
      .then(({ body }) => {
        expect(body.msg).toEqual("Project has no risks");
      });
  });
  it("GET 200 - Returns all registers from a project and allows queries", () => {
    return request(app)
      .get("/api/project/111111-11/register?risk_status=CONTINUED")
      .expect(200)
      .then(({ body: { risks } }) => {
        for (const risk of risks) {
          expect(risk.risk_status).toEqual("CONTINUED");
        }
      });
  });
  it("GET 400 - Returns error if value is incorrect", () => {
    return request(app)
      .get("/api/project/111111-11/register?risk_status=continued")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("Risk does not exist");
      });
  });
  it("GET 400 - Should return error if project is not found", () => {
    return request(app)
      .get("/api/project/111111-66/register")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("Project not found");
      });
  });
  //POST
  it("POST 200 - Returns the added register", () => {
    return request(app)
      .post("/api/project/111111-11/register")
      .send({
        description: "This is a test",
        risk_status: "RESOLVED",
        discipline: "ARCH",
        revision: "3",
        project_lifecycle_stage: "D",
        hs_risk: false,
        environmental_risk: false,
        programme_risk: true,
        other_risk: false,
        likelihood: 3,
        severity: 5,
        relevant_documentation: "N/A",
        owner_of_risk: "Architect",
        mitigation_action: "Test mitigation",
        likelihood_mitigated: 2,
        severity_mitigation: 5,
        further_action_required: true,
        identified_by: "JJ",
        date: "2020-11-26",
      })
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            risk: expect.objectContaining({
              project_number: "111111-11",
              project_lifecycle_stage: "D",
            }),
          })
        );
      });
  });
  it("POST 400 - Returns error if project does not exist", () => {
    return request(app)
      .post("/api/project/111111-69/register")
      .send({
        description: "This is a test",
        risk_status: "RESOLVED",
        discipline: "ARCH",
        revision: "3",
        project_lifecycle_stage: "D",
        hs_risk: false,
        environmental_risk: false,
        programme_risk: true,
        other_risk: false,
        likelihood: 3,
        severity: 5,
        relevant_documentation: "N/A",
        owner_of_risk: "Architect",
        mitigation_action: "Test mitigation",
        likelihood_mitigated: 2,
        severity_mitigation: 5,
        further_action_required: true,
        identified_by: "JJ",
        date: "2020-11-26",
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("Must add to existing project.");
      });
  });
  it("POST 400 - Returns error input is incorrect", () => {
    return request(app)
      .post("/api/project/111111-11/register")
      .send({
        jiberish: "dfgdf",
        description: "This is a test",
        risk_status: "RESOLVED",
        discipline: "ARCH",
        revision: "3",
        project_lifecycle_stage: "D",
        hs_risk: false,
        environmental_risk: false,
        programme_risk: true,
        other_risk: false,
        likelihood: 3,
        severity: 5,
        relevant_documentation: "N/A",
        owner_of_risk: "Architect",
        mitigation_action: "Test mitigation",
        likelihood_mitigated: 2,
        severity_mitigation: 5,
        further_action_required: true,
        identified_by: "JJ",
        date: "2020-11-26",
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("One or more entry columns do not exist.");
      });
  });
  describe("/api/project/:project_number/register/:risk_number", () => {
    //METHOD
    it("INVALID METHODS - Should return method not allowed", () => {
      const methods = ["post"];
      const promises = methods.map((method) => {
        return request(app)
          [method]("/api/project/111111-11/register/M&E-M-002")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toEqual("Method not allowed.");
          });
      });
      return Promise.all(promises);
    });
    //GET
    it('"GET 200 - Returns one risk from a project" ', () => {
      return request(app)
        .get("/api/project/111111-11/register/M&E-M-002")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(
            expect.objectContaining({ risk: expect.any(Object) })
          );
        });
    });
    it("GET 400 - Returns an error if the number is incorrect", () => {
      return request(app)
        .get("/api/project/111111-11/register/M&E-M-003")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toEqual("Risk does not exist.");
        });
    });
    it("GET 400 - Returns an error if the project number is incorrect", () => {
      return request(app)
        .get("/api/project/111111-69/register/M&E-M-002")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toEqual("Project number is incorrect.");
        });
    });
    it("GET 400 - Returns an error if the project number is incorrect", () => {
      return request(app)
        .get("/api/project/111111-11/register/ELE-M-003")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toEqual("Risk does not exist.");
        });
    });
    it("GET 400 - Returns an error if the number used is 000", () => {
      return request(app)
        .get("/api/project/111111-11/register/M&E-M-000")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toEqual("Risk number cannot be zero.");
        });
    });
    // PATCH
    it("PATCH 200 - Returns the changed risk", () => {
      return request(app)
        .patch("/api/project/111111-11/register/M&E-M-001")
        .send({
          project_number: "111111-11",
          description:
            "Plant Replacement - To replace major plant components on the Rotating Test Wings and PTCD Test roofs that will require craneage. Danger of injury during removal.",
          risk_status: "CONTINUED",
          discipline: "M&E",
          revision: "0",
          project_lifecycle_stage: "M",
          hs_risk: false,
          environmental_risk: false,
          programme_risk: true,
          other_risk: false,
          likelihood: 3,
          severity: 5,
          relevant_documentation: "N/A",
          owner_of_risk: "Arup / Contractor",
          mitigation_action:
            "Feasibility building concept had a square shape building that didn’t offer excellent provision for craneage. The stage 2 has developed the building from a square building to a wing shape that offers improved access for plant removal and craneage.",
          likelihood_mitigated: 2,
          severity_mitigation: 5,
          further_action_required: true,
          identified_by: "PH",
          date: "2018-09-13T23:00:00.000Z",
        })
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(
            expect.objectContaining({
              risk: expect.objectContaining({
                project_number: "111111-11",
                hs_risk: false,
              }),
            })
          );
        });
    });
    it("PATCH 400 - Returns error if the project doesn't exist", () => {
      return request(app)
        .patch("/api/project/111111-69/register/M&E-M-001")
        .send({
          project_number: "111111-11",
          hs_risk: false,
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toEqual("Project number is incorrect.");
        });
    });
    it("PATCH 400 - Returns error if the risk doesn't exist", () => {
      return request(app)
        .patch("/api/project/111111-11/register/M&E-M-050")
        .send({
          project_number: "111111-11",
          hs_risk: false,
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toEqual("Risk does not exist.");
        });
    });
    it("PATCH 400 - Returns error if number is 000", () => {
      return request(app)
        .patch("/api/project/111111-11/register/M&E-M-000")
        .send({
          project_number: "111111-11",
          hs_risk: false,
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toEqual("Risk number cannot be zero.");
        });
    });
    //DELETE
    it("DEL 200 - Returns 200 response from server", () => {
      return request(app)
        .del("/api/project/111111-11/register/M&E-M-002")
        .expect(200);
    });
    it("DEL 400 - if non existing project number", () => {
      return request(app)
        .del("/api/project/444/register/M&E-M-050")
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Project number is incorrect.");
        });
    });
    it("DEL 400 - if non existing risk", () => {
      return request(app)
        .del("/api/project/111111-11/register/M&E-M-050")
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Risk does not exist.");
        });
    });
  });
});
