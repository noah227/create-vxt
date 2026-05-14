<script setup lang="ts">
console.log("This is popup!")
</script>

<template>
	<div id="popup">
		<img src="/images/icon-48.png" alt="icon-48">
		<strong>This is popup!</strong>
	</div>
</template>

<style>
#app {
	width: fit-content;
}
</style>
<style lang="scss" scoped>
// sass already supported
#popup {
	display: flex;
	flex-direction: column;
	align-items: center;
	> strong {
		color: darkcyan;
		white-space: nowrap;
	}
}
</style>
