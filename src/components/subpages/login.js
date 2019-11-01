import React from "react";
import fn from "../../functions";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();

        fn.updateCurrentToken("");
        fn.updateCurrentUser({});

        fetch("http://localhost:8888/auth/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })

        }).then(res => {
            return res.json();
        }).then(res => {
            console.log(res);
            // BÖRJA MED LOCAL STORAGE!
            // TESTA SEDAN COOKIE!! --------------------------------
            if (res.status === 200) {
                ;
                fn.updateCurrentToken(res.token);
                fn.updateCurrentUser(res.user);
                this.props.history.push("/myinventory");
            }
            else {
                console.log("Failed to loggin..");
            }
        }).catch(e => {
            console.log("ERROR : " + e);
        })


    }
    handleOnChange = (event) => {
        event.preventDefault();
        var target = event.target.name;
        var value = event.target.value;
        this.setState({ [target]: value })
    }
    render() {
        fn.updateCurrentToken(false);
        fn.updateCurrentUser({});
        return (
            <div className="loginStuffbettername main-content">
                <form className="pretty-form">
                    <label className="form-label">
                        Email
                    <input
                            
                            name="email"
                            type="email"
                            onChange={this.handleOnChange}
                        />
                    </label>

                    <label className="form-label"> 
                        Password
                    <input
                            
                            name="password"
                            type="password"
                            onChange={this.handleOnChange}
                        />
                    </label>

                    <input
                        className="form-btn"
                        name="subit"
                        type="submit"
                        value="Login"
                        onClick={this.handleSubmit} />
                </form>
            </div>
        )
    }
}

export default Login;