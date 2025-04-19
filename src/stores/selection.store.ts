import { defineStore } from 'pinia';
import { SelectionStateType } from '@/types';
import { SelectionDataType } from '@/types';

export const useSelectionStore = defineStore('selectionStore', {
	state: (): SelectionStateType => ({
		data: {
			selectedText: '',
			contextText: '',
			top: 0,
			left: 0,
			element: null
		}
	}),

	actions: {
		setData(data: SelectionDataType) {
			Object.assign(this.data, data);
		}
	}
});