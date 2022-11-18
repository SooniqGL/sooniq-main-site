// import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { SecurityService } from "@/service/SecurityService";

/*
export const useSecurityStore = defineStore("security", () => {
  const jwt = ref('');
  
  function setJwt(jwtToken: string) {
    jwt.value = jwtToken;
  }

  return { jwt, setJwt };
});
*/
const securityService = new SecurityService();

export const useSecurityStore = defineStore({
  id: 'security',
  state: () => ({
    name: 'Guest',
    jwt: ''
  }),

  actions: {
    logout() {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + this.jwt
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
      this.name = 'Guest';
      this.jwt = '';
      securityService.setToken('Guest', '');

    },

    setToken(name: string, jwt: string) {
      this.name = name;
      this.jwt = jwt;
      securityService.setToken(name, jwt);
    },

    fetchToken() {
      this.name = String(securityService.getName());
      this.jwt = String(securityService.getJwt());
    },

    isAuthenticated(): boolean {
      if (this.jwt == null || this.jwt == '') {
        return false;
      }

      try {
        var decodedJwt: any = jwt_decode(this.jwt);

        // console.log("jwt - exp: " + decodedJwt.exp + ", curr time: " + new Date().getTime());
        if (new Date().getTime() >= decodedJwt.exp * 1000) {
          return false;
        }
      } catch (err) {
        console.error("decode jwt error");
        return false;
      }

      return true;
    },
    renewToken() {
      if (!this.isAuthenticated()) {
        console.log("renew token is called - but skip as isAuthenticated = false");
        return;
      }

      console.log("renew token is called");
      const headers = {
        "Authorization": "Bearer " + this.jwt,
        "FID": "J10",
        withCredentials: true
      };

      axios.get(import.meta.env.VITE_API_URL + "/s1/main/renew-token", { headers })
        .then(result => {
          // alert("Good: " + JSON.stringify(result));
          if (result != null && result.data != null) {
            if (result.data.statusCode == 200) {
              this.jwt = result.data.object.token;
              this.name = result.data.object.firstName + " " + result.data.object.lastName;
              localStorage.setItem('jwt', this.jwt);
              localStorage.setItem('name', this.name);
              console.info("token is updated: " + this.name + ", " + this.jwt);
            } else {
              console.error("Error: " + result.data.statusCode + ". Try later");
            }
          }
        })
        .catch(err => {
          if (err) {
            console.error("Technical error: " + err);
          }
        });
    }
  }


})


