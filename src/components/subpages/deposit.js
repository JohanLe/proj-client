import React from "react";
import fn from "../../functions";

class Deposit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }
    handleChange = (event) => {
        event.preventDefault();
        var target = event.target.name;
        var value = event.target.value;
        this.setState({ [target]: value })
    }

    /**
     * 1. Get user data (in user-session(localstorage for now))
     * 2. Send email & amount to api.
     * 3. When OK update local user data.
     */
    handleSubmit = (event) => {
        event.preventDefault();
        var user = fn.getCurrentUser();
        var token = fn.getCurrentToken();

        fetch("http://localhost:8888/trade/deposit", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: this.state.coins,
                id: user.id,
                token: token
            })

        }).then(res => {
            console.log("DEPOST!");
            return res.json();
        })
        .then(res => {
            if(res.status === 200){
                console.log("new coins: " + res.coins);
                var newAmount = parseInt(user.coins) + parseInt(this.state.coins);
                user.coins = newAmount;
                fn.updateCurrentUser(user);
                this.props.history.push("/myinventory");
            }else {
                alert(res.msg);
            }

        })
        .catch(err => {
                console.log(err);
        })
    }
    render() {
        return (
            <div className="main-content">
                
                <form className="pretty-form">
                <h4> Deposit coins here:</h4>
                <label className="form-label">
                    Amount:
                    <input type="number" name="coins" onChange={this.handleChange} />
                </label>
                    

                    <input className="form-btn" type="Submit" onClick={this.handleSubmit} />
                </form>
            </div>
        )
    }
}

export default Deposit;