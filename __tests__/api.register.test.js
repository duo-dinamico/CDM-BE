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
    const methods = ["post", "get"];
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
  it("GET 400 - Should return error if project is not found", () => {
    return request(app)
      .get("/api/project/111111-55/register")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("Project number doesn't exist");
      });
  });
  describe("/api/project/:project_number/register/:risk_number", () => {
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
    it("PATCH 200", () => {
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
  });
});
