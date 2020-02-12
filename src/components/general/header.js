import React from 'react';
import fn from "../../functions";



class MainHeader extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isLoggedIn: false,
            userInfo: "",
            prices: [],
        }
        this.logout = this.logout.bind(this);

    }
    componentDidMount() {
        this.setState({ isLoggedIn: fn.userLoggedin() })
    }
    logout() {
        fn.updateCurrentUser({});
        fn.updateCurrentToken("");
        window.location.href = "/login";
    }

    render() {

        return (
            <div className="main-header md-border-bottom">
                <div className="h-link-container">
                    <a className="h-link" href="/">Products</a>
                    <a className="h-link" href="/graph">Graph</a>
                    <a className="h-link" href="/myinventory">My inventory</a>


                    <a className="h-link" href="/deposit">Deposit coins</a>

                    <a className="h-link" href="/login">Login</a>

                    <button onClick={this.logout}
                        className="h-link link-button"
                        href="/login" >
                        Logout
                        </button>


                    <span className="info-text">{this.state.userInfo} </span>


                    <a className="h-link" href="/register">Register</a>

                </div>
            </div>
        )
    }
}

export default MainHeader