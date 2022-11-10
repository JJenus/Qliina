<script setup>
	const props = defineprops({
		index: {
			required: true,
		},
	});
    
 	let category = "undefined";
	let quantity = 1;
	let cost = 0;
	let categories = [];

	function calCost(eve) {
		//console.log(eve)
		if (this.category === "undefined") {
			console.log("called");
			return 0;
		}
		let cat = this.categories.filter((e) => {
			return e.id === this.category;
		})[0];
		this.cost = this.quantity * cat.cost;
		let data = {
			index: this.index,
			cost: this.cost,
		};
		eventBus.$emit("clothe_cost", data);
	}
	function loadCategories() {
		$.ajax({
			url: base_url + "/clothes/categories",
			method: "GET",
			success: (res) => {
				console.log("loaded categories ");
				//console.log(res);
				this.categories = res;
			},
			error: (err) => {
				console.log(err);
			},
		});
	}
</script>

<template>
	<div class="mb-8 row justify-content-between align-items-end">
		<div class="col-5">
			<label class="fw-bolder">Category</label>
			<select
				required
				:name="'clothes[' + index + '][type]'"
				@change="calCost('select')"
				v-model="category"
				class="form-select form-select-solid form-select-lg"
				data-control="select2"
				data-placeholder="Select Category..."
				data-hide-search="true"
			>
				<option
					class="capitalize"
					v-for="category in categories"
					:value="category.id"
				>
					{{ category.name }}
				</option>
			</select>
		</div>
		<div class="col-3">
			<label class="fw-bolder">Quantity</label>
			<input
				required
				:name="'clothes[' + index + '][quantity]'"
				@input="calCost('qauntity')"
				v-model="quantity"
				type="number"
				class="p-2 text-center form-control form-control-solid form-control-lg"
				placeholder=""
			/>
		</div>
		<div class="col-4">
			<label class="fw-bolder">cost</label>
			<input
				disabled
				:value="cost"
				type="text"
				class="p-2 text-center form-control form-control-solid form-control-lg"
				placeholder=""
			/>
		</div>
	</div>
</template>
