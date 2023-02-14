<script setup>
const useCounter = storeCounter()
const store = useStorage('draggable', { x: 0, y: 0 })
const isDark = useDark({
	storageKey: 'theme',
})
const toggleDark = useToggle(isDark)

function onEnd(value) {
	store.value = value;
}
</script>

<template>
	<div class="about">
		<h1>This is an about page</h1>
		<p>Dark mode: {{ isDark }}</p>
		<BaseButton @click="toggleDark()">Toggle dark mode</BaseButton>
		<p>{{ useCounter.count }} / {{ useCounter.doubleCount }}</p>
		<BaseButton @click="useCounter.increment">Increment</BaseButton>
	</div>
	<div :style="$style.dragcontainer">
		<DragBox v-bind="store" :class="$style.dragbox" @end="onEnd" v-slot="{ setRef }">
			<div :ref="setRef" :class="$style.draggable"></div>
			<p>This is a test</p>
		</DragBox>
	</div>
</template>

<style module>
.dragcontainer {
	position: relative;
}

.draggable {
	background-color: var(--color-border);
	padding: 10px;
	border-radius: 50%;
	margin-left: 10px;
	cursor: move;
}

.dragbox {
	padding: 10px;
	display: flex;
	flex-direction: row-reverse;
	background-color: var(--color-background-mute);
	position: fixed;
	border: 1px solid #111;
	transition: border 0.2s ease;
	border-radius: 0;
}
</style>