<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { BUSINESS_NAME, OWNER_INSTAGRAM_HANDLE, GOOGLE_REVIEW_URL, TRIPADVISOR_URL, HERO_IMAGE } from '$lib/config';
	import { waLink } from '$lib/whatsapp';
	import { reveal } from '$lib/actions/reveal';
	import { currentTranslation } from '$lib/i18n/store.svelte';

	let t = $derived(currentTranslation());

	function packageWaLink(tierLabel: string): string {
		return waLink(t.messages.packageAsk(BUSINESS_NAME, tierLabel));
	}

	const fleetImages = [
		'/images/fleet-bike-sunset-atlas.jpg',
		'/images/fleet-bike-sunset-sky.jpg',
		'/images/rockrider-e-expl-500s-lifestyle.jpg'
	];

	// Real pricing, captain-confirmed: 1 day 200 MAD, 4-7 days 150 MAD, 11+ days 130 MAD.
	const pricePerDay = [200, 150, 130];

	let packages = $derived(
		t.packages.tiers.map((tier, i) => ({
			...tier,
			pricePerDay: pricePerDay[i],
			image: fleetImages[i],
			popular: i === 1
		}))
	);

	const whyChooseUsImages = [
		'/images/fleet-bike-sunset-atlas.jpg',
		'/images/rockrider-e-expl-500s-lifestyle.jpg',
		'/images/fleet-bike-sunset-sky.jpg',
		'/images/berber-village.jpg'
	];

	const galleryImages = [
		'/images/gallery-argan-trail.jpg',
		'/images/gallery-rocks-sunset.jpg',
		'/images/gallery-sunset-cheers.jpg',
		'/images/anti-atlas.jpg',
		'/images/atlas-road.jpg',
		'/images/berber-village.jpg'
	];
</script>

<SeoHead
	title="Rent a Scooter in Tamraght & Taghazout | Filio's Bike"
	description="Electric scooter rental in Tamraght and Taghazout, Morocco. Easy WhatsApp booking, flexible dates. Rent a scooter for surf trips, beach rides and town runs."
/>

<section class="hero-fb" style="background-image: url('{HERO_IMAGE}');">
	<div class="hero-fb-content">
		<p class="text-sm font-semibold tracking-widest uppercase">{t.hero.location}</p>
		<h1 class="mx-auto mt-4 max-w-3xl text-4xl sm:text-6xl">
			{t.hero.title}
		</h1>
		<p class="hero-fb-subtitle mx-auto mt-4 max-w-xl text-lg font-light">
			{t.hero.subtitle}
		</p>
		<div class="hero-fb-buttons mt-10">
			<a
				href={waLink(t.messages.generic(BUSINESS_NAME))}
				target="_blank"
				rel="noopener"
				class="btn btn-whatsapp btn-lg"
			>
				<span>💬</span>
				<span>{t.common.book_whatsapp}</span>
			</a>
			<a href="/availability" class="btn btn-secondary btn-lg">{t.common.check_availability}</a>
		</div>
	</div>
	<div class="hero-fb-scroll">{t.hero.scroll}</div>
</section>

