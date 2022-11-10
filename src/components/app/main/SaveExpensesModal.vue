<script setup>
	import { ref } from "vue";

	function saveExpenses() {
		console.log("saving expenses...");
		let form = $("#create-expenses-form");
		if (!form[0].checkValidity()) {
			return false;
		}

		$("#create-expenses-form-btn")[0].setAttribute(
			"data-kt-indicator",
			"on"
		);
		$.ajax({
			url: base_url + "/expenses",
			method: "POST",
			data: form.serializeArray(),
			success: (res) => {
				//console.log(res);
				if (res.status) {
					notify("success", res.message);
					setTimeout(function () {
						form.removeClass("was-validated");
						form[0].reset();
					}, 900);
					this.expenses.push(res.data);
				} else notify("error", "Error saving expenses");
			},
			error: (err) => {
				console.log(err);
				notify("error", "Error occured");
			},
		}).always(() => {
			setTimeout(function () {
				$("#create-expenses-form-btn")[0].removeAttribute(
					"data-kt-indicator"
				);
			}, 1000);
		});
	}
</script>

<template>
	<!--begin::Create Expenses Moddal-->
	<div class="modal fade" tabindex="-1" id="kt_modal_expenses">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content shadow-none">
				<div class="modal-header">
					<div class="d-flex justify-content-between flex-column">
						<h5 class="modal-title fs-2x">Add Expense(s)</h5>
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
					<div class="row justify-content-center mb-5">
						<div class="col-auto">
							<form
								method="post"
								id="create-expenses-form"
								novalidate
								@submit.prevent="saveExpenses()"
								class="form needs-validation"
							>
								<div class="mb-5">
									<label>Title</label>
									<input
										required
										type="text"
										name="name"
										class="form-control form-control-solid"
									/>
									<div class="invalid-feedback">
										Title cannot be empty
									</div>
								</div>
								<div class="mb-5">
									<label>Description</label>
									<textarea
										rows="6"
										name="description"
										class="form-control form-control-solid"
									></textarea>
								</div>
								<div class="mb-5">
									<label>Cost</label>
									<input
										required
										type="text"
										name="cost"
										class="form-control form-control-solid"
									/>
									<div class="invalid-feedback">
										Please enter a valid number
									</div>
								</div>
								<button
									id="create-expenses-form-btn"
									type="submit"
									class="btn btn-primary"
								>
									<span class="indicator-label"> Save </span>
									<span class="indicator-progress">
										Please wait...
										<span
											class="spinner-border spinner-border-sm align-middle ms-2"
										></span>
									</span>
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--end::Create Expenses Moddal-->
</template>
