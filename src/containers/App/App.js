/**
 * Copyright A.Rayhan P 2019 | All right Reserved
 */

import React, { Component } from "react";
import CurrencyInput from "react-currency-input";
import "./App.css";
import Main from "../Main/Main";
import Loading from "../../components/Loading/Loading";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			amount: 1,
			inputValue: 1,
			setCurrency: "EUR",
			currencyItems: [],
			setDefaultCurrencies: ["IDR", "USD", "GBP", "SGD"],
			rates: {},
			abbreviation: {},
			isLoading: true,
		};

		this.API_KEY = "567d5ad4edde86551b4cd4f0d2ddf6ab";
	}

	// Get currencies from local storage
	getLocalCurrencies() {
		return JSON.parse(localStorage.getItem("currencies"));
	}

	// Set currencies from local storage
	setLocalCurrencies(currencies) {
		localStorage.setItem("currencies", JSON.stringify(currencies));
	}

	componentDidMount = () => {
		this.getLocalCurrencies() === null &&
			this.setLocalCurrencies(this.state.setDefaultCurrencies);

		this.setState({
			isLoading: true,
			currencyItems: this.getLocalCurrencies(),
		});

		fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${this.API_KEY}`)
			.then((res) => res.json())
			.then((res) => this.setState({ rates: res.rates, isLoading: false }));

		fetch("https://openexchangerates.org/api/currencies.json")
			.then((res) => res.json())
			.then((res) => this.setState({ abbreviation: res, isLoading: false }));
	};

	handleChange = (event, maskedValue, floatValue) => {
		this.setState({ inputValue: maskedValue, amount: floatValue });
	};

	onAddCurrency = (currency) => {
		this.state.currencyItems.push(currency);
		this.setLocalCurrencies(this.state.currencyItems);
	};

	onDeleteItems = (item) => {
		const filterItem = this.state.currencyItems.filter((value) => {
			return value !== item;
		});
		this.setState({ currencyItems: filterItem });
		this.setLocalCurrencies(filterItem);
	};

	render() {
		const { isLoading, setCurrency } = this.state;
		return (
			<div className="App">
				<Loading show={isLoading ? "show" : "hide"} />
				<div className="wrapper">
					<header>
						<div className="header-background" />
						<div className="header__inner">
							<div className="circle-icon header__currency-acronym">
								{setCurrency}
							</div>
							<span>{this.state.abbreviation[setCurrency]}</span>
							<span>( Type on the input text below )</span>

							<CurrencyInput
								value={this.state.inputValue}
								onChangeEvent={this.handleChange}
								autoFocus="true"
								prefix="$ "
								precision="1"
							/>
						</div>
					</header>
					{this.state.rates && (
						<Main
							isLoading={this.state.isLoading}
							abbreviation={this.state.abbreviation}
							rates={this.state.rates}
							amount={this.state.amount}
							currencyItems={this.state.currencyItems}
							onDeleteItems={this.onDeleteItems}
							onAddCurrency={this.onAddCurrency}
						/>
					)}
				</div>
			</div>
		);
	}
}

export default App;
