<script setup>
	const props = defineProps({
		index: {
			required: true,
		},
		clothe: {
			required: true,
		},
		id: {
			required: true,
		},
	});

	let actions = {
		dispensed: false,
	};

	function date($date) {
		//make a DB call for clothe activities
		if (clothe.status === "pending" || !$date) {
			return "pending";
		}
		return moment($date, "YYYY-MM-DD HH:mm:ss").format("LLLL");
	}

	function dispense() {
		$("#clothe-dispense-btn" + clothe.id)[0].setAttribute(
			"data-kt-indicator",
			"on"
		);
		$.ajax({
			url: `${base_url}/clothes/${clothe.id}/dispense`,
			method: "GET",
			success: (res) => {
				console.log(res);
				if (res.status) {
					clothe = res.data;
					//console.log("success");
					notify("success", "Done");
					actions.dispensed = true;
					let data = {
						clothe: res.data,
						index: id,
					};
					eventBus.$emit("recalibrate-dispensed-" + index, data);
				}
			},
			error: (err) => {
				console.log(err);
			},
		}).always(() => {
			$("#clothe-dispense-btn" + clothe.id)[0].removeAttribute(
				"data-kt-indicator"
			);
		});
	}
	function reverse() {
		console.log("are you sure?");
		actions.dispensed = false;
	}
</script>

<template>
	<tr>
		<td>{{ clothe.id }}</td>
		<td>{{ clothe.clotheType }}</td>
		<td>{{ clothe.status }}</td>
		<td>{{ date(clothe.washed_at) }}</td>
		<td>{{ date(clothe.ironed_at) }}</td>
		<td>{{ date(clothe.dispensed_at) }}</td>
		<td>
			<div v-if="!clothe.dispensed_at">
				<button
					:id="'clothe-dispense-btn' + clothe.id"
					@click="dispense()"
					class="btn btn-sm btn-light-primary"
				>
					<span class="indicator-label"> dispense </span>
					<span class="indicator-progress">
						Please wait...
						<span
							class="spinner-border spinner-border-sm align-middle ms-2"
						></span>
					</span>
				</button>
			</div>
			<span v-else class="">
				<i class="bi fs-3 fw-bolder text-primary bi-check-circle"></i>
			</span>
		</td>
	</tr>
</template>
