import { cloneDeep, get } from 'lodash';

/**
 * convert the given string to snake case
 * 
 * e.g hello world => HELLO_WORLD
 * 
 * @param {String} value 
 * @returns {String}
 */
export function toSnakeCase(value) {
	if (typeof value !== 'string') {
		return value;
	}

	return value.replace(/\s+/g, '_').toLowerCase();
}

/**
 * search through the given data
 * 
 * @param {Array} container 
 * @param {Array} searchable 
 * @param {String} search
 * @return {Array} 
 */
export function searchTableData(container = [], searchable = [], search = '') {
	let data = new Set();
	container.map(row => {
		searchable.map(col => {
			let val = get(row, col.data, null);
			if(val === null) {
				return;
			}
			if(typeof val === 'function') {
				val = val(row);
			}
			if(val.toString().toUpperCase().includes(search.toString().toUpperCase())) {
				data.add(row);
			}
		});
	});
	return Array.from(data);
}

/**
 * sort table data
 * 
 * 
 * @param {Array} container 
 * @param {Object} column 
 * @param {String} dir 
 * @returns {Array}
 */
export function sortTableData(container = [], column = {}, dir = 'asc') {
	/**
   * cloning data
   */
	let data = cloneDeep(container);
	/**
   * sort factor 
   */
	let factor = dir === 'asc' ? 1 : -1;
  
	data = data.sort(function(a,b) {
		let val1 = get(a, column.data);
		if(typeof val === 'function') {
			val1 = val1(a);
		}
		let val2 = get(b, column.data);
		if(typeof val2 === 'function') {
			val2 = val2(b);
		}


		if(val1 > val2) {
			return 1 * factor;
		} else if(val2 > val1) {
			return -1  * factor;
		} else {
			return 0;
		}

	});
	return data;
}

/**
 * generate query params string from
 * the given object
 * 
 * @param {Object} params 
 * @returns {String}
 */
export const prepareServerSideRequestParameter = (params = {}) => {
	let parameters = [];
	Object.keys(params).map(key => {
		let val = params[key];
		if(val !== null) {
			parameters.push(`${key}=${params[key]}`);
		}
	});

	return `?${parameters.join('&')}`;
}; 