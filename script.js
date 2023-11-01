var isAuth = JSON.parse(localStorage.getItem("authInfo"));
function signIn() {
  // if user is already authenticated just redirect to login page
  if (isAuth) {
    location.href = "http://127.0.0.1:5500/login.html";
  }

  let oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  //Create an empty form
  let form = document.createElement("form");

  form.setAttribute("method", "GET");
  form.setAttribute("action", oauth2Endpoint);

  let params = {
    client_id:
      "705407135307-222h6coavvdndki1thsl3r3jvorcmtcu.apps.googleusercontent.com",
    redirect_uri: "http://127.0.0.1:5500/login.html",
    response_type: "token",
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube.readonly",
    include_granted_scopes: "true",
    state: "pass-state",
  };

  //create form input elements to submit the form by traversal in the param object
  for (let p in params) {
    let input = document.createElement("input");
    //Hidden so we cant see it in our page
    input.setAttribute("type", "hidden");
    input.setAttribute("name", p);
    input.setAttribute("value", params[p]);
    form.appendChild(input);
  }

  // for clarity just
  // console.log("form: ", form);

  //append form into the body 
  document.body.appendChild(form);

  //submit the form using javaScript
  form.submit();
}

//authorized Status check
isAuth
  ? (document.getElementById("loginStatus").innerHTML += "authorized")
  : (document.getElementById("loginStatus").innerHTML += "unauthorized");
