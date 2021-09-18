import login from "../services/login";

function authenticate(cb, username, password) {
  login.login(username, password).then(
    (response) => {
      // if (response.status === 200);
      // if(respuesta.data)

      
      setTimeout(cb(response), 100);
      
    },
    (error) => {
      setTimeout(cb(error), 100);
    }
  );
}

const Auth = {
  authenticate,
};

export default Auth;
