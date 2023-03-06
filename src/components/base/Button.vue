<template>
	<button :class="$style.btn"><slot /></button>
</template>

<style module>
.btn {
	padding: 12px;
	cursor: pointer;
	transition: background-color 0.2s ease;
}

.btn:hover {
	background-color: var(--color-background-mute);
}
</style>
