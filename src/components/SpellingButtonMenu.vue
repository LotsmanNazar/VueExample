<template>
	<SelectionMenuButton text="Здесь ошибка" v-on:click-event="spellingButtonClick">
		<template #icon>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-license="https://fontawesome.com/license/free"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>
		</template>
	</SelectionMenuButton>
</template>

<script setup lang="ts">
	import SelectionMenuButton from '@/components/SelectionMenuButton.vue';
	import { usePopupsStore } from '@/stores/popups.store';

	const popupsStore = usePopupsStore();
	
	const spellingButtonClick = () => {
		popupsStore.open('spelling');
	}
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

	.app-spelling-error-context {
		margin-bottom: 20px;
	}
	
	.app-spelling-form-submit {
		width: 100%;
	}

	.app-spelling-form-submit-wrapper {
		position: relative;
	}

	.app-spelling-form-submit-wrapper svg {
		position: absolute;
		top: calc(50% - 8px);
		right: 20px;
		width: 16px;
		height: 16px;
		animation: rotate 0.5s linear infinite;
	}

	.app-spelling-form-submit-wrapper svg path {
		fill: var(--primary-text-color);
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>