<template>
	<div class="app-container">
		<div class="app-row">
			<div class="app-col">
				<div class="app-content">
					<h1>Пример Vue компонентов</h1>
					<p>В этом примере можно увидеть работу компонентов Selection Menu, Popup с использованием Pinia. Задача компонентов предоставить интерфейс для сообщения об ошибке в тексте. При выделении текста появится меню с действиями. Нажмите на кнопку "здесь ошибка", чтобы вызвать всплывающее окно. Во всплывающем окне будет отображён контекст текста с ошибкой и форма для отправки сообщения.</p>
					<p class="app-no-selection-menu">В компонентах есть некоторая логика, например, в этом параграфе контекстное меню появляться не будет.</p>
					<p>Код на <a href="https://github.com/LotsmanNazar/VueExample" target="_blank">github</a></p>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.</p>
				</div>
			</div>
		</div>
	</div>
	<SelectionMenu :excludes="excludesMenu">
		<SpellingButtonMenu/>
	</SelectionMenu>

	<SpellingPopup/>
</template>

<script setup lang="ts">
	import { onMounted, onUnmounted, watch } from 'vue';
	import SelectionMenu from '@/components/SelectionMenu.vue';
	import SpellingButtonMenu from '@/components/SpellingButtonMenu.vue';
	import SpellingPopup from '@/components/SpellingPopup.vue';
	import { usePopupsStore } from '@/stores/popups.store';
	import { useSelectionStore } from '@/stores/selection.store';
	import { selectionData } from '@/utils/selectionData';

	const popupsStore = usePopupsStore();
	const selectionStore = useSelectionStore();
	const excludesMenu = ['app-no-selection-menu'];

	const updateSelection = () => {
		selectionStore.setData(selectionData());
	}

	const closePopups = (e: KeyboardEvent) => {
		if ( e.key== 'Escape' ) {
			popupsStore.closeAll();
		}
	}

	watch(
		() => {
			return popupsStore.active;
		},

		() => {
			document.body.classList.toggle('app-overflow-hidden', popupsStore.active ? true : false);
		}
	);

	onMounted(() => {
		document.addEventListener('selectionchange', updateSelection);
		document.addEventListener('keyup', closePopups);
	});

	onUnmounted(() => {
		document.removeEventListener('selectionchange', updateSelection);
		document.removeEventListener('keyup', closePopups);
	});
</script>