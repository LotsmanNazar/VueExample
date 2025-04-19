<template>
	<transition name="fade">
		<div class="app-popup-wrapper app-no-selection-menu" v-if="popupsStore.isActive(props.popupName)">
			<div class="app-popup">
				<div class="app-popup-content-wrapper">
					<div class="app-popup-close-wrapper">
						<button type="button" class="app-popup-close" @click="popupsStore.close(props.popupName)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-license="https://fontawesome.com/license/free"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg></button>
					</div>
					<div class="app-popup-content">
						<slot></slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script setup lang="ts">
	import { defineProps } from 'vue';
	import { usePopupsStore } from '@/stores/popups.store';

	const props = defineProps({
		popupName: {
			type: String,
			required: true
		}
	});

	const popupsStore = usePopupsStore();
</script>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	.app-popup-wrapper {
		background-color: var(--black-transparent-1);
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		padding: 50px 20px;
	}

	.app-popup {
		background-color: var(--layout-color);
		position: relative;
		width: 600px;
		padding: 50px;
		margin: auto;
		border-radius: 15px;
	}

	.app-popup-close {
		background-color: transparent;
		padding: 0 10px;
		border: none;
		box-shadow: none;
		cursor: pointer;
	}

	.app-popup-close svg {
		display: block;
		width: 25px;
		height: 25px;
	}

	.app-popup-close-wrapper {
		position: absolute;
		right: 5px;
		top: 10px;
	}

	.app-popup-content *:first-child {
		margin-top: 0;
	}

	.app-popup-content *:last-child {
		margin-bottom: 0;
	}
</style>