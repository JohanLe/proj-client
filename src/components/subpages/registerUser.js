import React from 'react';

class RegisterUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            error: null
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        fetch("http://localhost:8888/auth/register", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })

        }).then(res => {
            return res.json();
        }).then(res => {
            console.log(res);
            if (res.status === 200) {
                console.log("U logged in!");
                this.props.history.push("/login");
            }
            else {
                console.log("Failed to register..");
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
        return (
            <div className="main-content">
                <form className="pretty-form">
                    <label className="form-label">
                        Email
                        <input name="email" type="email" onChange={this.handleOnChange} />
                    </label>
                    <label className="form-label">
                        Password
                        <input name="password" type="password" onChange={this.handleOnChange} />
                    </label>
                    <label className="form-label">
                        Name
                        <input name="name" type="text" onChange={this.handleOnChange} />
                    </label>





                    <input className="form-btn" type="submit" value="Register" onClick={this.handleSubmit} />
                </form>
                {this.state.error}
            </div>
        )
    }
}

export default RegisterUser;