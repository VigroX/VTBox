<script setup>
const props = defineProps({
	x: {
		type: Number,
		default: 0,
	},
	y: {
		type: Number,
		default: 0,
	},
	preventDefault: {
		type: Boolean,
		default: true,
	},
	notOutside: {
		type: Boolean,
		default: true,
	},
})

const emits = defineEmits(['move', 'end', 'start'])

const el = ref(null)
const handle = ref(null)

function checkIfOutside(value) {
	if (!props.notOutside) return value;

	const output = value;
	if (x.value < 0)
		output.x = 0
	if (y.value < 0)
		output.y = 0
	
	const width = window.innerWidth - el.value.offsetWidth;
	const height = window.innerHeight - el.value.offsetHeight;
	if (x.value > width)
		output.x = width
	if (y.value > height)
		output.y = height

	return output
}

const { x, y, style } = useDraggable(el, {
	initialValue: { x: props.x, y: props.y },
	preventDefault: props.preventDefault,
	handle: handle,
	onMove: (value) => emits('move', value),
	onEnd: (value) => emits('end', checkIfOutside(value)),
	onStart: (value) => emits('start', value),
})

onMounted(() => {
	window.addEventListener('resize', () => checkIfOutside({ x: x.value, y: y.value }))
})
</script>

<template>
	<div ref="el" :style="style">
		<slot :set-ref="ref => handle = ref" :x="x" :y="y" />
	</div>
</template>