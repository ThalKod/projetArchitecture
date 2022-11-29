import app from "./index";
import request from "supertest";

describe('typeScript test suite', () => {

  afterAll((done) => {
    app.close();
    done();
  })

  // eslint-disable-next-line jest/no-done-callback
  it("should return error 404", async () => {
    const res = await request(app)
        .get('/')
    expect(res.statusCode).toBe(404)
  });

  // eslint-disable-next-line jest/no-done-callback
  it("should return the correct json", async () => {
    const res = await request(app)
        .get('/api/v1/sysinfo')
    expect(res.statusCode).toBe(200)
  });

  //TODO: Add more test for struct de donnes, faire test serveur se lance....
});
