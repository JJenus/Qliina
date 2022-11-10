<script setup>
	const actions = {
		showDetails: false,
		pay: false,
	};
	const inputs = {
		amount_paid: null,
		debt: null,
		credit: null,
	};
	const currency = "NGN";

	function cost() {
		return "$" + customer.total_cost;
	}

	function getStatusFlag() {
		return customer.status == "ready"
			? "badge-light-warning"
			: customer.status == "pending"
			? "badge-light-danger"
			: "badge-light-success";
	}

	function readyClothes() {
		var count = 0;
		for (let clothe of customer.clothes) {
			if (clothe.status === "ready" || clothe.status === "dispensed") {
				count++;
			}
		}
		return count;
	}

	function paid() {
		let truthy =
			Number(customer.amount_paid) >=
			Number(customer.total_cost);
		return truthy;
	}
	function date($date) {
		if (!$date) {
			return "unknown";
		}
		return moment($date, "YYYY-MM-DD HH:mm:ss").format("LLLL");
	}
	function money($cash) {
		$cash = $cash || "0.00";
		return currency + $cash;
	}
	function calibrate() {
		eventBus.$on("recalibrate-dispensed-" + customer.id, (data) => {
			console.log("receieved");
			console.log(data);

			let $return = true;
			customer.clothes[data.index] = data.clothe;
			for (let clothe of customer.clothes) {
				if (clothe.dispensed_at === null) {
					$return = false;
					break;
				}
			}
			if ($return) {
				console.log("calibrating...");
				dispense();
			}
		});
	}

	function dispense() {
		if (!paid) {
			notify("error", "Payment must be completed before dispensing");
			return false;
		}
		$("#modal-dispense-btn" + customer.id)[0].setAttribute(
			"data-kt-indicator",
			"on"
		);
		$.ajax({
			url: `${base_url}/customers/${customer.id}/dispense`,
			method: "GET",
			data: { id: customer.id },
			success: (res) => {
				console.log(res);
				if (res.status) {
					customer = res.data;
					notify("success", "Done");
				}
			},
			error: (err) => {
				console.log(err);
			},
		}).always(() => {
			$("#modal-dispense-btn" + customer.id)[0].removeAttribute(
				"data-kt-indicator"
			);
		});
	}
	//rename credit as change
	function makePayment() {
		$("#modal-makepayment-btn" + customer.id)[0].setAttribute(
			"data-kt-indicator",
			"on"
		);
		//inputs.amount_paid = Number(inputs.amount_paid) +Number(customer.amount_paid) ;
		$.ajax({
			url: `${base_url}/customers/${customer.id}/update`,
			method: "POST",
			data: inputs,
			success: (res) => {
				//console.log(res);
				if (res.status) {
					notify("success", "Saved");
					customer = res.data;
				}
			},
			error: (err) => {
				console.log(err);
			},
		}).always(() => {
			$("#modal-makepayment-btn" + customer.id)[0].removeAttribute(
				"data-kt-indicator"
			);
		});
	}
</script>

