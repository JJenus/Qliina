import { createRouter, createWebHistory } from "vue-router";
import Main from "@/views/app/Main.vue";
import Error404Vue from "@/views/Error404.vue";
import LaundryVue from "@/views/app/Laundry.vue";
import IssuesVue from "@/views/dashboard/Issues.vue";
import LaundryDetails from "@/views/dashboard/LaundryDetails.vue";
import HireVue from "@/views/dashboard/Hire.vue";


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			redirect: "/app/main",
		},
		{
			path: "/app/main",
			name: "main",
			component: Main,
		},
		{
			path: "/app/laundry",
			name: "laundry",
			component: LaundryVue,
		},
		{
			path: "/dashboard/issues",
			name: "issues",
			component: IssuesVue,
		},
		{
			path: "/dashboard/laundry",
			name: "adminlaundry",
			component: LaundryDetails,
		},
		{
			path: "/dashboard/hire",
			name: "hire",
			component: HireVue,
		},
		{
			path: "/:pathMatch(.*)*",
			name: "NotFound",
			component: Error404Vue,
		},
	],
});

export default router;
