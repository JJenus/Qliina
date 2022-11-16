<script setup>
	import Header from "@/components/app/Header.vue";
	import Footer from "@/components/Footer.vue";
	import { ref } from "vue";

	// Components
	import SaveExpensesModal from "@/components/app/main/SaveExpensesModal.vue";
	import Order from "@/components/app/main/Order.vue";
	import SideBar from "@/components/app/laundry/SideBar.vue";
	import Nav from "@/components/app/Nav.vue";
	import LaundryCard from "@/components/app/laundry/LaundryCard.vue";

	// Variables

	const search = ref({
		limit: 10,
		result: [],
	});
	const inputs = {
		search: "Bea",
	};
	const clothes = [];
	const user = {};

	const customers = ref([]);
	const expenses = ref([]);
	const activitiesToday = ref([]);

	function toTime($date) {
		return moment($date, "YYYY-MM-DD HH:mm:ss").format("hh:mm a");
	}

	function getUser() {
		$.ajax({
			url: `${base_url}/app/user`,
			method: "GET",
			success: (res) => {
				if (res.status) {
					this.user = res.data;
				}
			},
			error: (err) => {
				console.log(err);
			},
		});
	}

	function searchDB(limit, offset) {
		$("#form-search-btn").attr("data-kt-indicator", "on");
		$.ajax({
			url: `${base_url}/search/clothes`,
			method: "POST",
			data: { limit: limit, offset: offset, q: this.inputs.search },
			success: (res) => {
				//console.log(res);
				if (offset == 0) {
					this.clothes = [];
				}
				this.search.result = res;
				this.clothes.push(...res);
			},
			error: (err) => {
				console.log(err);
			},
		}).always(() => {
			$("#form-search-btn").attr("data-kt-indicator", null);
		});
	}
	//supposed computed properties

	function totalExpenses() {
		if (expenses.value.length === 0) {
			return 0;
		}
		return expenses.value.reduce((p, c) => {
			return p + Number(c.cost);
		}, 0);
	}

	function totalIncome() {
		if (activitiesToday.value.length === 0) {
			return 0;
		}
		return activitiesToday.value.reduce((p, c) => {
			return p + Number(c.amount_paid);
		}, 0);
	}

	// Supposed methods

	function loadExpenses() {
		$.ajax({
			url: base_url + "/expenses/range",
			method: "GET",
			data: { range: "today" },
			success: (res) => {
				//console.log("loaded");
				//console.log(res);
				expenses.value = res;
			},
			error: (err) => {
				console.log(err);
			},
		});
	}

	function getTodaysCustomers() {
		$.ajax({
			url: base_url + "/customers/range",
			method: "GET",
			data: { range: "today" },
			success: (res) => {
				//console.log(res);
				activitiesToday.value = res;
			},
			error: (err) => {
				console.log(err);
			},
		});
	}
</script>

<template>
	<SaveExpensesModal></SaveExpensesModal>

	<div class="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
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
						<h3 class="text-dark fw-bolder my-4">
							Hi, {{ "user.name " }}
						</h3>
						<!--end::Title-->
					</div>
					<!--end::Info-->
					<Nav></Nav>
				</div>
			</div>
			<!--end::toolbar-->
			<!--begin::Content-->
			<div class="content fs-6 d-flex flex-column-fluid" id="kt_content">
				<!--begin::Container-->
				<div class="container">
					<!--begin::Card-->
					<div class="card">
						<div class="card-body">
							<!--begin::Engage Widget 1-->
							<div class="card mb-12">
								<div
									class="card-body card-rounded p-0 d-flex bg-light-primary"
								>
									<div
										class="d-flex flex-column flex-lg-row-auto p-10 p-md-20"
									>
										<h1 class="fw-bolder text-dark">
											Search for laundry ID
										</h1>
										<div class="fs-3 mb-8"></div>
										<!--begin::Form-->
										<form
											@submit.prevent="
												searchDB(search.limit, 0)
											"
											class="d-flex flex-center py-2 px-6 bg-white rounded"
										>
											<button
												id="form-search-btn"
												type="submit"
												class="btn btn-sm btn-active-accent"
											>
												<!--begin::Svg Icon | path: icons/stockholm/General/Search.svg-->
												<span
													class="indicator-label svg-icon svg-icon-1 svg-icon-primary"
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
												<span
													class="indicator-progress"
												>
													<span
														class="spinner-border spinner-border-sm align-middle ms-2"
													></span>
												</span>
												<!--end::Svg Icon-->
											</button>
											<input
												id="search"
												v-model="inputs.search"
												type="text"
												class="form-control search border-0 fw-bold ps-2 w-xxl-350px"
												placeholder="Search orders"
											/>
										</form>
										<!--end::Form-->
									</div>
									<div
										class="d-none d-md-flex flex-row-fluid mw-400px ml-auto bgi-no-repeat bgi-position-y-center bgi-position-x-left bgi-size-cover"
										style="
											background-image: url(assets/media/svg/illustrations/progress.svg);
										"
									></div>
								</div>
							</div>
							<!--end::Engage Widget 1-->

							<!--begin::Section-->
							<div class="row g-5 g-xxl-8 mb-5">
								<!--v-for search-->
								<LaundryCard
									v-for="clothe in clothes"
									:clothe="clothe"
									:permissions="user.permissions"
								></LaundryCard>
							</div>
							<div
								v-if="search.result.length === search.limit"
								class=""
							>
								<button
									@click="
										searchDB(search.limit, customers.length)
									"
									class="btn btn-primary"
								>
									load more
								</button>
							</div>
							<!--end::Section-->
						</div>
					</div>
					<!--end::Card-->
				</div>
				<!--end::Container-->
			</div>
			<!--end::Content-->
		</div>
		<!--end::Main-->
		<Footer></Footer>
	</div>
	<!--end::Wrapper-->

	<SideBar></SideBar>
	<!--end::Page-->
</template>
