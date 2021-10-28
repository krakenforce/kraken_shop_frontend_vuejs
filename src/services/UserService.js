import api from './api';

class UserService{
    getPublicContent(){
        return api.get('/test/all');
    }

    getUserBoard(){
        return api.get('/test/user');
    }

    getCategory(){
        return api.get('/product')
                    .then((response) => {
                        console.log(response);
                    });
    }
}

export default new UserService();