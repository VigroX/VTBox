export const storeCounter = createGlobalState(() => {
	const count = useStorage('count', 0)
	const doubleCount = computed(() => count.value * 2)
	function increment() {
		count.value++
	}

	return { count, doubleCount, increment }
})
