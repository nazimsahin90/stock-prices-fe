import React, { useState, useCallback, useContext, useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HttpContext from '../../shared/http-context';

const StockPriceChart = () => {

	const options = {
		chart: {
		  type: 'line'
		},
		title: {
		  text: 'Stock prices'
		},
		/* yAxis: {
			type: 'logarithmic'
		}, */
		rangeSelector: {
			allButtonsEnabled: true,
			buttons: [{
				type: 'all',
				text: 'Daily',
			}, {
				type: 'all',
				text: 'Weekly',
			}, {
				type: 'all',
				text: 'Monthly',
			}],
			buttonTheme: {
				width: 60
			},
			selected: 0
		},
		series: [],
		legend: {
			enabled: true,
			align: 'left',
			verticalAlign: 'top',
			layout: 'vertical',
			x: 0,
			y: 100
		},
	};

	const [chartOptions, setChartOptions] = useState(options);
	const { selectedStocks } = useContext(HttpContext);
	const [chartLegendList, setStockLegendList] = useState([]);
	const { fetchedData } = useContext(HttpContext);

	const handleDataUpdate = useCallback(() => {
		console.log("updating chart....")
		// Decide if adding or removing performed on search legends
		if (selectedStocks.length > chartLegendList.length) {
			setChartOptions(prevData => ({
				...prevData,
				series: fetchedData
			}));
		} else {
			// Find the missing legend then remove it from copy of fetchedData
			const diff = chartLegendList.filter(val => !selectedStocks.includes(val));
			console.log("diff = " + diff)
			const copyFetchedData = fetchedData.filter(element => {
				console.log("element: " + element)
				console.log("name: " + element.name)
				return element.name === diff
			})
			
			setChartOptions(prevData => ({
				...prevData,
				series: copyFetchedData
			}));
		}
		// Alignment of search legend controllers & chart legends 
		setStockLegendList(selectedStocks);
  	}, [fetchedData, selectedStocks]); 
	
	// Reference for calling chart data update() when 'selectedStocks' state has changed
	useEffect(() => {
		console.log("selectedStocks..." + JSON.stringify(selectedStocks))
		console.log("stockList... " + JSON.stringify(chartLegendList))
		// Update when lengths are different
		if (selectedStocks.length !== chartLegendList.length) {
			handleDataUpdate(selectedStocks);
		}
	}, [selectedStocks]); // no need to add handleDataUpdate as a dependency since react guarantees that they won't change

	return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={chartOptions}
    />
  );
}

export default StockPriceChart;


