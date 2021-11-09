import StockPriceChart from './StockPriceChart';
import CardContainer from '../view/CardContainer';
import React, { useContext } from 'react';
import HttpContext from '../../shared/http-context';

const Chart = () => {

	const httpCtx = useContext(HttpContext)
	const fetchedData = httpCtx.selectedStocks;
	const isLoading = httpCtx.isLoading;
	const errorMsg = httpCtx.errorMsg;

	return (
		<CardContainer>
			{fetchedData?.length > 0 && <StockPriceChart />}
			<h5 style={{ textAlign: "center" }}>
				{!isLoading && fetchedData?.length === 0 && !errorMsg && <p id="add-stocks">Add stocks to compare historical prices</p>}
				{isLoading && fetchedData?.length === 0 && <p>Fetching prices...</p>}
				{!isLoading && errorMsg && <p>{errorMsg}</p>}
			</h5>
		</CardContainer>
	)
}

export default Chart;