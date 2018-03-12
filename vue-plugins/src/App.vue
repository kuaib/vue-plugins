<template>
	<div>
		<transition name="router-fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
	export default({
		name: 'app'
	})
</script>
<style lang="scss">
	@import './assets/css/common';
	.router-fade-enter-active {
    	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
		opacity: 0;
	}
</style>
