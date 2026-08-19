<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { BUSINESS_NAME, OWNER_INSTAGRAM_HANDLE } from '$lib/config';
	import { waLink } from '$lib/whatsapp';
	import { reveal } from '$lib/actions/reveal';

	function packageWaLink(tierLabel: string): string {
		return waLink(`Hi! I'd like to rent a scooter from ${BUSINESS_NAME} for ${tierLabel}. Is it available?`);
	}

	const fleetImages = [
		'/images/fleet-bike-sunset-atlas.jpg',
		'/images/fleet-bike-sunset-sky.jpg',
		'/images/rockrider-e-expl-500s-lifestyle.jpg'
	];

	const packages = [
		{
			label: '1-3 Days',
			tag: 'Short trip',
			pricePerDay: 150,
			description: 'Perfect for a quick surf trip or a long weekend cruising the coast.',
			image: fleetImages[0]
		},
		{
			label: '4-7 Days',
			tag: 'Week-long',
			pricePerDay: 130,
			description: 'Our most popular option — a full week to explore Tamraght and Taghazout.',
			image: fleetImages[1],
			popular: true
		},
		{
			label: '11+ Days',
			tag: 'Extended stay',
			pricePerDay: 110,
			description: 'Best per-day rate for longer stays along the coast.',
			image: fleetImages[2]
		}
	];

	const galleryImages = [
		'/images/gallery-argan-trail.jpg',
		'/images/gallery-rocks-sunset.jpg',
		'/images/gallery-sunset-cheers.jpg',
		'/images/anti-atlas.jpg',
		'/images/atlas-road.jpg',
		'/images/berber-village.jpg'
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

<section class="hero-fb" style="background-image: url('/images/hero-canyon.jpg');">
	<div class="hero-fb-content">
		<p class="text-sm font-semibold tracking-widest uppercase">Tamraght &mdash; Taghazout &mdash; Morocco</p>
		<h1 class="mx-auto mt-4 max-w-3xl text-4xl sm:text-6xl">
			Rent an electric scooter in Tamraght &amp; Taghazout
		</h1>
		<p class="hero-fb-subtitle mx-auto mt-4 max-w-xl text-lg font-light">
			Fast, easy e-scooter rental for surf trips, beach cruising and getting around town. Message
			us on WhatsApp and we'll confirm your dates &mdash; just like booking with a friend.
		</p>
		<div class="hero-fb-buttons mt-10">
			<a
				href={waLink(`Hi! I'd like to rent a scooter from ${BUSINESS_NAME}.`)}
				target="_blank"
				rel="noopener"
				class="btn btn-whatsapp btn-lg"
			>
				<span>💬</span>
				<span>Book on WhatsApp</span>
			</a>
			<a href="/availability" class="btn btn-secondary btn-lg">Check availability</a>
		</div>
	</div>
	<div class="hero-fb-scroll">Scroll</div>
</section>

<section class="section-fb bg-white">
	<div class="container-fb">
	<div class="mx-auto max-w-[750px] text-center" use:reveal>
		<p class="section-tag">Why book with us</p>
		<h2 class="mt-4 text-3xl">Easy, local, no-hassle rental</h2>
		<div class="divider"></div>
	</div>
	<div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		<div class="feature-fb" use:reveal>
			<div class="feature-fb-icon">📍</div>
			<h3 class="text-base">Local pickup</h3>
			<p class="mt-2 text-sm text-(--color-gray)">Pickup in Tamraght, minutes from Taghazout.</p>
		</div>
		<div class="feature-fb" use:reveal>
			<div class="feature-fb-icon">🛵</div>
			<h3 class="text-base">Well-maintained scooters</h3>
			<p class="mt-2 text-sm text-(--color-gray)">Electric, comfortable, ready for coast and town rides.</p>
		</div>
		<div class="feature-fb" use:reveal>
			<div class="feature-fb-icon">📅</div>
			<h3 class="text-base">Flexible dates</h3>
			<p class="mt-2 text-sm text-(--color-gray)">Check live availability and book the dates you need.</p>
		</div>
		<div class="feature-fb" use:reveal>
			<div class="feature-fb-icon">💬</div>
			<h3 class="text-base">WhatsApp support</h3>
			<p class="mt-2 text-sm text-(--color-gray)">Questions before or during your rental? Message us directly.</p>
		</div>
	</div>
	</div>
</section>

<section id="fleet" class="section-fb bg-(--color-beige-dark)">
	<div class="container-fb">
		<div class="mx-auto max-w-[750px] text-center" use:reveal>
			<p class="section-tag">Packages</p>
			<h2 class="mt-4 text-3xl">Rental packages</h2>
			<div class="divider"></div>
			<p class="mt-4 text-(--color-gray)">
				The longer you ride, the less you pay per day.
			</p>
		</div>

		<div class="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each packages as pkg (pkg.label)}
				<article class="card-fb" use:reveal>
					<div class="card-fb-image">
						<img src={pkg.image} alt={`${pkg.label} scooter rental package`} />
						{#if pkg.popular}
							<span class="card-fb-badge">Most popular</span>
						{/if}
					</div>
					<div class="card-fb-body">
						<h3 class="card-fb-title">{pkg.label}</h3>
						<p class="text-sm font-medium text-(--color-orange-dark)">{pkg.tag}</p>
						<p class="mt-3 text-sm text-(--color-gray)">{pkg.description}</p>

						<div class="card-fb-footer">
							<div class="flex items-baseline gap-2">
								<span class="card-fb-price">{pkg.pricePerDay} MAD</span>
								<span class="card-fb-price-unit">/ day</span>
							</div>
							<a href={packageWaLink(pkg.label)} target="_blank" rel="noopener" class="btn btn-whatsapp">
								<span>💬</span>
								<span>Book on WhatsApp</span>
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>
		<p class="mt-8 text-center text-xs text-(--color-gray)">
			Rates shown per scooter, per day. Check <a href="/availability" class="underline">live availability</a>
			for our current fleet.
		</p>
	</div>
</section>

<section id="how-it-works" class="section-fb bg-white">
	<div class="container-fb">
		<div class="mx-auto max-w-[750px] text-center" use:reveal>
			<p class="section-tag">Process</p>
			<h2 class="mt-4 text-3xl">How booking works</h2>
			<div class="divider"></div>
		</div>
		<div class="mt-14 grid gap-10 sm:grid-cols-3">
			<div class="text-center" use:reveal>
				<div
					class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--color-green) text-lg font-bold text-(--color-beige)"
				>
					1
				</div>
				<h3 class="mt-4 font-semibold text-(--color-green)">Pick your scooter &amp; dates</h3>
				<p class="mt-2 text-sm text-(--color-gray)">
					Check the <a href="/availability" class="text-(--color-orange-dark) underline">availability page</a>
					and choose a free date range.
				</p>
			</div>
			<div class="text-center" use:reveal>
				<div
					class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--color-green) text-lg font-bold text-(--color-beige)"
				>
					2
				</div>
				<h3 class="mt-4 font-semibold text-(--color-green)">Message us on WhatsApp</h3>
				<p class="mt-2 text-sm text-(--color-gray)">
					Tap any "Book on WhatsApp" button &mdash; it opens a chat with your request pre-filled.
				</p>
			</div>
			<div class="text-center" use:reveal>
				<div
					class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--color-green) text-lg font-bold text-(--color-beige)"
				>
					3
				</div>
				<h3 class="mt-4 font-semibold text-(--color-green)">Confirm &amp; ride</h3>
				<p class="mt-2 text-sm text-(--color-gray)">
					We confirm your dates and pickup details directly over WhatsApp.
				</p>
			</div>
		</div>
	</div>