<template>
	<div class="col-md-4 col-xxl-4">
		<div class="modal fade" tabindex="-1" :id="'kt_modal_' + customer.id">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content shadow-none">
					<div class="modal-header">
						<div class="d-flex justify-content-between flex-column">
							<h5 class="modal-title fs-2x">
								{{ customer.name }}
							</h5>
							<div class="">
								<span
									:class="getStatusFlag"
									class="badge badge-lg"
								>
									{{ customer.status }}
								</span>
							</div>
						</div>

						<!--begin::Close-->
						<div
							class="btn btn-icon btn-sm btn-active-light-danger ms-2"
							data-bs-dismiss="modal"
							aria-label="Close"
						>
							<span class="fas fa-times text-danger fs-5"></span>
						</div>
						<!--end::Close-->
					</div>

					<div class="modal-body">
						<div class="row mb-5">
							<div class="col-4">
								<div class="card">
									<div
										class="card-body p-3 card-rounded bg-light-success"
									>
										<div
											class="d-flex fw-bolder justify-content-center align-items-center flex-column"
										>
											<div>
												<i
													class="fas fs-5 fa-tshirt"
												></i>
												Clothes
											</div>
											<span>
												{{ customer.clothes.length }}
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
											<div>
												<i
													class="bi bi-check2-square fs-5"
												></i>
												Ready
											</div>
											<span>
												{{ readyClothes }}
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
											<div>
												<i
													class="bi fs-5 bi-cash-stack"
												></i>
												Cost
											</div>
											<span>
												{{ cost }}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="table-responsive mb-10">
							<table class="table table-hover">
								<tr>
									<td>Amount paid:</td>
									<td v-if="!actions.pay">
										{{ money(customer.amount_paid) }}
									</td>
									<td v-else>
										<div>
											<input
												type="number"
												v-model="inputs.amount_paid"
												class="form-control form-control-sm"
											/>
										</div>
									</td>
								</tr>
								<tr>
									<td>Debt:</td>
									<td v-if="!actions.pay">
										{{ money(customer.debt) }}
									</td>
									<td v-else>
										<div>
											<input
												type="number"
												v-model="inputs.debt"
												class="form-control form-control-sm"
											/>
										</div>
									</td>
								</tr>
								<tr>
									<td>Change:</td>
									<td v-if="!actions.pay">
										{{ money(customer.credit) }}
									</td>
									<td v-else>
										<div>
											<input
												type="number"
												v-model="inputs.credit"
												class="form-control form-control-sm"
											/>
										</div>
									</td>
								</tr>
								<tr v-if="!actions.pay">
									<td>Status:</td>
									<td>
										<div>
											<span
												:class="getStatusFlag"
												class="badge badge-lg"
											>
												{{ customer.status }}
											</span>
										</div>
									</td>
								</tr>
								<tr v-if="!actions.pay">
									<td>Received date:</td>
									<td>
										{{ date(customer.created_at.date) }}
									</td>
								</tr>
								<tr
									v-if="
										customer.status == 'ready' &&
										!actions.pay
									"
								>
									<td>Ready date:</td>
									<td>
										{{ date(customer.updated_at.date) }}
									</td>
								</tr>
								<tr
									v-if="
										customer.dispensed_at != null &&
										!actions.pay
									"
								>
									<td>Dispensed date:</td>
									<td>
										{{ date(customer.dispensed_at.date) }}
									</td>
								</tr>
							</table>
							<button
								v-if="!actions.pay"
								@click="actions.pay = true"
								class="btn btn-sm btn-primary"
							>
								make payment
							</button>
							<div v-else class="">
								<button
									@click="actions.pay = false"
									class="btn btn-sm btn-light"
								>
									cancel
								</button>
								<button
									:id="'modal-makepayment-btn' + customer.id"
									@click="makePayment()"
									class="btn btn-sm btn-primary"
								>
									<span class="indicator-label"> Save </span>
									<span class="indicator-progress">
										Please wait...
										<span
											class="spinner-border spinner-border-sm align-middle ms-2"
										></span>
									</span>
								</button>
							</div>
						</div>

						<h1 class="fs-3 mb-3 mt-3">Clothe(s)</h1>
						<div class="table-responsive">
							<table class="table table-hover gs-3 gy-3 gx-3">
								<thead>
									<tr
										class="fw-bold fs-6 text-gray-800 border-bottom border-gray-200"
									>
										<th>id</th>
										<th>type</th>
										<th>status</th>
										<th>washed at</th>
										<th>ironed at</th>
										<th>dispensed at</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<Laundry
										v-for="(
											clothe, cl_index
										) in customer.clothes"
										:id="cl_index"
										:index="customer.id"
										:clothe="clothe"
									></Laundry>
								</tbody>
								<tfoot>
									<tr
										class="fw-bold d-none fs-6 text-gray-800 border-bottom border-gray-200"
									>
										<th>id</th>
										<th>type</th>
										<th>status</th>
										<th>washed at</th>
										<th>ironed at</th>
										<th>dispensed at</th>
										<th></th>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>

					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-light"
							data-bs-dismiss="modal"
						>
							Close
						</button>
						<button
							@click="dispense()"
							v-if="paid()"
							:id="'modal-dispense-btn' + customer.id"
							type="button"
							class="btn btn-primary"
						>
							<span class="indicator-label">Dispense All</span>
							<span class="indicator-progress">
								Please wait...
								<span
									class="spinner-border spinner-border-sm align-middle ms-2"
								></span>
							</span>
						</button>
						<span class="btn-light-danger btn-link" v-else
							>Not paid</span
						>
					</div>
				</div>
			</div>
		</div>

		<div class="card mb-0 mb-md-5 mb-lg-0 mb-xxl-8 overflow-hidden">
			<div class="card-body p-0 d-flex card-rounded bg-light-success">
				<div class="py-18 px-12">
					<h3 class="fs-2x">
						<a
							class="text-dark text-hover-primary fw-bolder"
							data-bs-toggle="modal"
							:data-bs-target="'#kt_modal_' + customer.id"
							>{{ customer.name }}</a
						>
					</h3>
					<div class="fs-3 text-grey-100 mb-5">{{ customer.id }}</div>
					<div class="fs-3 text-muted fw-bolder">{{ cost }}</div>
					<div class="fs-1 mb-3">
						<span class="p me-6">
							<i class="fas fa-tshirt fs-2x"></i>
							{{ customer.clothes.length }}
						</span>
						<span class=""
							><i class="bi bi-check2-square fs-2x"></i>
							{{ readyClothes }}
						</span>
					</div>
					<span :class="getStatusFlag" class="badge badge-lg">
						{{ customer.status }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
