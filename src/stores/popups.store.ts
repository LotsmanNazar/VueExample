import { defineStore } from 'pinia';
import { PopupsStateType } from '../types';

export const usePopupsStore = defineStore('popupsStore', {
	state: (): PopupsStateType => ({
		active: null,
		popups: {
			spelling: {
				open: false
			}
		}
	}),

	actions: {
		open(key: string) {
			if ( this.active ) {
				this.close(this.active);
			}
			
			this.popups[key].open = true;
			this.active = key;
		},

		close(key: string) {
			this.popups[key].open = false;
			this.active = null;
		},

		closeAll() {
			if ( !this.active ) {
				return;
			}

			this.popups[this.active].open = false;
			this.active = null;
		},

		isActive(key: string) {
			return this.active === key;
		}
	}
});