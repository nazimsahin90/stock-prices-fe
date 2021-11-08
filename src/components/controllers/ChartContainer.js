import StockPriceChart from './StockPriceChart';
import CardContainer from '../view/CardContainer';
import React, { useContext } from 'react';
import HttpContext from '../../shared/http-context';

const Chart = () => {

	const httpCtx = useContext(HttpContext)
	const fetchedData = httpCtx.selectedStocks;
	const isLoading = httpCtx.isLoading;
	const hasError = httpCtx.hasError;

	return (
		<CardContainer>
			{fetchedData?.length > 0 && <StockPriceChart />}
			<h5 style={{ textAlign: "center" }}>
				{!isLoading && fetchedData?.length === 0 && !hasError && <p>Add stocks to compare historical prices</p>}
				{isLoading && fetchedData?.length === 0 && <p>Fetching prices...</p>}
				{!isLoading && hasError && <p>Unable to retrieve data...</p>}
			</h5>
		</CardContainer>
	)
}

export default Chart;