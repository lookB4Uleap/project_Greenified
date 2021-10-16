let logged_in = false

function loggedIn(log) {
    logged_in = log
}

let user = {}

function setUser(user_var) {
    user = user_var
}

export {logged_in, loggedIn, user, setUser}