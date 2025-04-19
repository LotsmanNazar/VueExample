<template>
	<button class="app-selection-menu-button" type="button" @click="click($event)">
		<slot name="icon"></slot>
		<span>{{ text }}</span>
	</button>
</template>

<script setup lang="ts">
	import { defineProps, defineEmits } from 'vue';

	const props = defineProps({
		text: {
			type: String,
			required: true
		}
	});

	const emit = defineEmits(['clickEvent']);
	const click = (e: MouseEvent) => {
		emit('clickEvent', e);
	}
</script>

<style>
	.app-selection-menu-button {
		background-color: transparent;
		display: flex;
		align-items: center;
		position: relative;
		padding: 10px;
		margin: 0 15px;
		border: none;
		outline: none;
		box-shadow: none;
		cursor: pointer;
		user-select: none;
	}

	.app-selection-menu-button:first-child {
		margin-left: 0;
	}

	.app-selection-menu-button:last-child {
		margin-right: 0;
	}

	.app-selection-menu-button:not(:last-child):before {
		content: '';
		background-color: var(--text-color);
		position: absolute;
		top: 0;
		right: -15px;
		width: 1px;
		height: 100%;
	}

	.app-selection-menu-button svg {
		width: 15px;
		height: 15px;
		margin-right: 8px;
	}

	.app-selection-menu-button svg path {
		fill: var(--text-color);
	}
</style>