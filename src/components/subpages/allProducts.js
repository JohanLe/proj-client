import React from 'react';
import Popup from '../popup';
import UserInfo from "../userInfo";

import fn from "../../functions";

const baseUrl = fn.apiBaseUrl();


class AllProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productListComponents: [],
            product: "",
            prices: [],
            showPopup: false,
        };

    }
    togglePopup(event) {

        if (fn.userLoggedin) {
            if (!this.state.showPopup) {
                this.setState({
                    product: JSON.parse(event.target.id)
                });
            }
            this.setState({
                showPopup: !this.state.showPopup
            });
        } else {
            alert("Please login first");
        }
    }




    /**
     * 
     * @param {string} productId 
     * Search for object that has prop id which match param
     * returns product as object 
     */


    productListItems(products) {

        var keyId = 0;
        let prods = products.map((product) => {
            keyId += 1;
            return (
                <div key={keyId} className="product-card">
                    <p className="product-title">{product.name}</p>
                    <p className="product-type">{product.type}</p>

                    <label className="product-label">
                        In stock:
                    <p className="product-stock">{product.stock}</p>
                    </label>
                    <label className="product-label">
                        Price:
                        <p>{product.price}</p>

                    </label>
                    <button
                        id={JSON.stringify(product)}
                        className="product-trade-btn"
                        onClick={this.togglePopup.bind(this)}>
                        Buy
                    </button>


                    <br />
                </div>
            )


        })
        return prods;
    }

    componentDidMount() {
        const testUrl = baseUrl + "/products/all";
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
                var prods = this.productListItems(data.data)
                this.setState({ producs: data.data });
                this.setState({
                    productListComponents: prods
                });
            })
            .catch(err => {
                console.log("Some error: " + err);
            })
    }


    render() {
        return (
            <div className="main-content">
                {fn.userLoggedin() ?
                    <UserInfo className="user-info-container" />
                    : null
                }
                <div className="product-list">
                    <h3>All products</h3>
                    {this.state.productListComponents}
                    {this.state.showPopup ?
                        <Popup
                            product={this.state.product}
                            closePopup={this.togglePopup.bind(this)}
                            type={1}
                        />
                        : null
                    }

                </div>
            </div>
        )
    }


}

export default AllProducts;