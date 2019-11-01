import React from "react";
import fn from "../functions";

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            coins: "",
            user: { name: "", coins: 0 }
        }
    }


    componentDidMount() {
        var user = fn.getCurrentUser();
        const testUrl = "http://localhost:8888/auth/user/" + user.id;;
        fetch(testUrl, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => {
            return res.json();
        })
            .then(data => {
                this.setState({ "user": data.user })
            })
            .catch(err => {
                console.log("Some error: " + err);
            })


        if (fn.userLoggedin()) {
            this.setState({ user: fn.getCurrentUser() });
        }
        else {
            this.setState({ user: { "name": "", "coins": "" } });
        }

    }
    render() {
        return (
            <div className="user-info-container">
                {this.state.user ?
                    <div>
                        <label>
                            <p>User: {this.state.user.name}</p>
                        </label>
                        <label>

                            <p>Coins: {this.state.user.coins}</p>
                        </label>
                    </div>
                    : <p>Login to view your inventory</p>}


            </div>
        )
    }
}

export default UserInfo;
