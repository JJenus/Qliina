<script setup>
	const actions = {
		created_by: "loading...",
		washed_by: "loading...",
		ironed_by: "loading...",
		dispensed_by: "loading...",
		confirmed_by: "loading...",
	};

	function getStaff($key, $id) {
		$.ajax({
			url: base_url + "/staffs/" + $id,
			method: "get",
			success: (res) => {
				//console.log(res);
				if (res) this.actions[$key] = res.name;
			},
			error: (err) => {
				console.log(err);
			},
		}).always(() => {
			$("#btn-load-more").attr("data-kt-indicator", null);
		});
	}

	function timeline($date) {
		if (!$date) return "00:00";
		let date = moment($date, "YYYY-MM-DD HH:mm:ss").format(
			"hh:mm a, MMM DD yyyy"
		);
		return date;
	}
</script>

<template>
	<div class="accordion-item">
		<h2 class="accordion-header" id="flush-headingTwo">
			<button
				class="accordion-button fs-6 fw-bold py-0 collapsed"
				type="button"
				data-bs-toggle="collapse"
				:data-bs-target="'#flush-collapseTwo' + cpos + '_' + index"
				aria-expanded="false"
				:aria-controls="'flush-collapseTwo' + cpos + '_' + index"
			>
				<div class="table-responsive mb-0 pb-0">
					<table class="table mb-0 pb-0 table-borderless">
						<tr>
							<th>
								<span
									class="fas fa-tshirt fs-1 text-primary"
								></span>
							</th>
							<th>{{ clothe.id }}</th>
							<th class="pe-3 ps-3">{{ clothe.clotheType }}</th>
							<th>{{ timeline(clothe.created_at) }}</th>
						</tr>
					</table>
				</div>
			</button>
		</h2>
		<div
			:id="'flush-collapseTwo' + cpos + '_' + index"
			class="accordion-collapse collapse"
			aria-labelledby="flush-headingTwo"
			:data-bs-parent="'#accordionFlush_' + index"
		>
			<div class="accordion-body">
				<!--begin::Timeline-->
				<div class="timeline mt-3">
					<!--begin::Item-->
					<div class="timeline-item align-items-start pb-1">
						<!--begin::Label-->
						<div
							class="timeline-label fw-bolder text-gray-800 fs-6"
						>
							{{ timeline(clothe.created_at) }}
						</div>
						<!--end::Label-->
						<!--begin::Badge-->
						<div class="timeline-badge">
							<i class="fa fa-genderless fs-1 text-gray-200"></i>
						</div>
						<!--end::Badge-->
						<!--begin::Content-->
						<div class="timeline-content d-flex">
							<span class="fw-bolder text-gray-800 ps-3 pe-3">
								Created
							</span>
							<!--begin::Symbol-->
							<div
								class="symbol symbol-35px bg-light-primary mt-n3 me-2 align-self-center"
							>
								<span
									class="symbol-label bg-light align-items-end"
								>
									<img
										alt="Logo"
										src="/assets/media/svg/avatars/004-boy-1.svg"
										class="mh-25px"
									/>
								</span>
							</div>
							<!--end::Symbol-->
							<!--begin::Symbol-->
							<div class="mt-n3 align-self-end">
								<span>
									{{ actions.created_by }}
								</span>
							</div>
							<!--end::Symbol-->
						</div>
						<!--end::Content-->
					</div>
					<!--end::Item-->
					<!--begin::Item-->
					<div
						v-if="clothe.washed_at"
						class="timeline-item align-items-start pb-1"
					>
						<!--begin::Label-->
						<div
							class="timeline-label fw-bolder text-gray-800 fs-6"
						>
							{{ timeline(clothe.washed_at) }}
						</div>
						<!--end::Label-->
						<!--begin::Badge-->
						<div class="timeline-badge">
							<i class="fa fa-genderless fs-1 text-gray-200"></i>
						</div>
						<!--end::Badge-->
						<!--begin::Content-->
						<div class="timeline-content d-flex">
							<span class="fw-bolder text-gray-800 ps-3 pe-3">
								Washed
							</span>
							<!--begin::Symbol-->
							<div
								class="symbol symbol-35px bg-light-primary mt-n3 me-2 align-self-center"
							>
								<span
									class="symbol-label bg-light align-items-end"
								>
									<img
										alt="Logo"
										src="/assets/media/svg/avatars/004-boy-1.svg"
										class="mh-25px"
									/>
								</span>
							</div>
							<!--end::Symbol-->
							<!--begin::Symbol-->
							<div class="mt-n3 align-self-end">
								<span>
									{{ actions.washed_by }}
								</span>
							</div>
							<!--end::Symbol-->
						</div>
						<!--end::Content-->
					</div>
					<!--end::Item-->
					<!--begin::Item-->
					<div
						v-if="clothe.ironed_at"
						class="timeline-item align-items-start pb-1"
					>
						<!--begin::Label-->
						<div
							class="timeline-label fw-bolder text-gray-800 fs-6"
						>
							{{ timeline(clothe.ironed_at) }}
						</div>
						<!--end::Label-->
						<!--begin::Badge-->
						<div class="timeline-badge">
							<i class="fa fa-genderless fs-1 text-gray-200"></i>
						</div>
						<!--end::Badge-->
						<!--begin::Content-->
						<div class="timeline-content d-flex">
							<span class="fw-bolder text-gray-800 ps-3 pe-3">
								Ironed
							</span>
							<!--begin::Symbol-->
							<div
								class="symbol symbol-35px bg-light-primary mt-n3 me-2 align-self-center"
							>
								<span
									class="symbol-label bg-light align-items-end"
								>
									<img
										alt="Logo"
										src="/assets/media/svg/avatars/004-boy-1.svg"
										class="mh-25px"
									/>
								</span>
							</div>
							<!--end::Symbol-->
							<!--begin::Symbol-->
							<div class="mt-n3 align-self-end">
								<span>
									{{ actions.ironed_by }}
								</span>
							</div>
							<!--end::Symbol-->
						</div>
						<!--end::Content-->
					</div>
					<!--end::Item-->
					<!--begin::Item-->
					<div
						v-if="clothe.issue"
						class="timeline-item align-items-start pb-1"
					>
						<!--begin::Label-->
						<div class="timeline-label fw-bolder text-danger fs-6">
							{{ timeline(clothe.issue.created_at) }}
						</div>
						<!--end::Label-->
						<!--begin::Badge-->
						<div class="timeline-badge">
							<i class="fa fa-genderless fs-1 text-gray-200"></i>
						</div>
						<!--end::Badge-->
						<!--begin::Content-->
						<div class="timeline-content d-flex">
							<span class="fw-bolder text-danger ps-3 pe-3">
								Issue
							</span>
							<!--begin::Symbol-->

							<!--end::Symbol-->
							<!--begin::Symbol-->
							<span class="fw-bold ps-3 pe-3">
								{{ clothe.issue.created_at }}
							</span>
							<!--end::Symbol-->
							<!--begin::Symbol-->
							<div class="mt-n3 align-self-start">
								<span>
									{{ clothe.issue.description }}
								</span>
							</div>
							<!--end::Symbol-->
						</div>
						<!--end::Content-->
					</div>
					<!--end::Item-->
					<!--begin::Item-->
					<div
						v-if="clothe.ready_at"
						class="timeline-item align-items-start pb-1"
					>
						<!--begin::Label-->
						<div class="timeline-label fw-bolder text-primary fs-6">
							{{ timeline(clothe.ready_at) }}
						</div>
						<!--end::Label-->
						<!--begin::Badge-->
						<div class="timeline-badge">
							<i class="fa fa-genderless fs-1 text-gray-200"></i>
						</div>
						<!--end::Badge-->
						<!--begin::Content-->
						<div class="timeline-content d-flex">
							<span class="fw-bolder text-primary ps-3 pe-3">
								Ready
							</span>
							<!--begin::Symbol-->
							<div
								class="symbol symbol-35px bg-light-primary mt-n3 me-2 align-self-center"
							>
								<span
									class="symbol-label bg-light align-items-end"
								>
									<img
										alt="Logo"
										src="/assets/media/svg/avatars/004-boy-1.svg"
										class="mh-25px"
									/>
								</span>
							</div>
							<!--end::Symbol-->
							<!--begin::Symbol-->
							<div class="mt-n3 align-self-end">
								<span>
									{{ actions.confirmed_by }}
								</span>
							</div>
							<!--end::Symbol-->
						</div>
						<!--end::Content-->
					</div>
					<!--end::Item-->

					<!--begin::Item-->
					<div
						v-if="clothe.dispensed_at"
						class="timeline-item align-items-start pb-1"
					>
						<!--begin::Label-->
						<div class="timeline-label fw-bolder text-primary fs-6">
							{{ timeline(clothe.dispensed_at) }}
						</div>
						<!--end::Label-->
						<!--begin::Badge-->
						<div class="timeline-badge">
							<i class="fa fa-genderless fs-1 text-gray-200"></i>
						</div>
						<!--end::Badge-->
						<!--begin::Content-->
						<div class="timeline-content d-flex">
							<span class="fw-bolder text-primary ps-3 pe-3">
								Dispensed
							</span>
							<!--begin::Symbol-->
							<div
								class="symbol symbol-35px bg-light-primary mt-n3 me-2 align-self-center"
							>
								<span
									class="symbol-label bg-light align-items-end"
								>
									<img
										alt="Logo"
										src="/assets/media/svg/avatars/004-boy-1.svg"
										class="mh-25px"
									/>
								</span>
							</div>
							<!--end::Symbol-->
							<!--begin::Symbol-->
							<div class="mt-n3 align-self-end">
								<span>
									{{ actions.dispensed_by }}
								</span>
							</div>
							<!--end::Symbol-->
						</div>
						<!--end::Content-->
					</div>
					<!--end::Item-->
				</div>
				<!--end::Timeline-->
			</div>
		</div>
	</div>
</template>
