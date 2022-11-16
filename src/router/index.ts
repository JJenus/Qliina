import { createRouter, createWebHistory } from "vue-router";
import Main from "@/views/app/Main.vue";
import Error404Vue from "@/views/Error404.vue";
import LaundryVue from "@/views/app/Laundry.vue";
import IssuesVue from "@/views/dashboard/Issues.vue";

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
			name: "laundry",
			component: IssuesVue,
		},
		{
			path: "/:pathMatch(.*)*",
			name: "NotFound",
			component: Error404Vue,
		},
	],
});

export default router;