<!-- Offers / Packages: right after the hero, per captain's requested order. -->
<section id="fleet" class="section-fb bg-white">
	<div class="container-fb">
		<div class="mx-auto max-w-[750px] text-center" use:reveal>
			<p class="section-tag">{t.packages.tag}</p>
			<h2 class="mt-4 text-3xl">{t.packages.heading}</h2>
			<div class="divider"></div>
			<p class="mt-4 text-(--color-gray)">
				{t.packages.subtitle}
			</p>
		</div>

		<div class="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each packages as pkg (pkg.label)}
				<article class="card-fb" use:reveal>
					<div class="card-fb-image">
						<img src={pkg.image} alt={`${pkg.label} scooter rental package`} />
						{#if pkg.popular}
							<span class="card-fb-badge">{t.packages.popular}</span>
						{/if}
					</div>
					<div class="card-fb-body">
						<h3 class="card-fb-title">{pkg.label}</h3>
						<p class="text-sm font-medium text-(--color-orange-dark)">{pkg.tag}</p>
						<p class="mt-3 text-sm text-(--color-gray)">{pkg.desc}</p>

						<div class="card-fb-footer">
							<div class="flex items-baseline gap-2">
								<span class="card-fb-price">{pkg.pricePerDay} MAD</span>
								<span class="card-fb-price-unit">{t.common.per_day}</span>
							</div>
							<a href={packageWaLink(pkg.label)} target="_blank" rel="noopener" class="btn btn-whatsapp">
								<span>💬</span>
								<span>{t.common.book_whatsapp}</span>
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>
		<p class="mt-8 text-center text-xs text-(--color-gray)">
			{t.packages.footnote_pre}
			<a href="/availability" class="underline">{t.common.live_availability}</a>
			{t.packages.footnote_post}
		</p>

		<div class="mt-8 text-center" use:reveal>
			<a
				href={waLink(t.messages.generic(BUSINESS_NAME))}
				target="_blank"
				rel="noopener"
				class="btn btn-whatsapp btn-lg"
			>
				<span>💬</span>
				<span>{t.common.book_whatsapp}</span>
			</a>
		</div>
	</div>
</section>

<section id="how-it-works" class="section-fb bg-(--color-beige-dark)">
	<div class="container-fb">
		<div class="mx-auto max-w-[750px] text-center" use:reveal>
			<p class="section-tag">{t.how_it_works.tag}</p>
			<h2 class="mt-4 text-3xl">{t.how_it_works.heading}</h2>
			<div class="divider"></div>
		</div>
		<div class="mt-14 grid gap-10 sm:grid-cols-3">
			<div class="text-center" use:reveal>
				<div
					class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--color-green) text-lg font-bold text-(--color-beige)"
				>
					1
				</div>
				<h3 class="mt-4 font-semibold text-(--color-green)">{t.how_it_works.steps[0].title}</h3>
				<p class="mt-2 text-sm text-(--color-gray)">
					{t.how_it_works.step1_pre}
					<a href="/availability" class="text-(--color-orange-dark) underline">{t.common.availability_page}</a>
					{t.how_it_works.step1_post}
				</p>
			</div>
			<div class="text-center" use:reveal>
				<div
					class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--color-green) text-lg font-bold text-(--color-beige)"
				>
					2
				</div>
				<h3 class="mt-4 font-semibold text-(--color-green)">{t.how_it_works.steps[1].title}</h3>
				<p class="mt-2 text-sm text-(--color-gray)">
					{t.how_it_works.steps[1].desc}
				</p>
			</div>
			<div class="text-center" use:reveal>
				<div
					class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--color-green) text-lg font-bold text-(--color-beige)"
				>
					3
				</div>
				<h3 class="mt-4 font-semibold text-(--color-green)">{t.how_it_works.steps[2].title}</h3>
				<p class="mt-2 text-sm text-(--color-gray)">
					{t.how_it_works.steps[2].desc}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Why choose us: photo-led, moved below Offers + How it works per captain's request.
     Placeholder photos/copy — captain will supply real photos + captions to swap in. -->
