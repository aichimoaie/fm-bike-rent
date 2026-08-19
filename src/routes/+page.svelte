<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { BUSINESS_NAME } from '$lib/config';
	import { waLink } from '$lib/whatsapp';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function scooterWaLink(scooterName: string): string {
		return waLink(`Hi! I'd like to rent the ${scooterName} from ${BUSINESS_NAME}. Is it available?`);
	}

	const fleetImages = [
		'/images/fleet-bike-sunset-atlas.jpg',
		'/images/fleet-bike-sunset-sky.jpg',
		'/images/rockrider-e-expl-500s-lifestyle.jpg'
	];

	const galleryImages = [
		'/images/gallery-argan-trail.jpg',
		'/images/gallery-rocks-sunset.jpg',
		'/images/gallery-sunset-cheers.jpg',
		'/images/anti-atlas.jpg',
		'/images/atlas-road.jpg',
		'/images/berber-village.jpg',
		'/images/paradise-valley.jpg',
		'/images/insta-photo-1.jpg',
		'/images/insta-photo-2.jpg',
		'/images/insta-photo-3.jpg',
		'/images/insta-photo-4.jpg',
		'/images/insta-photo-5.jpg',
		'/images/insta-photo-6.jpg'
	];

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
			a: "Tap any \"Book on WhatsApp\" button — it opens a WhatsApp chat with your request pre-filled, and we confirm from there."
		}
	];
</script>

<SeoHead
	title="Rent a Scooter in Tamraght & Taghazout | Filio's Bike"
	description="Electric scooter rental in Tamraght and Taghazout, Morocco. Easy WhatsApp booking, flexible dates. Rent a scooter for surf trips, beach rides and town runs."
/>

<section
	class="relative flex min-h-[640px] items-center justify-center bg-cover bg-center text-center"
	style="background-image: linear-gradient(rgba(26,26,26,0.45), rgba(26,26,26,0.55)), url('/images/hero-canyon.jpg');"
>
	<div class="container-fb py-24 sm:py-32">
		<p class="text-sm font-semibold tracking-widest text-(--color-beige) uppercase">
			Tamraght &mdash; Taghazout &mdash; Morocco
		</p>
		<h1 class="font-heading mx-auto mt-4 max-w-3xl text-4xl text-white sm:text-6xl">
			Rent an electric scooter in Tamraght &amp; Taghazout
		</h1>
		<p class="mx-auto mt-6 max-w-2xl text-lg text-white/90">
			Fast, easy e-scooter rental for surf trips, beach cruising and getting around town. Message
			us on WhatsApp and we'll confirm your dates &mdash; just like booking with a friend.
		</p>
		<div class="mt-10 flex flex-wrap justify-center gap-4">
			<a
				href={waLink(`Hi! I'd like to rent a scooter from ${BUSINESS_NAME}.`)}
				target="_blank"
				rel="noopener"
				class="btn btn-whatsapp btn-lg"
			>
				Book on WhatsApp
			</a>
			<a href="/availability" class="btn btn-secondary btn-lg">Check availability</a>
		</div>
	</div>
</section>

<section id="fleet" class="container-fb py-20">
	<div class="text-center">
		<p class="text-sm font-semibold tracking-widest text-(--color-gray) uppercase">Our fleet</p>
		<h2 class="font-heading mt-2 text-3xl">Scooters available in Tamraght</h2>
		<div class="divider"></div>
		<p class="mx-auto mt-4 max-w-xl text-(--color-dark)/70">
			A small fleet, ready for Taghazout surf spots and the coast road in between.
		</p>
	</div>

	<div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.scooters as scooter, i (scooter.id)}
			<article
				class="group overflow-hidden rounded-[var(--radius-fb-lg)] bg-white shadow-[var(--shadow-fb-sm)] transition hover:shadow-[var(--shadow-fb-md)]"
			>
				<div class="relative">
					<img
						src={fleetImages[i % fleetImages.length]}
						alt={`${scooter.name} scooter lifestyle photo`}
						class="h-48 w-full object-cover"
					/>
					{#if i === 0}
						<span
							class="absolute top-3 left-3 rounded-full bg-(--color-green) px-3 py-1 text-xs font-semibold text-(--color-beige)"
						>
							Most popular
						</span>
					{/if}
				</div>
				<div class="p-6">
					<h3 class="font-heading text-lg">{scooter.name}</h3>
					<p class="text-sm font-medium text-(--color-orange-dark)">{scooter.model}</p>
					<p class="mt-3 text-sm text-(--color-dark)/70">{scooter.description}</p>

					<div class="mt-4 flex items-center gap-4 text-xs text-(--color-gray)">
						<span>⚡ Electric</span>
						<span>&mdash;</span>
						<span>🪪 License required</span>
					</div>

					<div class="mt-5 flex items-baseline justify-between border-t border-(--color-light-gray) pt-5">
						<div>
							<span class="text-2xl font-extrabold text-(--color-green)">{scooter.price_per_day}</span>
							<span class="text-sm text-(--color-gray)">MAD / day</span>
						</div>
					</div>

					<a
						href={scooterWaLink(scooter.name)}
						target="_blank"
						rel="noopener"
						class="btn btn-whatsapp mt-4 w-full"
					>
						Book on WhatsApp
					</a>
				</div>
			</article>
		{/each}
	</div>
	<p class="mt-8 text-center text-xs text-(--color-gray)">
		Photos coming soon &mdash; placeholders shown above until real photos are added.
	</p>
</section>

<section id="how-it-works" class="bg-(--color-beige-dark) py-20">
	<div class="container-fb">
		<div class="text-center">
			<p class="text-sm font-semibold tracking-widest text-(--color-gray) uppercase">Process</p>
			<h2 class="font-heading mt-2 text-3xl">How booking works</h2>
			<div class="divider"></div>
		</div>
		<div class="mt-14 grid gap-10 sm:grid-cols-3">
			<div class="text-center">
				<div
					class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--color-green) text-lg font-bold text-(--color-beige)"
				>
					1
				</div>
				<h3 class="mt-4 font-semibold text-(--color-green)">Pick your scooter &amp; dates</h3>
				<p class="mt-2 text-sm text-(--color-dark)/70">
					Check the <a href="/availability" class="text-(--color-orange-dark) underline">availability page</a>
					and choose a free date range.
				</p>
			</div>
			<div class="text-center">
				<div
					class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--color-green) text-lg font-bold text-(--color-beige)"
				>
					2
				</div>
				<h3 class="mt-4 font-semibold text-(--color-green)">Message us on WhatsApp</h3>
				<p class="mt-2 text-sm text-(--color-dark)/70">
					Tap any "Book on WhatsApp" button &mdash; it opens a chat with your request pre-filled.
				</p>
			</div>
			<div class="text-center">
				<div
					class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--color-green) text-lg font-bold text-(--color-beige)"
				>
					3
				</div>
				<h3 class="mt-4 font-semibold text-(--color-green)">Confirm &amp; ride</h3>
				<p class="mt-2 text-sm text-(--color-dark)/70">
					We confirm your dates and pickup details directly over WhatsApp.
				</p>
			</div>
		</div>
	</div>
