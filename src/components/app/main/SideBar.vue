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
					<!--begin::New Product Form-->
					<div v-if="addLaundry" id="kt_sidebar_shop_new_form">
						<!--begin::Heading-->
						<div class="d-flex flex-column text-center mb-10">
							<h3 class="fs-2 fw-bolder mb-2">Add New Laundry</h3>
							<span class="text-muted fs-6 fw-bolder"
								>Carefully fill Details</span
							>
						</div>
						<!--end::Heading-->
						<!--begin::Form-->
						<form
							id="createCustomerForm"
							@submit.prevent="createCustomer()"
							class="form needs-validation"
							novalidate
							method="post"
						>
							<!--begin::Product Info-->
							<div class="mt-5 mb-5">
								<div class="mb-4 fw-bolder fs-3">
									Customer Info
								</div>
								<!--begin::Input-->
								<div class="mb-8">
									<label class="fw-bolder">Name</label>
									<input
										required
										name="name"
										type="text"
										class="form-control form-control-solid form-control-lg"
										placeholder=""
									/>
								</div>
								<div class="mb-8">
									<label class="fw-bolder"
										>Customer type</label
									>
									<input
										required
										name="type"
										type="text"
										class="form-control form-control-solid form-control-lg"
										value="Regular"
									/>
								</div>
								<div class="mb-10">
									<label class="fw-bolder"
										>Phone number</label
									>
									<input
										name="phone_number"
										type="text"
										class="form-control form-control-solid form-control-lg"
										placeholder=""
									/>
								</div>
								<div
									class="d-flex d-flex-row fw-bolder mb-5 fs-3"
								>
									<span>Clothes</span>
									<div
										v-if="createClothesForm.length === 0"
										class="ms-5"
									>
										<button
											@click="addClotheToForm()"
											class="btn btn-primary btn-sm"
										>
											<i class="bi bi-plus fs-1"></i>
											Add clothes
										</button>
									</div>
								</div>
								<LaundryForm
									v-for="(i, index) in createClothesForm"
									:index="index"
								></LaundryForm>
								<div
									v-if="createClothesForm.length > 0"
									class="row fs-5 mb-5 justify-content-between"
								>
									<div class="col-3">Total</div>
									<div class="col-5 text-right">
										<input
											type="text"
											name="total_cost"
											class="form-control text-center form-control-solid"
											:value="totalCost"
										/>
									</div>
								</div>

								<div
									v-if="createClothesForm.length > 0"
									class="mb-8"
								>
									<button
										type="button"
										@click="addClotheToForm()"
										class="btn btn-icon me-5 btn-light-primary btn-sm"
									>
										<i class="bi bi-plus fs-1"></i>
									</button>
									<button
										type="button"
										@click="deleteLast()"
										class="btn btn-danger btn-sm"
									>
										<i class="bi bi-trash fs-1"></i>
										delete last
									</button>
								</div>

								<div class="mb-4 fw-bolder fs-3">
									Payment Info
								</div>
								<div class="mb-5">
									<div class="table-responsive">
										<table class="table table-hover">
											<tr>
												<td>Amount paid:</td>
												<td>
													<div>
														<input
															required
															name="amount_paid"
															type="number"
															class="form-control form-control-sm"
														/>
													</div>
												</td>
											</tr>
											<tr>
												<td>Debt:</td>
												<td>
													<div>
														<input
															required
															value="0.00"
															name="debt"
															type="number"
															class="form-control form-control-sm"
														/>
													</div>
												</td>
											</tr>
											<tr>
												<td>Change:</td>
												<td>
													<div>
														<input
															required
															value="0.00"
															name="credit"
															type="number"
															class="form-control form-control-sm"
														/>
													</div>
												</td>
											</tr>
										</table>
									</div>
								</div>

								<button
									type="submit"
									id="create-customer-form-btn"
									class="btn btn-primary fw-bolder me-2 px-8"
								>
									<span class="indicator-label"> Save </span>
									<span class="indicator-progress">
										Please wait...
										<span
											class="spinner-border spinner-border-sm align-middle ms-2"
										></span>
									</span>
								</button>
								<button
									type="reset"
									@click="addLaundry = !addLaundry"
									class="btn btn-color-gray-600 btn-active-light-primary fw-bolder px-8"
								>
									Discard
								</button>
								<!--end::Input-->
							</div>
							<!--end::Product Info-->
						</form>
						<!--end::Form-->
					</div>
					<!--end::New Product Form-->

					<!--begin::Products Filter Form-->
					<div v-else id="kt_sidebar_shop_filter_form">
						<!--begin::Heading-->
						<div
							class="d-flex flex-column text-center bg-light rounded py-8 px-5 mb-10"
						>
							<h3 class="fs-2 fw-bolder mb-2">
								{{ "Hi, Maria" }}
							</h3>
							<span class="text-muted fs-6 fw-bolder"
								>Make it Qliina</span
							>
							<div
								class="d-flex align-items-center d-flex-row justify-content-between"
							>
								<button
									@click="addLaundry = !addLaundry"
									class="btn btn-primary btn-sm me-3 fw-bolder mx-auto px-5 mt-6"
								>
									Add laundry
								</button>
								<button
									data-bs-toggle="modal"
									data-bs-target="#kt_modal_expenses"
									id="kt_sidebar_add_expense_form_btn"
									class="btn btn-primary btn-sm fw-bolder mx-auto px-5 mt-6"
								>
									Add Expenses
								</button>
							</div>
						</div>
						<!--end::Heading-->

						<!--begin::Activities Table-->
						<div class="mb-13">
							<div class="text-dark fw-bolder fs-6 mb-5">
								Today's Activities
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
												<div>Income</div>
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
												<div>Expenses</div>
												<span>
													{{ totalExpenses }}
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
													class="bi fs-1 bi-cash-stack"
												></i>
												<div>
													<span
														v-if="
															totalIncome >=
															totalExpenses
														"
													>
														Profit
													</span>
													<span
														v-if="
															totalIncome <
															totalExpenses
														"
													>
														Loss
													</span>
												</div>
												<span
													:class="
														totalIncome >=
														totalExpenses
															? 'text-success'
															: 'text-danger'
													"
												>
													{{
														totalIncome -
														totalExpenses
													}}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>

							<ul
								class="nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6"
							>
								<li class="nav-item">
									<a
										class="nav-link active"
										data-bs-toggle="tab"
										href="#customers-today"
										>Customers</a
									>
								</li>
								<li class="nav-item">
									<a
										class="nav-link"
										data-bs-toggle="tab"
										href="#expenses"
										>Expenses</a
									>
								</li>
							</ul>
							<div class="tab-content">
								<div
									id="customers-today"
									class="tab-pane fade show active"
								>
									<div class="table-responsive">
										<table
											class="table table-hover gs-4 gy-4 gx-4"
										>
											<thead>
												<tr
													class="fw-bold fs-6 text-gray-800 border-bottom border-gray-200"
												>
													<th>Name</th>
													<th>id</th>
													<th>status</th>
													<th>cost</th>
													<th>paid</th>
													<th>time</th>
												</tr>
											</thead>
											<tbody>
												<tr
													v-for="customer in activitiesToday"
												>
													<td>
														{{ customer.name }}
													</td>
													<td>
														{{ customer.id }}
													</td>
													<td>
														<div>
															<span
																:class="
																	customer.status ==
																	'dispensed'
																		? 'badge-light-success'
																		: 'badge-light-warning'
																"
																class="badge badge-lg"
															>
																{{
																	customer.status
																}}
															</span>
														</div>
													</td>
													<td class="">
														{{
															customer.total_cost
														}}
													</td>
													<td>
														{{
															customer.amount_paid
														}}
													</td>
													<td>
														{{
															toTime(
																customer
																	.updated_at
																	.date
															)
														}}
													</td>
												</tr>
												<tr class="fw-bolder fs-5">
													<td></td>
													<td></td>
													<td>
														<span>Total</span>
													</td>
													<td></td>
													<td class="">
														{{ totalIncome }}
													</td>
													<td></td>
												</tr>
											</tbody>
											<tfoot>
												<tr
													class="fw-bold d-none fs-6 text-gray-800 border-bottom border-gray-200"
												>
													<th>Name</th>
													<th>id</th>
													<th>status</th>
													<th>cost</th>
													<th>paid</th>
													<th>time</th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>
								<div id="expenses" class="tab-pane fade">
									<!-- DAILY EXPENSES TABLE -->
									<div class="table-responsive">
										<table
											class="table table-hover gs-4 gy-4 gx-4"
										>
											<thead>
												<tr
													class="fw-bold fs-6 text-gray-800 border-bottom border-gray-200"
												>
													<th>#</th>
													<th>title</th>
													<th>description</th>
													<th>amount</th>
													<th>time</th>
												</tr>
											</thead>
											<tbody>
												<tr
													v-for="(
														expense, i
													) in expenses"
												>
													<td>{{ 1 + i }}</td>
													<td>
														{{ expense.name }}
													</td>
													<td>
														{{
															expense.description
														}}
													</td>
													<td>
														{{ expense.cost }}
													</td>
													<td>
														{{
															toTime(
																expense.created_at
															)
														}}
													</td>
												</tr>
												<tr class="fw-bolder fs-5">
													<td></td>
													<td></td>
													<td>
														<span>Total</span>
													</td>
													<td>
														{{ totalExpenses }}
													</td>
													<td></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
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
