<template>
	<button :class="$style.btn"><slot /></button>
</template>

<style module>
.btn {
	padding: 20px;
	cursor: pointer;
}
</style>
