<script setup lang="ts">
	import { RouterLink, RouterView } from "vue-router";
</script>

<template>
	<!--begin::Main-->
	<!--begin::Root-->
	<div id="app" class="d-flex flex-column flex-root">
		<!--begin::Page-->
		<div class="page d-flex flex-row flex-column-fluid">
			<!--begin::Wrapper-->
			<RouterView />
		</div>
		<!--end::Page-->
	</div>
	<!--end::Root-->
</template>