</section>

<section id="pricing" class="container-fb py-20 text-center">
	<p class="text-sm font-semibold tracking-widest text-(--color-gray) uppercase">Pricing</p>
	<h2 class="font-heading mt-2 text-3xl">Simple daily rates</h2>
	<div class="divider"></div>
	<p class="mt-4 text-(--color-dark)/70">No hidden fees.</p>
	<div class="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
		<div class="rounded-[var(--radius-fb-lg)] bg-white p-8 text-left shadow-[var(--shadow-fb-sm)]">
			<p class="text-sm font-semibold text-(--color-orange-dark)">City Cruiser</p>
			<p class="mt-2 text-4xl font-extrabold text-(--color-green)">150 MAD</p>
			<p class="text-sm text-(--color-gray)">per day</p>
			<p class="mt-4 text-sm text-(--color-dark)/70">Comfortable and light &mdash; ideal for beach-to-town rides.</p>
		</div>
		<div class="rounded-[var(--radius-fb-lg)] bg-white p-8 text-left shadow-[var(--shadow-fb-sm)]">
			<p class="text-sm font-semibold text-(--color-orange-dark)">Long Range</p>
			<p class="mt-2 text-4xl font-extrabold text-(--color-green)">200 MAD</p>
			<p class="text-sm text-(--color-gray)">per day</p>
			<p class="mt-4 text-sm text-(--color-dark)/70">Bigger battery for longer surf-spot-hopping days.</p>
		</div>
	</div>
</section>

<section id="faq" class="bg-(--color-beige-dark) py-20">
	<div class="container-fb max-w-3xl">
		<div class="text-center">
			<p class="text-sm font-semibold tracking-widest text-(--color-gray) uppercase">FAQ</p>
			<h2 class="font-heading mt-2 text-3xl">Frequently asked questions</h2>
			<div class="divider"></div>
		</div>
		<dl class="mt-12 space-y-8">
			{#each faqs as faq}
				<div class="border-b border-(--color-light-gray) pb-8">
					<dt class="font-semibold text-(--color-green)">{faq.q}</dt>
					<dd class="mt-2 text-sm text-(--color-dark)/70">{faq.a}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<section class="py-20">
	<div class="container-fb text-center">
		<p class="text-sm font-semibold tracking-widest text-(--color-gray) uppercase">Scenery</p>
		<h2 class="font-heading mt-2 text-3xl">Where you'll ride</h2>
		<div class="divider"></div>
		<p class="mx-auto mt-4 max-w-xl text-(--color-dark)/70">
			Coast roads, argan trails and the Atlas foothills &mdash; all within reach from Tamraght.
		</p>
	</div>
	<div class="mt-10 grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-6">
		{#each galleryImages as src (src)}
			<div class="aspect-square overflow-hidden">
				<img
					{src}
					alt="Scenery near Tamraght and Taghazout"
					class="h-full w-full object-cover transition duration-300 hover:scale-105"
				/>
			</div>
		{/each}
	</div>
</section>

<section class="container-fb py-20 text-center">
	<h2 class="font-heading text-3xl">Ready to ride?</h2>
	<div class="divider"></div>
	<p class="mx-auto mt-4 max-w-xl text-(--color-dark)/70">
		Message us on WhatsApp now &mdash; we'll help you pick the right scooter and confirm your dates.
	</p>
	<a
		href={waLink(`Hi! I'd like to rent a scooter from ${BUSINESS_NAME}.`)}
		target="_blank"
		rel="noopener"
		class="btn btn-whatsapp btn-lg mt-8"
	>
		Book on WhatsApp
	</a>
</section>
