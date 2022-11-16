<script setup>
	import { ref } from "vue";
	import LaundryForm from "@/components/app/main/Laundry.vue";

	let totalCost = 0;
	let totalExpenses = 0;
	let totalIncome = 0;
	const createClothesForm = [];
	const addLaundry = ref(false);

	function deleteLast() {
		createClothesForm.pop();
		calCost();
	}

	function calCost() {
		totalCost = createClothesForm.reduce((p, c, i) => {
			return p + c.cost;
		}, 0);
	}

	function addClotheToForm() {
		let obj = {
			cost: 0,
		};
		createClothesForm.push(obj);
	}

	function createCustomer() {
		let form = $("#createCustomerForm");
		if (!form[0].checkValidity()) {
			return;
		}
		$("#create-customer-form-btn").attr("data-kt-indicator", "on");
		$("#create-customer-form-btn").attr("disabled", "disabled");
		$.ajax({
			url: base_url + "/customers",
			method: "POST",
			data: form.serializeArray(),
			success: (res) => {
				//console.log(res);
				if (res.status) {
					notify("success", "Saved");
					activitiesToday.push(res.data);
					form.removeClass("was-validated");
					form[0].reset();
					return true;
				}
				notify("error", "Error occured!");
			},
			error: (err) => {
				console.log(err);
			},
		}).always(() => {
			$("#create-customer-form-btn").attr("data-kt-indicator", null);
			$("#create-customer-form-btn").attr("disabled", null);
		});
	}

	function toTime($date) {
		return moment($date, "YYYY-MM-DD HH:mm:ss").format("hh:mm a");
	}
</script>

<template>
	<!--begin::Sidebar-->
	<div
		id="kt_sidebar"
		class="sidebar bg-white"
		data-kt-drawer="true"
		data-kt-drawer-name="sidebar"
		data-kt-drawer-activate="{default: true, lg: false}"
		data-kt-drawer-overlay="true"
		data-kt-drawer-width="{default:'200px', '350px': '300px'}"
		data-kt-drawer-direction="end"
		data-kt-drawer-toggle="#kt_sidebar_toggler"
	>
		<!--begin::Sidebar Content-->
		<div class="d-flex flex-column sidebar-body">
			<div id="kt_sidebar_content" class="py-10 px-7 px-lg-12">
				<div
					class="hover-scroll-y me-lg-n7 pe-lg-5"
					data-kt-scroll="true"
					data-kt-scroll-height="auto"
					data-kt-scroll-offset="0px"
					data-kt-scroll-wrappers="#kt_sidebar_content"
				>
					

					<!--begin::Products Filter Form-->
					<div id="kt_sidebar_shop_filter_form">
						<!--begin::Heading-->
						<div
							class="d-flex flex-column text-center bg-light rounded py-8 px-5 mb-10"
						>
							<h3 class="fs-2 fw-bolder mb-2">
								{{ "Good morning, Maria" }}
							</h3>
							<span class="text-muted fs-6 fw-bolder"
								>Make it Qliina</span
							>
						</div>
						<!--end::Heading-->

						<!--begin::Activities Table-->
						<div class="mb-13">
							<div class="text-dark fw-bolder fs-6 mb-5">
								Today's Report
							</div>

							<div class="row mb-5">
								<div class="col-4">
									<div class="card">
										<div
											class="card-body p-3 card-rounded bg-light-success"
										>
											<div
												class="d-flex fw-bolder justify-content-center align-items-center flex-column"
											>
												<i
													class="fas fs-1 fa-tshirt"
												></i>
												<div>Washed</div>
												<span>
													{{ totalIncome }}
												</span>
											</div>
										</div>
									</div>
								</div>

								<div class="col-4">
									<div class="card">
										<div
											class="card-body p-3 card-rounded bg-light-success"
										>
											<div
												class="d-flex fw-bolder justify-content-center align-items-center flex-column"
											>
												<i
													class="bi bi-check2-square fs-1"
												></i>
												<div>Ironed</div>
												<span>
													{{ totalExpenses }}
												</span>
											</div>
										</div>
									</div>
								</div>

							</div>

							<div class="d-flex text-muted justify-content-center">
								laundry - action
							</div>
						</div>
						<!--end::Activities Table -->
					</div>
					<!--end::Products Filter Form-->
				</div>
			</div>
		</div>
		<!--end::Sidebar Content-->
	</div>
	<!--end::Sidebar-->
</template>
