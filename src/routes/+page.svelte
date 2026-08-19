<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { BUSINESS_NAME, OWNER_INSTAGRAM_HANDLE } from '$lib/config';
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

	const pricePerDay = [150, 130, 110];

	let packages = $derived(
		t.packages.tiers.map((tier, i) => ({
			...tier,
			pricePerDay: pricePerDay[i],
			image: fleetImages[i],
			popular: i === 1
		}))
	);

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

<section class="hero-fb" style="background-image: url('/images/hero-canyon.jpg');">
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

<section class="section-fb bg-white">
	<div class="container-fb">
		<div class="mx-auto max-w-[750px] text-center" use:reveal>
			<p class="section-tag">{t.features.tag}</p>
			<h2 class="mt-4 text-3xl">{t.features.heading}</h2>
			<div class="divider"></div>
		</div>
		<div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each t.features.items as item, i (i)}
				{@const icons = ['📍', '🛵', '📅', '💬']}
				<div class="feature-fb" use:reveal>
					<div class="feature-fb-icon">{icons[i]}</div>
					<h3 class="text-base">{item.title}</h3>
					<p class="mt-2 text-sm text-(--color-gray)">{item.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section id="fleet" class="section-fb bg-(--color-beige-dark)">
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
	</div>
</section>

<section id="how-it-works" class="section-fb bg-white">
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

<section id="pricing" class="section-fb bg-(--color-beige-dark) text-center">
	<div class="container-fb">
		<div class="mx-auto max-w-[750px]" use:reveal>
			<p class="section-tag">{t.pricing.tag}</p>
			<h2 class="mt-4 text-3xl">{t.pricing.heading}</h2>
			<div class="divider"></div>
			<p class="mt-4 text-(--color-gray)">{t.pricing.subtitle}</p>
		</div>
		<div class="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
			<div class="card-fb p-8 text-left" use:reveal>
				<p class="text-sm font-semibold text-(--color-orange-dark)">{t.pricing.cards[0].name}</p>
				<p class="card-fb-price mt-2 text-4xl">150 MAD</p>
				<p class="text-sm text-(--color-gray)">{t.pricing.per_day}</p>
				<p class="mt-4 text-sm text-(--color-gray)">{t.pricing.cards[0].desc}</p>
			</div>
			<div class="card-fb p-8 text-left" use:reveal>
				<p class="text-sm font-semibold text-(--color-orange-dark)">{t.pricing.cards[1].name}</p>
				<p class="card-fb-price mt-2 text-4xl">200 MAD</p>
				<p class="text-sm text-(--color-gray)">{t.pricing.per_day}</p>
				<p class="mt-4 text-sm text-(--color-gray)">{t.pricing.cards[1].desc}</p>
			</div>
		</div>
	</div>
</section>

<section id="faq" class="section-fb bg-white">
	<div class="container-fb max-w-3xl">
		<div class="text-center" use:reveal>
			<p class="section-tag">{t.faq.tag}</p>
			<h2 class="mt-4 text-3xl">{t.faq.heading}</h2>
			<div class="divider"></div>
		</div>
		<dl class="mt-12 space-y-8" use:reveal>
			{#each t.faq.items as faq, i (i)}
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
