<template>
	<div class="app-selection-menu-wrapper" ref="menu" v-show="menuData.visible" :style="{top: menuData.y + 'px', left: menuData.x + 'px'}">
		<div class="app-selection-menu">
			<div class="app-selection-menu-items">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, reactive, watch, nextTick, defineProps, PropType } from 'vue';
	import { useSelectionStore } from '@/stores/selection.store';

	const props = defineProps({
		excludes: {
			type: Array as PropType<Array<string>>,
			default: () => []
		}
	})

	const selectionStore = useSelectionStore();
	const menu = ref<HTMLElement | null>(null);
	const menuData = reactive({
		visible: false,
		x: 0,
		y: 0
	});

	const updatePosition = () => {
		menuData.visible = selectionStore.data.top && selectionStore.data.left ? true : false;
		nextTick(() => {
			if ( !menu.value ) {
				return;
			}

			let x = selectionStore.data.left - menu.value.offsetWidth / 2;
			x = ( x > 0 ) ? x : 0;

			let y = selectionStore.data.top - menu.value.offsetHeight;

			menuData.x = x;
			menuData.y = y;
		});
	};

	watch(
		() => {
			return {
				top: selectionStore.data.top,
				left: selectionStore.data.left
			}
		},

		() => {
			const excludeElement = props.excludes.find((item) => {
				if ( selectionStore.data.element?.classList.contains(item) ) {
					return true;
				}
			});

			if ( excludeElement ) {
				return;
			}
			
			updatePosition();
		}
	);
</script>

<style>
	.app-selection-menu-wrapper {
		position: absolute;
		user-select: none;
	}

	.app-selection-menu-items {
		background-color: var(--layout-color);
		display: flex;
		border-radius: 10px;
		box-shadow: 0 0 5px 0 var(--black-transparent-1);
	}
</style>