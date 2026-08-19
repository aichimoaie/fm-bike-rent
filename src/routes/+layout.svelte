<script lang="ts">
	import '../lib/styles/app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { BUSINESS_NAME } from '$lib/config';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col bg-stone-50 text-stone-900">
	<header class="border-b border-stone-200 bg-white">
		<nav class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
			<a href="/" class="text-lg font-bold tracking-tight text-amber-700">{BUSINESS_NAME}</a>
			<div class="flex gap-6 text-sm font-medium">
				<a href="/" class="hover:text-amber-700">Home</a>
				<a href="/availability" class="hover:text-amber-700">Availability</a>
				<a
					href="/reserve"
					class="rounded-full bg-amber-700 px-4 py-1.5 text-white hover:bg-amber-800"
				>
					Reserve a scooter
				</a>
			</div>
		</nav>
	</header>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="border-t border-stone-200 bg-white py-6 text-center text-sm text-stone-500">
		<p>{BUSINESS_NAME} &mdash; Tamraght &amp; Taghazout, Morocco</p>
	</footer>
</div>
