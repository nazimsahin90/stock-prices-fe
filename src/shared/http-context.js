import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const URL = 'http://localhost:8080/stocks/';

const HttpContext = React.createContext({
	selectedStocks: [], // Using Set() is not helping when removing item(because of mutation)
	fetchedData: [],
	isLoading: false,
	error: null,
	onSelectStock: () => {},
	onFetchStocks: () => {},
	onCloseLegend: () => {},
	onCloseAllLegend: () => {}
}); // app-wise state/context manager, used with lower frequency changes

export const HttpContextProvider = (props) => {

	const [selectedStocks, setSelectedStock] = useState([]);
	const [fetchedData, setFetchedData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);

	const handleStockSelection = async (symbol) => { // onSelectStock
		await fetchStockPrices(symbol);
		
	}

	const handleStockRemoval = (event) => {
		if (event?.target) {
			const key = event.target.getAttribute('id');
			console.log("key: " + key)
			const newArry = selectedStocks.filter(item => {
				console.log("item: " + item)
				return item !== key;
			});
			setSelectedStock(newArry);
			console.dir(selectedStocks)
		} else {
			return;
		}
	}
	//setSelectedStock([]);
	const handleStockRemovalAll = (event) => {
		if (event?.target) {
			setSelectedStock([]);
		} else {
			return;
		}
	}

	const fetchStockPrices = async (symbol) => {
		const urlString = URL + symbol;
		setIsLoading(true);
		setHasError(false);
			try {
				const response = await axios.get(urlString);
				/* if (response.status !== 200) {
					throw new Error(response.message);
				} */
				updateData(response.data, symbol);

		} catch (err) {
			console.error(err.response.status);
			setHasError(true);
		} finally {
			setIsLoading(false);
		}
	}

	function updateData(data, sym) {
		const transformedData = data.map(stockData => {
			return [stockData.timestamp, stockData.price]
		});
		setFetchedData(prevData => [...prevData, {name: sym, data: transformedData} ]);
		setSelectedStock(stocks => {
			if (!stocks.includes(sym)) {
				return [...stocks, sym];
			}
			else
				return stocks;
		});
	}

	return (
		<HttpContext.Provider 
			value={{
				selectedStocks,
				fetchedData,
				isLoading,
				hasError,
				onSelectStock: handleStockSelection,
				onFetchStocks: fetchStockPrices,
				onCloseLegend: handleStockRemoval,
				onCloseAllLegend: handleStockRemovalAll
			}}>
			{props.children}
		</HttpContext.Provider>)


}

export default HttpContext; // listen/hook this context from target component