<template>
  <div id="vue__data-grids-theme-selector-container">
    <select
      name="vue__data-grids-theme-selector"
      id="vue__data-grids-theme-selector"
      v-model="currentTheme"
      class="form-control form-control-sm"
    >
      <option v-for="th in themes" :key="`theme_${th}`" :value="th">
        {{ th | capital }} Theme
      </option>
    </select>
  </div>
</template>

<script>
import {
	VueDataGridsDefaultTheme,
	VueDataGridsThemesEnum,
} from '../constants';
export default {
	props: {
		/**
       * table theme
       */
		theme: {
			type: String,
			default: () => VueDataGridsDefaultTheme,
		},
		/**
       * callback on theme changed
       */
		onThemeChange: {
			type: Function,
		},
	},

	data() {
		return {
			/**
         * themes list
         * @var {Array}
         */
			themes: VueDataGridsThemesEnum,
			/**
         * current theme
         * @var {String}
         */
			currentTheme: this.theme,
		};
	},
	watch: {
		/**
       * action when current theme changed
       *
       */
		currentTheme: function () {
			if (this.onThemeChange) {
				this.onThemeChange(this.currentTheme);
			}
		},
	},

	filters: {
		capital: function (val) {
			if (typeof val !== 'string' || val.length < 2) {
				return val;
			}
			return val[0].toUpperCase() + val.substr(1);
		},
	},
};
</script>

<style></style>
