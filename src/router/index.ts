import { createRouter, createWebHistory } from "vue-router";
import Main from "@/views/app/Main.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			redirect: "/app/main",
		},
		{
			path: "/app/main",
			name: "freepicks",
			component: Main,
		},
	],
});

export default router;
