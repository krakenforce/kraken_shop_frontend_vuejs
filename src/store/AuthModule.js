//import AuthService from '../services/AuthService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
    ?{status: {loggedIn: true}, user}
    :{status: {loggedIn: false}, user: null}

const auth = {
    namespaced: true,
    state: initialState,
    mutations:{
        //insert code in here
        refreshToken(state, accessToken){
            state.status.loggedIn = true;
            state.user = {...state.user, accessToken : accessToken};
        },

        login(state){
            state.status.loggedIn = true;
        }
    },
    action:{
        // insert code
        refreshToken({commit}, accessToken){
            commit('refreshToken', accessToken);
        },

        login({commit}){
            commit('login');
        }
    },
    
    modules:{
        
    }
};



export default auth;