</section>

<section id="pricing" class="section-fb bg-(--color-beige-dark) text-center">
	<div class="container-fb">
		<div class="mx-auto max-w-[750px]" use:reveal>
			<p class="section-tag">Pricing</p>
			<h2 class="mt-4 text-3xl">Simple daily rates</h2>
			<div class="divider"></div>
			<p class="mt-4 text-(--color-gray)">No hidden fees.</p>
		</div>
		<div class="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
			<div class="card-fb p-8 text-left" use:reveal>
				<p class="text-sm font-semibold text-(--color-orange-dark)">City Cruiser</p>
				<p class="card-fb-price mt-2 text-4xl">150 MAD</p>
				<p class="text-sm text-(--color-gray)">per day</p>
				<p class="mt-4 text-sm text-(--color-gray)">Comfortable and light &mdash; ideal for beach-to-town rides.</p>
			</div>
			<div class="card-fb p-8 text-left" use:reveal>
				<p class="text-sm font-semibold text-(--color-orange-dark)">Long Range</p>
				<p class="card-fb-price mt-2 text-4xl">200 MAD</p>
				<p class="text-sm text-(--color-gray)">per day</p>
				<p class="mt-4 text-sm text-(--color-gray)">Bigger battery for longer surf-spot-hopping days.</p>
			</div>
		</div>
	</div>
</section>

<section id="faq" class="section-fb bg-white">
	<div class="container-fb max-w-3xl">
		<div class="text-center" use:reveal>
			<p class="section-tag">FAQ</p>
			<h2 class="mt-4 text-3xl">Frequently asked questions</h2>
			<div class="divider"></div>
		</div>
		<dl class="mt-12 space-y-8" use:reveal>
			{#each faqs as faq}
				<div class="border-b border-(--color-light-gray) pb-8">
					<dt class="font-semibold text-(--color-green)">{faq.q}</dt>
					<dd class="mt-2 text-sm text-(--color-gray)">{faq.a}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<section class="section-fb bg-(--color-beige-dark)">
	<div class="container-fb text-center">
		<div class="mx-auto max-w-[750px]" use:reveal>
			<p class="section-tag">Instagram</p>
			<h2 class="mt-4 text-3xl">Follow the ride live</h2>
			<p class="mt-4 text-(--color-gray)">
				@{OWNER_INSTAGRAM_HANDLE} &mdash; photos, videos and behind the scenes.
			</p>
			<div class="divider"></div>
		</div>
		<div class="insta-grid" use:reveal>
			{#each galleryImages as src (src)}
				<div class="insta-card" style="background-image: url('{src}');">
					<span class="insta-overlay">📷</span>
				</div>
			{/each}
		</div>
		<a
			href="https://instagram.com/{OWNER_INSTAGRAM_HANDLE}"
			target="_blank"
			rel="noopener"
			class="btn btn-primary mt-8"
		>
			Follow @{OWNER_INSTAGRAM_HANDLE}
		</a>
	</div>
</section>

<section class="section-fb bg-white text-center">
	<div class="container-fb" use:reveal>
		<h2 class="text-3xl">Ready to ride?</h2>
		<div class="divider"></div>
		<p class="mx-auto mt-4 max-w-xl text-(--color-gray)">
			Message us on WhatsApp now &mdash; we'll help you pick the right scooter and confirm your dates.
		</p>
		<a
			href={waLink(`Hi! I'd like to rent a scooter from ${BUSINESS_NAME}.`)}
			target="_blank"
			rel="noopener"
			class="btn btn-whatsapp btn-lg mt-8"
		>
			<span>💬</span>
			<span>Book on WhatsApp</span>
		</a>
	</div>
</section>
