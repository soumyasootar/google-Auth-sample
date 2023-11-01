let params = {}
let m

// The regular expression looks for characters that are not & or = (for the key), an equal sign =, and then characters that are not & (for the value) from the url 
let regex = /([^&=]+)=([^&]*)/g

// Something similar to this [
//     ['name=John', 'name', 'John'],
//     ['age=30', 'age', '30']
// ]

// creates the param object 
// The code `while (m = regex.exec(location.href)) { params[decodeURIComponent(m[1])] =
// decodeURIComponent(m[2]) }` is used to extract the query parameters from the URL and store them
// in the `params` object. 
while (m = regex.exec(location.href)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
}

//if params object is created store it in local storage
if (Object.keys(params).length > 0) {
    localStorage.setItem("authInfo", JSON.stringify(params))
}

//To hide the access token
//we are adding a new history element into our History Stack
window.history.pushState({}, document.title, "/" + "login.html")

//Getting the info from local storage back
let info = JSON.parse(localStorage.getItem("authInfo"))

//Fectching the user info from google api 
fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
        "Authorization": `Bearer ${info.access_token}`
    }
}).then((data) => data.json()).then((info) => {
    //Changing the name 
    document.getElementById("name").innerHTML = info.name
    //Changing the picture
    document.getElementById("pic").setAttribute("src", info.picture)

})
//revoking the access token from my google account
function logout() {
    fetch("https://oauth2.googleapis.com/revoke?token=" + info.access_token, {
        method: "POST",
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }).then(data => {
        //redirecting to the homePage
        location.href = "./index.html"
        //delete from local Storage
        localStorage.removeItem("authInfo")
    })
}