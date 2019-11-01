import React from 'react';
import fn from "../functions";


class Popup extends React.Component {
    constructor(props) {
        super();
        this.state = {
            amount: 1,
            type: "0"
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        var target = event.target.name;
        var value = event.target.value;
        this.setState({ [target]: value })

    }

    handleSubmit = (event) => {
        event.preventDefault();
        var user = fn.getCurrentUser();

        if (this.props.type === 1) {
            this.buyItem(user);
        }
        else if (this.props.type === 2) {
            this.sellItem(user);
        }


    }

    buyItem = (user) => {
        var token = fn.getCurrentToken();
        fetch("http://localhost:8888/trade/buy", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: this.props.product.id,
                unitPrice: this.props.product.price,
                amount: this.state.amount,
                userId: user.id,
                token: token
            })

        }).then(res => {
            return res.json();
        }).then(res => {
            if(res.status === 200){
                console.log("Purchase made.")
                this.props.history.push("/myinventory");
            }else {
                alert(res.msg);
            }
        }).catch(err => {
            console.log(err);
        })
    }
    sellItem = (user) => {
        var token = fn.getCurrentToken();
        fetch("http://localhost:8888/trade/sell", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: this.props.product.id,
                unitPrice: this.props.product.unit_price,
                amount: this.props.product.amount,
                userId: user.id,
                inventoryId: this.props.product.inventoryId,
                token: token
            })

        }).then(res => {
            return res.json();
        }).then(res => {
            if (res.status === 200) {
                console.log("Item sold");
            }

            else {
                alert(res.msg);
            }

        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                {this.props.type === 1 ?
                    <div>
                        <div className='popup'>
                            <div className='popup_inner'>
                                <h2>{this.props.product.name}</h2>
                                <p>Price: {this.props.product.price}</p>
                                <p>Stock: {this.props.product.stock}</p>
                                <p>Type: {this.props.product.type}</p>
                                <form className="trade-form">
                                    <label className="trade-label">
                                        <span>Amount: </span>
                                        <input name="amount" type="number" onChange={this.handleChange} />
                                    </label>
                                    <br />
                                    <input className="form-btn"
                                        type="submit"
                                        value="Purchase"
                                        onClick={this.handleSubmit} />
                                </form>

                                <button className="end-btn" onClick={this.props.closePopup}>End</button>

                            </div>
                        </div>

                    </div>
                    : null}
                {this.props.type === 2 ?
                    <div>
                        <div className='popup'>
                            <div className='popup_inner'>

                                <h2>{this.props.product.name}</h2>
                                <p>Price / unit: {this.props.product.unit_price}</p>
                                <p>Total price: {this.props.product.unit_price * this.props.product.amount}</p>
                                <p>Inventory: {this.props.product.amount}</p>
                                <p>Type: {this.props.product.type}</p>
                                <form className="trade-form">
                                    <br />
                                    <input className="form-btn"
                                        type="submit" value="Sell" onClick={this.handleSubmit} />


                                </form>

                                <button className="end-btn" onClick={this.props.closePopup}>End</button>
                            </div>
                        </div>
                    </div>
                    : null}

            </div >
        );
    }
}

export default Popup;