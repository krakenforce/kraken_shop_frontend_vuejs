import api from "./api";
import TokenService from "./TokenService";

class AuthService {
  login(username, password) {
    return api
      .post("/auth/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }
        return response.data;
      })
      .catch((error) => {
        alert("Cannot login, try again");
        window.location.reload();
        Promise.reject(error);
      });
  }

  logout() {
    TokenService.removeUser;
  }

  register(username, email, password) {
    return api
      .post("/auth/signup", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        return response.data;
      });
  }

  handleResponse(response) {
    if (response.status == 401) {
      this.logout();
      location.reload(true);

      const error = response.data && response.data.message;
      return Promise.reject(error);
    }
    return Promise.resolve(response);
  }
}

export default new AuthService();
