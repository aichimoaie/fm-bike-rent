<script lang="ts">
	import '../lib/styles/app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { BUSINESS_NAME } from '$lib/config';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col bg-white text-stone-900">
	<header class="sticky top-0 z-20 border-b border-stone-200 bg-white/90 backdrop-blur">
		<nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
			<a href="/" class="text-lg font-bold tracking-tight">{BUSINESS_NAME}</a>
			<div class="hidden items-center gap-7 text-sm font-medium text-stone-600 md:flex">
				<a href="/#fleet" class="hover:text-stone-900">Fleet</a>
				<a href="/#how-it-works" class="hover:text-stone-900">How it works</a>
				<a href="/#pricing" class="hover:text-stone-900">Pricing</a>
				<a href="/availability" class="hover:text-stone-900">Availability</a>
				<a href="/#faq" class="hover:text-stone-900">FAQ</a>
				<a href="/#contact" class="hover:text-stone-900">Contact</a>
			</div>
			<a
				href="/reserve"
				class="rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-white hover:bg-stone-700"
			>
				Reserve
			</a>
		</nav>
	</header>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer id="contact" class="border-t border-stone-200 bg-stone-50 py-14">
		<div class="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-3">
			<div>
				<p class="text-lg font-bold tracking-tight">{BUSINESS_NAME}</p>
				<p class="mt-2 text-sm text-stone-500">
					Electric scooter rental &mdash; Tamraght &amp; Taghazout, Morocco.
				</p>
			</div>
			<div>
				<p class="text-sm font-semibold text-stone-900">Navigation</p>
				<ul class="mt-3 space-y-2 text-sm text-stone-500">
					<li><a href="/#fleet" class="hover:text-stone-900">Fleet</a></li>
					<li><a href="/#pricing" class="hover:text-stone-900">Pricing</a></li>
					<li><a href="/availability" class="hover:text-stone-900">Availability</a></li>
					<li><a href="/reserve" class="hover:text-stone-900">Reserve</a></li>
				</ul>
			</div>
			<div>
				<p class="text-sm font-semibold text-stone-900">Information</p>
				<ul class="mt-3 space-y-2 text-sm text-stone-500">
					<li><a href="/#how-it-works" class="hover:text-stone-900">How it works</a></li>
					<li><a href="/#faq" class="hover:text-stone-900">FAQ</a></li>
					<li>Tamraght &amp; Taghazout, Morocco</li>
				</ul>
			</div>
		</div>
		<p class="mx-auto mt-10 max-w-6xl px-4 text-xs text-stone-400">
			&copy; {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
		</p>
	</footer>
</div>
