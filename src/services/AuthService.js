import api from './api';
import TokenService from './TokenService';

class AuthService{
    
    login(username, password){
        return api
            .post("/auth/login", {
                "username" : username,
                "password" : password
            })
            .then((response) => {
                if(response.data.accessToken){
                    TokenService.setUser(response.data);
                }

                return response.data
            });
    }

    logout(){
        TokenService.removeUser;
    }

    register(username, email, password){
        return api
            .post("/auth/signup", {
                "username" : username,
                "email" : email,
                "password" :password
            })
            .then((response) => {
                return response.data;
            });
    }

}

export default new AuthService();