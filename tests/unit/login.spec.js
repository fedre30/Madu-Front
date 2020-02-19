import login from "../../src/store/actions";

let url = "";
let body = {};

jest.mock("axios", () => ({
  post: (_url, _body) => {
    return new Promise(resolve => {
      url = _url;
      body = _body;
      resolve(true);
    });
  }
}));
describe("authenticate", () => {
  it("authenticated a user", async () => {
    const commit = jest.fn();
    const username = "chrystal.leliegard@madu.net";
    const password = "madu";

    await login({ commit }, { username, password });

    expect(url).toBe("http://35.180.73.134:3000/login");
    expect(body).toEqual({ username, password });
    expect(commit).toHaveBeenCalledWith("auth_request", true);
  });
});
