import React from 'react';
import fn from "../../functions";
import Popup from '../popup';
import UserInfo from "../userInfo";

const baseUrl = fn.apiBaseUrl();

class MyInventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            user: {},
            product: {}

        };
    }

    togglePopup(event) {
        if (!this.state.showPopup) {
            this.setState({
                product: JSON.parse(event.target.id)
            });
            console.log(this.state);
        }
        this.setState({
            showPopup: !this.state.showPopup
        });

    }

    componentDidMount() {
        var user = fn.getCurrentUser();
        this.setState({ "user": user })
        const testUrl = baseUrl + "/products/myinventory/" + user.id;
        fetch(testUrl)
            .then(results => {
                return results.json();
            })
            .then(data => {
                console.log(data.data);
                var id = 0;
                let products = data.data.map((product) => {
                    id += 1;

                    return (
                        <div key={id} className="product-card">
                            <p className="product-title">{product.name}</p>
                            <p className="product-type">{product.type}</p>
                            <label className="product-label">
                                Amount:
                                <p>{product.amount}</p>

                            </label>
                            <label className="product-label">
                                Value:
                                <p>{product.amount * product.unit_price}kr</p>

                            </label>
                            <button
                                id={JSON.stringify(product)}
                                className="product-trade-btn"
                                onClick={this.togglePopup.bind(this)}>
                                Sell
                            </button>

                        </div>
                    )
                })
                this.setState({ products: products });

            })
            .catch(err => {
                console.log("Some error: " + err);
            })
    }
    /**
     * TODO - Lägg funktion i en 'extern'.js fil? samla alla getters funktion osv.
     * för snyggare kod.
     * 
     */

    render() {
        console.log(fn.userLoggedin())
        return (
            <div className="main-content">
                {fn.userLoggedin() ?
                    <UserInfo className="user-info-container" user={this.state.user} />
                    : <h5>Login to se your inventory</h5>
                }
                <h2>Inventory: </h2>
                <div className="product-list">
                    {this.state.products}
                </div>

                {this.state.showPopup ?
                    <Popup
                        product={this.state.product}
                        closePopup={this.togglePopup.bind(this)}
                        type={2}
                    />
                    : null

                }
            </div>
        )
    }


}

export default MyInventory;