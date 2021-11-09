import CardContainer from '../view/CardContainer';
import SearchFilter from './SearchFilter';
import STOCK_SYMBOLS from "../../shared/data/STOCK_SYMBOLS.json";
import React, {useState, useContext} from 'react';
import SearchLegend from './SearchLegend';
import RemoveAll from './RemoveAll';
import HttpContext from '../../shared/http-context';
import "./SearchFilter.css";

const Search = () => {
	const [value, setValue] = useState(null);
	const { selectedStocks } = useContext(HttpContext);
	const { onCloseLegend } = useContext(HttpContext);
	const { onCloseAllLegend } = useContext(HttpContext);

	return (
		<CardContainer>
			<div style={{ display: "flex" }}>
				<div style={{ width: 250}}>
					<SearchFilter
						options={STOCK_SYMBOLS}
						id="search-dropdown"
						label="name"
						prompt="Search by symbol.."
						value={value}
						onChange={val => setValue(val)} /> {/* Return of on change invoke is a call for setValue */}
				</div>
				<div className="wrap">
					<div>
						{selectedStocks && selectedStocks.map((symbol) => 
							<SearchLegend id={symbol} key={symbol} label={symbol} onClick={onCloseLegend} />
							)}
						
					</div>
					<div>
						{selectedStocks?.length >= 2 && <RemoveAll onClick={onCloseAllLegend} />}
					</div>
				</div>
			</div>
		</CardContainer>
	)
}

export default Search;