import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const URL = 'http://localhost:8080/stocks/';

const HttpContext = React.createContext({
	selectedStocks: [], // Using Set() is not helping when removing item(because of mutation)
	fetchedData: [],
	isLoading: false,
	errorMsg: null,
	onSelectStock: () => {},
	onFetchStocks: () => {},
	onCloseLegend: () => {},
	onCloseAllLegend: () => {}
}); // app-wise state/context manager, used with lower frequency changes

export const HttpContextProvider = (props) => {

	const [selectedStocks, setSelectedStocks] = useState([]);
	const [fetchedData, setFetchedData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState(null);

	const handleStockSelection = async (symbol) => {
		if (selectedStocks && !selectedStocks.includes(symbol))
			await fetchStockPrices(symbol);
	}

	const handleStockRemoval = (event) => {
		if (event?.target) {
			// Remove from selected stocks
			const key = event.target.getAttribute('id');
			const newArry = selectedStocks.filter(item => item !== key);
			setSelectedStocks(newArry);
			// Remove from fetched data
			const copyFetchedData = [...fetchedData];
			let newFetchedData = [];
			copyFetchedData.forEach(element => {
				let innerArry;
				if (Array.isArray(element))
					[ innerArry ] = element;
				else
					innerArry = element;
				newFetchedData.push(innerArry)
			})
			const finalFetchData = newFetchedData.filter(element => element.name !== key );
			setFetchedData(finalFetchData);	
		}
	}

	const handleStockRemovalAll = (event) => {
		if (event?.target) {
			setFetchedData([]);
			setSelectedStocks([]);
		} else {
			return;
		}
	}

	const fetchStockPrices = async (symbol) => {
		const urlString = URL + symbol;
		setIsLoading(true);
		setErrorMsg('');
			try {
				const response = await axios.get(urlString);
				if (response.status === 200) {
					updateData(response.data, symbol);
				}
		} catch (err) {
			handleError(err, symbol);
		} finally {
			setIsLoading(false);
		}
	}

	function updateData(data, sym) {
		const transformedData = data.map(stockData => [stockData.timestamp, stockData.price]);

		const copyFetchedData = [...fetchedData];
		copyFetchedData.push([{name: sym, data: transformedData}]);
		setFetchedData(copyFetchedData);

		const copySelectedStocks = [...selectedStocks];
		copySelectedStocks.push(sym);
		setSelectedStocks(copySelectedStocks);
	}

	function handleError(err, symbol) {
		if (err.response) {
			const errStatus = err.response.status
			if (errStatus === 403)	setErrorMsg(`You are not authorized to fetch '${symbol}'`);
			else if (errStatus === 404) setErrorMsg(`Requested ${symbol} not found`);
			else setErrorMsg('Something gone wrong...')
		} else {
			setErrorMsg('Unable to reach server...');
		}
	}

	return (
		<HttpContext.Provider 
			value={{
				selectedStocks,
				fetchedData,
				isLoading,
				errorMsg,
				onSelectStock: handleStockSelection,
				onFetchStocks: fetchStockPrices,
				onCloseLegend: handleStockRemoval,
				onCloseAllLegend: handleStockRemovalAll
			}}>
			{props.children}
		</HttpContext.Provider>)

}

export default HttpContext;