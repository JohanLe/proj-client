const functions = {
    /**
     * data = json.
     */
    updateCurrentUser(data) {
        var user = JSON.stringify(data);
        localStorage.setItem("user", user);
    },
    /**
     * Return json.
     */
    getCurrentUser() {
        var user = localStorage.getItem("user");
        if(user && user !== undefined){
            return JSON.parse(user);
        }
        return {}
    },
    /**
    *   Update token string
    */
    updateCurrentToken(token) {
        localStorage.setItem("token", token);
    },
    /**
     * Return token as String.
     */
    getCurrentToken() {
        return localStorage.getItem("token");
    },
    userLoggedin() {
        if (this.getCurrentToken !== null) {
            return true;
        }
        return false;
    },
    userLoggOut() {
        this.updateCurrentUser([{}]);
        this.updateCurrentToken(null);
    },
    apiBaseUrl(){
         var local = "http://localhost:8888";
        var projectUrl = "https://proj-api.johanledel.me";
        return local;
    }
}

export default functions;