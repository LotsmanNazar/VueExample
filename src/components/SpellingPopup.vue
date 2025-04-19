<template>
	<PopupWindow :popupName="popupName">
		<div class="app-spelling-popup-content">
			<h2 class="app-spelling-popup-title">Вы нашли здесь ошибку?</h2>
			<div class="app-spelling-error-context">
				<p>{{ contextText }}</p>
			</div>
			<form class="app-spelling-form" ref="form" @submit="submit($event)">
				<input class="app-spelling-form-field" type="text" ref="field" placeholder="Как должно быть"/>
				<div class="app-spelling-form-submit-wrapper">
					<button class="app-spelling-form-submit app-button-primary" type="submit">Отправить</button>
					<transition name="fade">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-license="https://fontawesome.com/license/free" v-if="request"><path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z"/></svg>
					</transition>
				</div>
			</form>
		</div>
	</PopupWindow>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue';
	import PopupWindow from '@/components/PopupWindow.vue';
	import { usePopupsStore } from '@/stores/popups.store';
	import { useSelectionStore } from '@/stores/selection.store';
	import { postRequest } from '@/utils/postRequest';

	const popupName = 'spelling';
	const popupsStore = usePopupsStore();
	const selectionStore = useSelectionStore();
	const contextText = ref<string>('');
	const field = ref<HTMLInputElement | null>(null);
	const request = ref<boolean>(false);
	
	const submit = async (e: Event) => {
		e.preventDefault();

		if ( request.value || !field.value ) {
			return;
		}

		request.value = true;

		const formData = new FormData();
		await postRequest('', formData);

		request.value = false;

		popupsStore.close(popupName);
	}

	watch(
		() => {
			return {
				active: popupsStore.active
			}
		},

		() => {
			if ( popupsStore.isActive(popupName) ) {
				contextText.value = selectionStore.data.contextText;
			}
		}
	);
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