<section class="section-fb bg-white">
	<div class="container-fb">
		<div class="mx-auto max-w-[750px] text-center" use:reveal>
			<p class="section-tag">{t.why_choose_us.tag}</p>
			<h2 class="mt-4 text-3xl">{t.why_choose_us.heading}</h2>
			<div class="divider"></div>
			<p class="mt-4 text-(--color-gray)">{t.why_choose_us.intro}</p>
		</div>
		<div class="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{#each t.why_choose_us.items as item, i (i)}
				<div class="card-fb" use:reveal>
					<div class="card-fb-image">
						<img src={whyChooseUsImages[i]} alt={item.title} />
					</div>
					<div class="card-fb-body">
						<h3 class="text-base font-semibold text-(--color-green)">{item.title}</h3>
						<p class="mt-2 text-sm text-(--color-gray)">{item.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Reviews: honest prompt only, no fabricated ratings/counts — the business has no
     real Google/TripAdvisor listing yet, these link out to placeholder URLs (see
     GOOGLE_REVIEW_URL / TRIPADVISOR_URL in src/lib/config.ts). -->
<section id="reviews" class="section-fb bg-(--color-beige-dark)">
	<div class="container-fb text-center">
		<div class="mx-auto max-w-[750px]" use:reveal>
			<p class="section-tag">{t.reviews.tag}</p>
			<h2 class="mt-4 text-3xl">{t.reviews.heading}</h2>
			<div class="divider"></div>
			<p class="mt-4 text-(--color-gray)">{t.reviews.subtitle}</p>
		</div>
		<div class="mx-auto mt-14 grid max-w-2xl gap-6 sm:grid-cols-2">
			<a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener" class="review-card" use:reveal>
				<div class="review-icon review-icon-google">
					<span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span>
				</div>
				<span class="font-semibold text-(--color-green)">{t.reviews.google}</span>
			</a>
			<a href={TRIPADVISOR_URL} target="_blank" rel="noopener" class="review-card" use:reveal>
				<div class="review-icon review-icon-tripadvisor">🦉</div>
				<span class="font-semibold text-(--color-green)">{t.reviews.tripadvisor}</span>
			</a>
		</div>
	</div>
</section>

<section id="faq" class="section-fb bg-white">
	<div class="container-fb max-w-3xl text-center">
		<div use:reveal>
			<p class="section-tag">{t.faq.tag}</p>
			<h2 class="mt-4 text-3xl">{t.faq.heading}</h2>
			<div class="divider"></div>
		</div>
		<dl class="mt-12 space-y-8 text-start" use:reveal>
			{#each t.faq.items as faq, i (i)}
				<div class="border-b border-(--color-light-gray) pb-8">
					<dt class="font-semibold text-(--color-green)">{faq.q}</dt>
					<dd class="mt-2 text-sm text-(--color-gray)">{faq.a}</dd>
				</div>
			{/each}
		</dl>
		<div class="mt-10" use:reveal>
			<p class="mb-4 text-sm text-(--color-gray)">{t.faq.cta}</p>
			<a
				href={waLink(t.messages.generic(BUSINESS_NAME))}
				target="_blank"
				rel="noopener"
				class="btn btn-whatsapp"
			>
				<span>💬</span>
				<span>{t.common.book_whatsapp}</span>
			</a>
		</div>
	</div>
</section>

<section class="section-fb bg-(--color-beige-dark)">
	<div class="container-fb text-center">
		<div class="mx-auto max-w-[750px]" use:reveal>
			<p class="section-tag">{t.instagram.tag}</p>
			<h2 class="mt-4 text-3xl">{t.instagram.heading}</h2>
			<p class="mt-4 text-(--color-gray)">
				@{OWNER_INSTAGRAM_HANDLE} {t.instagram.subtitle}
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
			{t.instagram.follow} @{OWNER_INSTAGRAM_HANDLE}
		</a>
	</div>
</section>

<section class="section-fb bg-white text-center">
	<div class="container-fb" use:reveal>
		<h2 class="text-3xl">{t.cta.heading}</h2>
		<div class="divider"></div>
		<p class="mx-auto mt-4 max-w-xl text-(--color-gray)">
			{t.cta.subtitle}
		</p>
		<a
			href={waLink(t.messages.generic(BUSINESS_NAME))}
			target="_blank"
			rel="noopener"
			class="btn btn-whatsapp btn-lg mt-8"
		>
			<span>💬</span>
			<span>{t.common.book_whatsapp}</span>
		</a>
	</div>
</section>
