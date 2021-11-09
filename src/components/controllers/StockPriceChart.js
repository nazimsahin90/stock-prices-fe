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
			enabled: true,
			allButtonsEnabled: true,
			buttons: [{
				type: 'all',
				text: 'All',
			}, {
				count: 21,
				type: 'day',
				text: 'Daily',
			}, {
				count: 3,
				type: 'month',
				text: 'Quarter',
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
		let seriesArry = [];
		fetchedData.forEach(element => {
			if (Array.isArray(element))
				seriesArry.push(element[0])
		});
		// Arrange chart data and update it with useState hook
		if (selectedStocks.length > chartLegendList.length) {
			setChartOptions(prevData => ({
				...prevData,
				series: seriesArry
			}));
		} else {
			if (fetchedData.length === 0) {
				setChartOptions(prevData => ({
					...prevData,
					series: []
				}));
			} else {
				setChartOptions(prevData => ({
					...prevData,
					series: fetchedData
				}));
			}
		}
		// Alignment of search legend controllers & chart legends 
		setStockLegendList(selectedStocks);
  	}, [fetchedData, selectedStocks]); 
	
	// Reference for calling chart data update() when 'selectedStocks' state has changed
	useEffect(() => {
		// Update when lengths are different
		if (selectedStocks.length !== chartLegendList.length) {
			handleDataUpdate();
		}
	}, [selectedStocks]); // no need to add handleDataUpdate as a dependency since react guarantees that they won't change

	return (
    <div id="chart">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={chartOptions}
      />
    </div>
  );
}

export default StockPriceChart;


