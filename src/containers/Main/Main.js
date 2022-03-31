import React, { Component } from "react";
import "./Main.css";
import CurrencyCard from "../../components/CurrencyCard/CurrencyCard";
import PopUp from "../../components/PopUp/PopUp";

class Main extends Component {
	state = {
		isPopupShow: false,
		inputValue: "",
	};

	handleSubmit = (event) => {
		const data = new FormData(event.target);
		this.props.onAddCurrency(data.get("currency"));
		this.setState({ isPopupShow: !this.state.isPopupShow });
		event.preventDefault();
	};

	handleChange = (event) => {
		const { value } = event.target;
		this.setState({ inputValue: value });
	};

	onDelete = (event) => {
		this.props.onDeleteItems(event.target.value);
	};

	handleClick = (event) => {
		const { className } = event.target;
		(!this.state.isPopupShow || className === "popup-background") &&
			this.setState({ isPopupShow: !this.state.isPopupShow });
	};

	render() {
		const { rates, abbreviation, currencyItems, amount } = this.props;
		return (
			<section id="main">
				<div className="currency-card-container">
					{(!currencyItems || currencyItems.length === 0) && (
						<span style={{ textAlign: "center", color: "rgba(255,0,100,0.7)" }}>
							Data is empty <br />
							Press the button below to add currency
						</span>
					)}
					{currencyItems &&
						currencyItems.map((rate) => {
							return (
								<CurrencyCard
									key={rate}
									currency={rate}
									rates={rates[rate] || 0}
									abbreviation={abbreviation[rate]}
									amount={amount}
									onDelete={this.onDelete}
								/>
							);
						})}
				</div>
				<button onClick={this.handleClick}>
					<i className="fas fa-plus" /> Add More Currencies
				</button>

				<PopUp
					show={this.state.isPopupShow}
					rates={rates}
					handleClick={this.handleClick}
					handleSubmit={this.handleSubmit}
					handleChange={this.handleChange}
					currencyItems={currencyItems}
				/>
			</section>
		);
	}
}

export default Main;
