export type PopupsStateType = {
	active: string | null;
	popups: Record<string, {open: boolean}>;
}

export type SelectionStateType = {
	data: SelectionDataType
}

export type SelectionDataType = {
	selectedText: string;
	contextText: string;
	top: number;
	left: number;
	element: HTMLElement | null;
}