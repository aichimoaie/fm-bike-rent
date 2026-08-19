<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SeoHead
	title="Rent a Scooter in Tamraght & Taghazout | Filio's Bike"
	description="Electric scooter rental in Tamraght and Taghazout, Morocco. Easy online booking, flexible dates, WhatsApp confirmation. Rent a scooter for surf trips, beach rides and town runs."
/>

<section class="mx-auto max-w-5xl px-4 py-16 text-center">
	<h1 class="text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">
		Rent an Electric Scooter in Tamraght &amp; Taghazout
	</h1>
	<p class="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
		Fast, easy e-scooter rental for surf trips, beach cruising and getting around town. Pick your
		dates, book online, and confirm over WhatsApp &mdash; just like booking with a friend.
	</p>
	<div class="mt-8 flex justify-center gap-4">
		<a
			href="/reserve"
			class="rounded-full bg-amber-700 px-6 py-3 font-semibold text-white hover:bg-amber-800"
		>
			Reserve a scooter
		</a>
		<a
			href="/availability"
			class="rounded-full border border-stone-300 px-6 py-3 font-semibold text-stone-700 hover:bg-stone-100"
		>
			Check availability
		</a>
	</div>
</section>

<section class="bg-white py-16">
	<div class="mx-auto max-w-5xl px-4">
		<h2 class="text-center text-2xl font-bold text-stone-900">Our scooters</h2>
		<p class="mx-auto mt-2 max-w-xl text-center text-stone-600">
			A small fleet of electric scooters based in Tamraght, ready for Taghazout surf spots and the
			coast road in between.
		</p>
		<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.scooters as scooter (scooter.id)}
				<article class="rounded-2xl border border-stone-200 bg-stone-50 p-5 shadow-sm">
					<div
						class="flex h-36 items-center justify-center rounded-xl bg-gradient-to-br from-amber-200 to-amber-400 text-4xl"
						aria-hidden="true"
					>
						🛵
					</div>
					<h3 class="mt-4 text-lg font-semibold text-stone-900">{scooter.name}</h3>
					<p class="text-sm font-medium text-amber-700">{scooter.model}</p>
					<p class="mt-2 text-sm text-stone-600">{scooter.description}</p>
					<p class="mt-3 text-base font-bold text-stone-900">{scooter.price_per_day} MAD / day</p>
					<a
						href="/reserve?scooter={scooter.id}"
						class="mt-4 inline-block rounded-full bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800"
					>
						Reserve this scooter
					</a>
				</article>
			{/each}
		</div>
		<p class="mt-6 text-center text-xs text-stone-400">
			Photos coming soon &mdash; placeholders shown above until real photos are added.
		</p>
	</div>
</section>

<section class="mx-auto max-w-5xl px-4 py-16">
	<h2 class="text-center text-2xl font-bold text-stone-900">How reservations work</h2>
	<div class="mt-10 grid gap-8 sm:grid-cols-3">
		<div class="text-center">
			<div
				class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-700 text-lg font-bold text-white"
			>
				1
			</div>
			<h3 class="mt-3 font-semibold text-stone-900">Pick your scooter &amp; dates</h3>
			<p class="mt-1 text-sm text-stone-600">
				Check the <a href="/availability" class="text-amber-700 underline">availability page</a> and
				choose a free date range.
			</p>
		</div>
		<div class="text-center">
			<div
				class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-700 text-lg font-bold text-white"
			>
				2
			</div>
			<h3 class="mt-3 font-semibold text-stone-900">Fill in your details</h3>
			<p class="mt-1 text-sm text-stone-600">
				Enter your name and phone number on the reservation form and submit.
			</p>
		</div>
		<div class="text-center">
			<div
				class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-700 text-lg font-bold text-white"
			>
				3
			</div>
			<h3 class="mt-3 font-semibold text-stone-900">Confirm on WhatsApp</h3>
			<p class="mt-1 text-sm text-stone-600">
				We open WhatsApp with your booking details pre-filled &mdash; just hit send to confirm.
			</p>
		</div>
	</div>
</section>

<section class="bg-white py-16">
	<div class="mx-auto max-w-3xl px-4 text-center">
		<h2 class="text-2xl font-bold text-stone-900">Pricing</h2>
		<p class="mt-2 text-stone-600">Simple daily rates, no hidden fees.</p>
		<div class="mt-8 grid gap-6 sm:grid-cols-2">
			<div class="rounded-2xl border border-stone-200 p-6">
				<p class="text-sm font-semibold text-amber-700">City Cruiser</p>
				<p class="mt-2 text-3xl font-extrabold text-stone-900">150 MAD</p>
				<p class="text-sm text-stone-500">per day</p>
			</div>
			<div class="rounded-2xl border border-stone-200 p-6">
				<p class="text-sm font-semibold text-amber-700">Long Range</p>
				<p class="mt-2 text-3xl font-extrabold text-stone-900">200 MAD</p>
				<p class="text-sm text-stone-500">per day</p>
			</div>
		</div>
	</div>
</section>
