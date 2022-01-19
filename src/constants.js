/**
 * default ajax configurations
 * 
 */
export const VueDataGridsDefaultAjaxConfig = {
	url: null,
	data: null,
	total: 0,
	headers: {},
	params: {},
};

/**
 * table themes
 */
export const VueDataGridsLightTheme = 'light';
export const VueDataGridsDarkTheme = 'dark';
export const VueDataGridsPrimaryTheme = 'primary';
export const VueDataGridsDangerTheme = 'danger';
export const VueDataGridsDefaultTheme = VueDataGridsLightTheme;

/**
 * table themes ENUM
 */
export const VueDataGridsThemesEnum = [
	VueDataGridsLightTheme,
	VueDataGridsDarkTheme,
	VueDataGridsPrimaryTheme,
	VueDataGridsDangerTheme,
];

/**
 * table classes
 */
export const VueDataGridsDefaultClasses = {
	table: 'table table-sm small table-striped',
};

/**
 * default rpp
 */
export const VueDataGridsDefaultRPP = 10;
/**
 * default rpp list
 */
export const VueDataGridsDefaultRPPList = [10, 20, 50, 100];

/**
 * ajax request status 
 */
export const IDLE = 'IDLE';
export const LOADING = 'LOADING';
export const SUCCEEDED = 'SUCCEEDED';
export const FAILED = 'FAILED';
