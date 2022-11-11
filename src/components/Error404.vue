<script setup lang="ts">
	const env = import.meta.env;
	console.log("Base: "+env.VITE_BASE_URL);
</script>

<template>
	<div class="d-flex flex-column flex-root vh-100">
		<!--begin::Error-->
		<div
			class="d-flex flex-column flex-column-fluid position-relative"
			style="background-color: #eaf9fc"
		>
			<!--begin::Background-->
			<div
				class="bgi-size-contain bgi-position-x-end bgi-position-y-center bgi-no-repeat position-absolute top-0 start-0 w-100 h-100 d-none d-lg-block"
				:style="`background-image: url(${env.VITE_BASE_URL}/assets/media/svg/illustrations/404.svg);`"
			></div>
			<div
				class="bgi-size-contain bgi-position-y-bottom bgi-position-x-end bgi-no-repeat position-absolute top-0 start-0 w-100 h-100 d-lg-none"
				:style="`background-image: url(${env.VITE_BASE_URL}/assets/media/svg/illustrations/phone404.svg);`"
			></div>
			<!--end::Background-->
			<!--begin::Content-->
			<div class="px-10 px-md-20 pt-10 pt-md-14 z-index-1">
				<a href="/">
					<img
						alt="Logo"
						src="/assets/media/logos/logo-default.svg"
						class="h-75px"
					/>
				</a>
			</div>
			<div
				class="px-10 px-md-20 py-10 py-md-0 d-flex flex-column justify-content-md-center align-items-start flex-root w-md-700px z-index-1"
			>
				<p class="display-6 fw-bolder text-gray-800 mb-8">
					Something went wrong...
				</p>
				<p class="fs-6 mb-8">
					Mostly an unvailable page. Please report to support for
					other issues.
				</p>
				<a
					href="/"
					class="btn btn-primary fs-6 fw-bolder py-4 px-6 me-auto"
					>Return to main</a
				>
			</div>
			<!--end::Content-->
		</div>
		<!--end::Error-->
	</div>
</template>
