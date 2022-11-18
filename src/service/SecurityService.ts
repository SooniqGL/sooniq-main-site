// security service - handle user info, jwt from local storage
// import { APIService } from '../../services/apiService'
// const service = APIService()
// import { Vue } from "vue-class-component";
// import { AuthService } from '@/services/AuthService';
// import { Inject } from 'vue-property-decorator';
// @Inject('authService') private authService = new AuthService()

// import Promise, { config, resolve, reject } from 'bluebird';

/*
    public giveMeAllDishes(dishType, query) : Promise<string>{

        return new Promise((resolve,reject) =>{
             axios.get('http://example.com',{method : 'GET'})
             .then(function(respone){
                 console.log(respone);
                 resolve(respone.data);
             })
             .catch(function(err){
                 reject(err);
             })
         })
  } */
import axios from 'axios';
import jwt_decode from "jwt-decode";


export class SecurityService {
    constructor() { }

    public getJwt() {
        return localStorage.getItem("jwt");
    }

    public getName() {
        return localStorage.getItem("name");
    }

    public logout() {
        const jwt = localStorage.getItem("jwt");
        if (jwt == null) {
            return;
        }

        const config = {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        };

        axios
            .get(import.meta.env.VITE_API_URL + '/s1/main/logout', config)
            .then((response) => {
                console.log(response);
                // get response code, and token
            })
            .catch((error) => {
                // handle http exception
                console.log(error);
            });

        // reset
        localStorage.setItem("jwt", '');
        localStorage.setItem("name", 'Guest');

    }

    public setToken(name: string, jwt: string) {
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("name", name);
    }

    public isAuthenticated(): boolean {
        const jwt = localStorage.getItem("jwt");
        if (jwt == null || jwt == '') {
            return false;
        }

        try {
            var decodedJwt: any = jwt_decode(jwt);

            console.log("jwt - exp: " + decodedJwt.exp + ", curr time: " + new Date().getTime());
            if (new Date().getTime() >= decodedJwt.exp * 1000) {
                return false;
            }
        } catch (err) {
            console.error("decode jwt error");
            return false;
        }

        return true;
    }


}