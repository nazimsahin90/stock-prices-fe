import React, { useState, useRef, useEffect, useContext } from 'react'; // In order to open and close we need useState to track dropdown status
import HttpContext from '../../shared/http-context';
import "./SearchFilter.css";

const SearchFilter = ({ 
	options,
	id,
	label,
	prompt,
	value,
	onChange
}) => {

	const [open, setOpen] = useState(false); // first value getter we are goingto name that open, second value is the setter
	const [query, setQuery] = useState(''); // dont use null here e.g. null.length gives exception, also default string is can be cast to other types
	const inputRef = useRef(null); // use state hook to improve dom interaction time

	const httpCtx = useContext(HttpContext);

	useEffect(() => {
		document.addEventListener('click', toggleDropdownVisibility);
		return () => document.removeEventListener('click', toggleDropdownVisibility);
	})

	function toggleDropdownVisibility(e) {
		setOpen(e && e.target === inputRef.current); // evaluate dropdown state as false when clicked outside of dropdown target
	}

	function filter(options) {
		return options.filter((option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1);
	}

	function displayValue() {
		if (query.length > 0) return query;
		if (value) return value[label];
		return '';
	}

	function selectOption(option) {
		setQuery(''); // once value selected show the value instead of query
		onChange(option);
		setOpen(false);
		httpCtx.onSelectStock(option.name); // emit select event to shared service
	}

  	return (
		<div className="dropdown">
			<div className="control">
				<div className="selected-value">
					<input type="text" 
						ref={inputRef}
						placeholder={value ? value[label] : prompt}
						value={displayValue()}
						onChange={e => {
							setQuery(e.target.value)
							onChange(null)
						}}
						onClick={toggleDropdownVisibility}/>
				</div>
				<div className={`arrow ${open ? "open" : null}`}></div> {/* String interpolation */}
			</div>
			<div className={`options ${open ? "open" : null}`}>
				{filter(options).map((option) => (
					<div
						key={option[label]}
						className={`option ${value === option ? "selected" : null}`} /* add option class all of those divs but then if value that is selected  */
						onClick={() => { selectOption(option) }}>{option[label]}</div> /* whenever dropdown item clicked close dropdown */
				))}
			</div>
		</div>
  	);
};


export default SearchFilter;