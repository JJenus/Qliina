<script setup>
	import Header from "@/components/dashboard/Header.vue";
	import NavModal from "@/components/dashboard/NavModal.vue";
	import Footer from "@/components/Footer.vue";
	import IssueCard from "@/components/dashboard/issues/IssueCard.vue";

	const inputs = {
		search: "Bea",
	};
	const user = null;
	const search = {
		limit: 10,
		result: [],
	};
	const issues = [];

	function searchDB(limit, offset) {
		$("#btn-load-more").attr("data-kt-indicator", "on");
		$.ajax({
			url: base_url + "/search/issues",
			method: "POST",
			data: { limit: limit, offset: offset, q: this.inputs.search },
			success: (res) => {
				console.log(res);
				if (offset == 0) {
					this.issues = [];
				}
				this.search.result = res;
				this.issues.push(...res);
			},
			error: (err) => {
				console.log(err);
			},
		}).always(() => {
			$("#btn-load-more").attr("data-kt-indicator", null);
		});
	}

	function loadIssues() {
		$("#btn-load-more").attr("data-kt-indicator", "on");
		$.ajax({
			url: base_url + "/issues",
			method: "GET",
			success: (res) => {
				console.log(res);
				this.issues = res;
			},
			error: (err) => {
				console.log(err);
			},
		}).always(() => {
			$("#btn-load-more").attr("data-kt-indicator", null);
		});
	}

	function getUser() {
		$.ajax({
			url: `${base_url}/app/user`,
			method: "GET",
			success: (res) => {
				if (res.status) {
					console.log(res.data);
					this.user = res.data;
					this.loadIssues();
				}
			},
			error: (err) => {
				console.log(err);
			},
		});
	}
</script>

<template>
	<!--begin::Wrapper-->
	<div class="d-flex flex-column flex-row-fluid" id="kt_wrapper">
		<Header></Header>
		<!--begin::Main-->
		<div class="d-flex flex-column flex-column-fluid">
			<!--begin::toolbar-->
			<div class="toolbar" id="kt_toolbar">
				<div
					class="container d-flex flex-stack flex-wrap flex-sm-nowrap"
				>
					<!--begin::Info-->
					<div
						class="d-flex flex-column align-items-start justify-content-center flex-wrap me-1"
					>
						<!--begin::Title-->
						<h3 class="text-dark fw-bolder my-1">Issues</h3>
						<!--end::Title-->
						<!--begin::Breadcrumb-->
						<ul
							class="breadcrumb breadcrumb-line bg-transparent text-muted fw-bold p-0 my-1 fs-7"
						>
							<li class="breadcrumb-item">
								<a
									href="/app/main"
									class="text-muted text-hover-primary"
									>App</a
								>
							</li>
							<li class="breadcrumb-item">dashboard</li>
							<li class="breadcrumb-item text-dark">issues</li>
						</ul>
						<!--end::Breadcrumb-->
					</div>
					<!--end::Info-->
				</div>
			</div>
			<!--end::toolbar-->
			<!--begin::Content-->
			<div class="content fs-6 d-flex flex-column-fluid" id="kt_content">
				<!--begin::Container-->
				<div class="container">
					<div class="row justify-content-center">
						<!--begin::Form-->
						<form
							@submit.prevent="searchDB(search.limit, 0)"
							class="d-flex flex-center col-md-4 py-0 px-6 bg-white rounded"
						>
							<button
								type="submit"
								class="btn p-0 btn-sm btn-active-accent"
							>
								<!--begin::Svg Icon | path: icons/stockholm/General/Search.svg-->
								<span
									class="svg-icon svg-icon-1 svg-icon-primary"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										xmlns:xlink="http://www.w3.org/1999/xlink"
										width="24px"
										height="24px"
										viewBox="0 0 24 24"
										version="1.1"
									>
										<g
											stroke="none"
											stroke-width="1"
											fill="none"
											fill-rule="evenodd"
										>
											<rect
												x="0"
												y="0"
												width="24"
												height="24"
											/>
											<path
												d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"
												fill="#000000"
												fill-rule="nonzero"
												opacity="0.3"
											/>
											<path
												d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"
												fill="#000000"
												fill-rule="nonzero"
											/>
										</g>
									</svg>
								</span>
								<!--end::Svg Icon-->
							</button>
							<input
								id="search"
								v-model="inputs.search"
								type="text"
								class="form-control search border-0 fw-bold ps-2 w-xxl-350px"
								placeholder="Search issues by id or client name"
							/>
						</form>
						<!--end::Form-->
					</div>
					<!--begin::Row-->
					<div class="row p-10 g-0 g-xl-5 g-xxl-8">
						<issueCard
							v-for="issue in issues"
							:user="user"
							:issue="issue"
						></issueCard>
					</div>
					<!--end::Row-->
					<div v-if="search.result.length === search.limit" class="">
						<button
							id="btn-load-more"
							@click="searchDB(search.limit, issues.length)"
							class="btn btn-sm btn-primary"
						>
							<span class="indicator-label"> load more... </span>
							<span class="indicator-progress">
								Please wait...
								<span
									class="spinner-border spinner-border-sm align-middle ms-2"
								></span>
							</span>
						</button>
					</div>
					<!--begin::Modals-->
					<NavModal></NavModal>
					<!--end::Modals-->
				</div>
				<!--end::Container-->
			</div>
			<!--end::Content-->
		</div>
		<!--end::Main-->
		<Footer></Footer>
	</div>
	<!--end::Wrapper-->
</template>
