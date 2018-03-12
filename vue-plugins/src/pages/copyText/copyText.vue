<template>
	<div>
		<div id="adminUrl">http://www.baicu.com</div>
		<div class="btnCopy" data-clipboard-action="copy" data-clipboard-target="#adminUrl">点击复制</div>
	</div>
</template>
<script>
	import Clipboard from 'Clipboard'
	export default({
		data() {
			return {}
		},
		mounted() {
			let clipboard = new Clipboard('.btnCopy');
		    clipboard.on('success', (e) => {
		        console.log('复制成功')
		    });
		    clipboard.on('error', (e) => {
		        console.log('复制失败')
		    });
		}
	})
</script>