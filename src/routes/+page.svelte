<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { OWNER_WHATSAPP_NUMBER, BUSINESS_NAME } from '$lib/config';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function waLink(scooterName: string): string {
		const message = `Hi! I'd like to rent the ${scooterName} from ${BUSINESS_NAME}. Is it available?`;
		return `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
	}

	const faqs = [
		{
			q: 'Where do I pick up the scooter?',
			a: 'Pickup is arranged directly with us in Tamraght, a short ride from Taghazout — exact location confirmed over WhatsApp when you book.'
		},
		{
			q: 'Do I need a license?',
			a: 'A valid driving license is required. Bring it with you at pickup.'
		},
		{
			q: 'What if the scooter I want is booked?',
			a: 'Check the live availability page for open dates, or message us on WhatsApp — we sometimes have last-minute openings.'
		},
		{
			q: 'How do I confirm a reservation?',
			a: "Submit the reservation form and we'll open WhatsApp with your booking details pre-filled — just hit send and we'll confirm from there."
		}
	];
</script>

<SeoHead
	title="Rent a Scooter in Tamraght & Taghazout | Filio's Bike"
	description="Electric scooter rental in Tamraght and Taghazout, Morocco. Easy online booking, flexible dates, WhatsApp confirmation. Rent a scooter for surf trips, beach rides and town runs."
/>

<section class="border-b border-stone-200 bg-stone-50">
	<div class="mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
		<p class="text-sm font-semibold tracking-widest text-stone-500 uppercase">
			Tamraght &mdash; Taghazout &mdash; Morocco
		</p>
		<h1 class="mx-auto mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-stone-900 sm:text-6xl">
			Rent an electric scooter in Tamraght &amp; Taghazout
		</h1>
		<p class="mx-auto mt-6 max-w-2xl text-lg text-stone-600">
			Fast, easy e-scooter rental for surf trips, beach cruising and getting around town. Pick
			your dates, book online, and confirm over WhatsApp &mdash; just like booking with a friend.
		</p>
		<div class="mt-10 flex flex-wrap justify-center gap-4">
			<a
				href="/reserve"
				class="rounded-full bg-stone-900 px-7 py-3 font-semibold text-white hover:bg-stone-700"
			>
				Reserve a scooter
			</a>
			<a
				href="/availability"
				class="rounded-full border border-stone-300 bg-white px-7 py-3 font-semibold text-stone-700 hover:bg-stone-100"
			>
				Check availability
			</a>
		</div>
	</div>
</section>

<section id="fleet" class="mx-auto max-w-6xl px-4 py-20">
	<div class="text-center">
		<p class="text-sm font-semibold tracking-widest text-stone-500 uppercase">Our fleet</p>
		<h2 class="mt-2 text-3xl font-bold text-stone-900">Scooters available in Tamraght</h2>
		<p class="mx-auto mt-3 max-w-xl text-stone-600">
			A small fleet, ready for Taghazout surf spots and the coast road in between.
		</p>
	</div>

	<div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.scooters as scooter, i (scooter.id)}
			<article
				class="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-lg"
			>
				<div class="relative">
					<div
						class="flex h-48 items-center justify-center bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 text-5xl"
						aria-hidden="true"
					>
						🛵
					</div>
					{#if i === 0}
						<span
							class="absolute top-3 left-3 rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold text-white"
						>
							Most popular
						</span>
					{/if}
				</div>
				<div class="p-6">
					<h3 class="text-lg font-bold text-stone-900">{scooter.name}</h3>
					<p class="text-sm font-medium text-amber-700">{scooter.model}</p>
					<p class="mt-3 text-sm text-stone-600">{scooter.description}</p>

					<div class="mt-4 flex items-center gap-4 text-xs text-stone-500">
						<span>⚡ Electric</span>
						<span>&mdash;</span>
						<span>🪪 License required</span>
					</div>

					<div class="mt-5 flex items-baseline justify-between border-t border-stone-100 pt-5">
						<div>
							<span class="text-2xl font-extrabold text-stone-900">{scooter.price_per_day}</span>
							<span class="text-sm text-stone-500">MAD / day</span>
						</div>
						<a href="/reserve?scooter={scooter.id}" class="text-sm font-semibold text-stone-900 hover:underline">
							Reserve &rarr;
						</a>
					</div>

					<a
						href={waLink(scooter.name)}
						target="_blank"
						rel="noopener"
						class="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-stone-300 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50"
					>
						💬 Ask on WhatsApp
					</a>
				</div>
			</article>
		{/each}
	</div>
	<p class="mt-8 text-center text-xs text-stone-400">
		Photos coming soon &mdash; placeholders shown above until real photos are added.
	</p>
</section>

<section id="how-it-works" class="border-y border-stone-200 bg-stone-50 py-20">
	<div class="mx-auto max-w-6xl px-4">
		<div class="text-center">
			<p class="text-sm font-semibold tracking-widest text-stone-500 uppercase">Process</p>
			<h2 class="mt-2 text-3xl font-bold text-stone-900">How reservations work</h2>
		</div>
		<div class="mt-14 grid gap-10 sm:grid-cols-3">
			<div class="text-center">
				<div
					class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-900 text-lg font-bold text-white"
				>
					1
				</div>
				<h3 class="mt-4 font-semibold text-stone-900">Pick your scooter &amp; dates</h3>
				<p class="mt-2 text-sm text-stone-600">
					Check the <a href="/availability" class="text-stone-900 underline">availability page</a>
					and choose a free date range.
				</p>
			</div>
			<div class="text-center">
				<div
					class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-900 text-lg font-bold text-white"
				>
					2
				</div>
				<h3 class="mt-4 font-semibold text-stone-900">Fill in your details</h3>
				<p class="mt-2 text-sm text-stone-600">
					Enter your name and phone number on the reservation form and submit.
				</p>
			</div>
			<div class="text-center">
				<div
					class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-900 text-lg font-bold text-white"
				>
					3
				</div>
				<h3 class="mt-4 font-semibold text-stone-900">Confirm on WhatsApp</h3>
				<p class="mt-2 text-sm text-stone-600">
					We open WhatsApp with your booking details pre-filled &mdash; just hit send to confirm.
				</p>
			</div>
		</div>
	</div>
</section>

<section id="pricing" class="mx-auto max-w-4xl px-4 py-20 text-center">
	<p class="text-sm font-semibold tracking-widest text-stone-500 uppercase">Pricing</p>
	<h2 class="mt-2 text-3xl font-bold text-stone-900">Simple daily rates</h2>
	<p class="mt-2 text-stone-600">No hidden fees.</p>
	<div class="mt-10 grid gap-6 sm:grid-cols-2">
		<div class="rounded-2xl border border-stone-200 p-8 text-left">
			<p class="text-sm font-semibold text-amber-700">City Cruiser</p>
			<p class="mt-2 text-4xl font-extrabold text-stone-900">150 MAD</p>
			<p class="text-sm text-stone-500">per day</p>
			<p class="mt-4 text-sm text-stone-600">Comfortable and light &mdash; ideal for beach-to-town rides.</p>
		</div>
		<div class="rounded-2xl border border-stone-200 p-8 text-left">
			<p class="text-sm font-semibold text-amber-700">Long Range</p>
			<p class="mt-2 text-4xl font-extrabold text-stone-900">200 MAD</p>
			<p class="text-sm text-stone-500">per day</p>
			<p class="mt-4 text-sm text-stone-600">Bigger battery for longer surf-spot-hopping days.</p>
		</div>
	</div>
</section>

<section id="faq" class="border-t border-stone-200 bg-stone-50 py-20">
	<div class="mx-auto max-w-3xl px-4">
		<div class="text-center">
			<p class="text-sm font-semibold tracking-widest text-stone-500 uppercase">FAQ</p>
			<h2 class="mt-2 text-3xl font-bold text-stone-900">Frequently asked questions</h2>
		</div>
		<dl class="mt-12 space-y-8">
			{#each faqs as faq}
				<div class="border-b border-stone-200 pb-8">
					<dt class="font-semibold text-stone-900">{faq.q}</dt>
					<dd class="mt-2 text-sm text-stone-600">{faq.a}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>
