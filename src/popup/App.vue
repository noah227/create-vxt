<script setup lang="ts">
console.log("This is popup!")
</script>

<template>
	<div id="popup">
		<strong>This is popup!</strong>
	</div>
</template>

<style lang="scss" scoped>
// sass already supported
#popup {
	> strong {
		color: darkcyan;
	}
}
</style>
