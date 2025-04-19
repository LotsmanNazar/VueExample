import { SelectionDataType } from '@/types';

export function selectionData(contextWordsCount = 5): SelectionDataType {
	let data: SelectionDataType = {
		selectedText: '',
		contextText: '',
		top: 0,
		left: 0,
		element: null
	}

	if ( typeof window == 'undefined' ) {
		return data;
	}

	const selection = window.getSelection();
	if ( !selection?.rangeCount ) {
		return data;
	}

	const selectionRange = selection.getRangeAt(0);
	if ( selectionRange.collapsed ) {
		return data;
	}

	

	if ( selectionRange.endContainer.nodeType !== Node.TEXT_NODE ) {
		return data;
	}

	const cloneRange = selectionRange.cloneRange();
	cloneRange.selectNodeContents(selectionRange.startContainer);
	cloneRange.setStart(selectionRange.startContainer, selectionRange.startOffset);
	cloneRange.setEnd(selectionRange.startContainer, selectionRange.startOffset);

	const rect = cloneRange.getBoundingClientRect();
	const selectionString = selectionRange.toString();
	const element = selectionRange.commonAncestorContainer.parentElement;
	const contextText = selectionRange.commonAncestorContainer.textContent ?? selectionString;

	const beforeText = contextText.substring(0, selectionRange.startOffset);
	const afterText = contextText.substring(selectionRange.startOffset + selectionString.length);
	
	const beforeWords = beforeText.split(/\s+/).slice(-contextWordsCount);
	const afterWords = afterText.split(/\s+/).slice(0, contextWordsCount);

	const newBeforeString = beforeWords.join(' ');
	const newAfterString = afterWords.join(' ');
	
	data = {
		selectedText: selectionString,
		contextText: '...' + (newBeforeString + selectionString + newAfterString).trim() + '...',
		top: window.pageYOffset + rect.top,
		left: rect.left,
		element: element
	};

	return data;
}