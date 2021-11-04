import api from "./api";

class UserService {
  getAllUser() {
    return api.get("/users/").then((response) => {
        return response.data;
    });
  }

  getCategory() {
    return api.get("/product").then((response) => {
      console.log(response);
    });
  }
}

export default new UserService();
