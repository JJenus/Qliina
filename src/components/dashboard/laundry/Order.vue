<script setup>
	import Order from "@/components/dashboard/laundry/LaundryActivity.vue";

	const props = defineProps(["customer", "index"]);

	function role() {
		for (let i in this.staff.roles) {
			return this.staff.roles[i];
		}
	}
	function getStatusFlag() {
		let flag = "";
		if (this.customer.status === "ready") {
			flag = "badge-light-success ";
		} else if (this.customer.status === "pending") {
			flag = "badge-light-warning";
		} else if (this.customer.status === "pending") {
			flag = "badge-light-danger";
		} else flag = "badge-light-primary";

		return flag;
	}

	function readyClothes() {
		var count = 0;
		for (let clothe of this.customer.clothes) {
			if (clothe.status === "ready") {
				count++;
			}
		}
		return count;
	}
	function date($date) {
		if (!$date) {
			return "unknown";
		}
		return moment($date, "YYYY-MM-DD HH:mm:ss").format("LLLL");
	}
	function dispensed() {
		for (let clothe of this.customer.clothes) {
			if (!clothe.dispensed_at) {
				return false;
			}
		}
		return true;
	}
</script>

<template>
	<div class="col-6 mb-3 col-xl-4">
		<!--begin::Modal - Select Location-->
		<div
			class="modal fade"
			:id="'kt_modal_about_clothes_' + index"
			data-backdrop="static"
			tabindex="-1"
			role="dialog"
			aria-hidden="true"
		>
			<div class="modal-dialog modal-fullscreen" role="document">
				<div class="modal-content">
					<div class="modal-header border-0">
						<div class="d-flex justify-content-between flex-column">
							<h5 class="modal-title fs-2x">
								{{ customer.name }}
							</h5>
							<div class="">
								<span
									:class="getStatusFlag()"
									class="badge badge-lg"
								>
									{{ customer.status }}
								</span>
							</div>
						</div>
						<!--begin::Close-->
						<div
							class="btn btn-icon btn-sm btn-active-light-primary ms-2"
							data-bs-dismiss="modal"
						>
							<!--begin::Svg Icon | path: icons/stockholm/Navigation/Close.svg-->
							<span class="svg-icon svg-icon-2x">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									xmlns:xlink="http://www.w3.org/1999/xlink"
									width="24px"
									height="24px"
									viewBox="0 0 24 24"
									version="1.1"
								>
									<g
										transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)"
										fill="#000000"
									>
										<rect
											fill="#000000"
											x="0"
											y="7"
											width="16"
											height="2"
											rx="1"
										/>
										<rect
											fill="#000000"
											opacity="0.5"
											transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000)"
											x="0"
											y="7"
											width="16"
											height="2"
											rx="1"
										/>
									</g>
								</svg>
							</span>
							<!--end::Svg Icon-->
						</div>
						<!--end::Close-->
					</div>
					<!-- HERE -->
					<div class="modal-body">
						<table
							class="table mb-5 table-borderless fw-bold align-middle"
						>
							<thead>
								<tr>
									<th class="p-0 w-50px"></th>
									<th class="p-0 min-w-150px"></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="px-0 py-3">
										<div
											class="symbol symbol-55px mt-1 me-5"
										>
											<span
												class="symbol-label bg-light-primary align-items-end"
											>
												<img
													alt="Logo"
													src="${base_url}/assets/media/svg/avatars/001-boy.svg"
													class="mh-40px"
												/>
											</span>
										</div>
									</td>
									<td class="px-0">
										<a
											href="#"
											class="text-gray-800 fw-bolder text-hover-primary fs-6"
											>Brad Simmons</a
										>
										<span
											class="text-muted fw-bold d-block mt-1"
											>{{ customer.create_at }}</span
										>
									</td>
								</tr>
								<tr class="">
									<td class="p-2">Cost:</td>
									<td class="p-2">
										{{ customer.total_cost }}
									</td>
								</tr>
								<tr class="">
									<td class="p-2">Paid:</td>
									<td class="p-2">
										{{ customer.amount_paid }}
									</td>
								</tr>
								<tr v-if="customer.credit">
									<td class="p-2">Change:</td>
									<td class="p-2">{{ customer.credit }}</td>
								</tr>
								<tr v-if="customer.debt">
									<td class="p-2">Debt:</td>
									<td class="p-2">{{ customer.debt }}</td>
								</tr>
							</tbody>
						</table>
						<h5 class="fs-3 fw-bold">Clothes</h5>
						<div
							class="accordion accordion-flush"
							:id="'accordionFlush_' + index"
						>
							<LaundryActivity
								v-for="clothe in customer.clothes"
								:key="clothe.id"
								:index="index"
								:cpos="clothe.id"
								:clothe="clothe"
							></LaundryActivity>
						</div>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-light-primary"
							data-bs-dismiss="modal"
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
		<!--end::Modal - Select Location-->

		<div class="card mb-0 mb-md-5 mb-lg-0 mb-xxl-8 overflow-hidden">
			<div class="card-body card-rounded bg-light-success">
				<a
					class="text-dark text-hover-primary fw-bolder"
					data-bs-toggle="modal"
					:data-bs-target="'#kt_modal_about_clothes_' + index"
				>
					<div class="">
						<h3 class="fs-2">
							<span class="text-hover-primary fw-bolder">
								{{ customer.name }}
							</span>
						</h3>
						<div class="fs-6 text-grey-100 mb-5">
							{{ customer.id }}
						</div>
						<div class="fs-6 text-muted fw-bolder">
							{{ customer.total_cost }}
						</div>
						<div class="fs-3 mb-3">
							<span class="p me-6">
								<i class="fas fa-tshirt fs-2"></i>
								{{ customer.clothes.length }}
							</span>
							<span class=""
								><i class="bi bi-check2-square fs-2"></i>
								{{ readyClothes() }}
							</span>
						</div>
						<span :class="getStatusFlag()" class="badge">
							<span>{{ customer.status }}</span>
						</span>
					</div>
				</a>
			</div>
		</div>
	</div>
</template>
