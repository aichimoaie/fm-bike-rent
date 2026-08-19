<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { BUSINESS_NAME } from '$lib/config';
	import { waLink } from '$lib/whatsapp';
	import { reveal } from '$lib/actions/reveal';
	import { currentTranslation, getLang } from '$lib/i18n/store.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let t = $derived(currentTranslation());

	const LOCALE_MAP: Record<string, string> = {
		en: 'en-GB',
		fr: 'fr-FR',
		nl: 'nl-NL',
		de: 'de-DE',
		es: 'es-ES',
		it: 'it-IT',
		ar: 'ar-MA'
	};

	const DAYS_AHEAD = 21;

	function toISODate(d: Date): string {
		return d.toISOString().slice(0, 10);
	}

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const days = Array.from({ length: DAYS_AHEAD }, (_, i) => {
		const d = new Date(today);
		d.setDate(d.getDate() + i);
		return d;
	});

	function isBooked(scooterId: string, date: Date): boolean {
		const iso = toISODate(date);
		return data.reservations.some(
			(r) =>
				r.scooter_id === scooterId &&
				r.status !== 'cancelled' &&
				r.start_date <= iso &&
				r.end_date >= iso
		);
	}

	function dayLabel(d: Date): string {
		const locale = LOCALE_MAP[getLang()] ?? 'en-GB';
		return d.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' });
	}

	let scooterId = $state(data.scooters[0]?.id || '');
	let startDate = $state('');
	let endDate = $state('');
	let submitting = $state(false);
	let errorMessage = $state('');

	async function handleBook(e: SubmitEvent) {
		e.preventDefault();
		errorMessage = '';

		const scooter = data.scooters.find((s) => s.id === scooterId);
		if (!scooter) return;

		if (!startDate || !endDate) {
			const href = waLink(t.messages.scooterAsk(BUSINESS_NAME, scooter.name));
			window.open(href, '_blank', 'noopener');
			return;
		}

		submitting = true;
		try {
			const res = await fetch('/api/reservations', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					scooterId,
					customerName: 'WhatsApp booking',
					customerPhone: 'via WhatsApp',
					startDate,
					endDate
				})
			});
			const body = await res.json();

			if (!res.ok) {
				errorMessage = body.error ?? t.availability.error_generic;
				return;
			}

			const href = waLink(t.messages.bookingDates(BUSINESS_NAME, scooter.name, startDate, endDate));
			window.open(href, '_blank', 'noopener');
		} catch {
			errorMessage = t.availability.error_network;
		} finally {
			submitting = false;
		}
	}
</script>

<SeoHead
	title="Scooter Availability in Tamraght & Taghazout | Filio's Bike"
	description="Check which electric scooters are free on which dates in Tamraght and Taghazout, Morocco. Live availability calendar for scooter rental."
	path="/availability"
/>

<section class="page-header-fb">
	<div class="container-fb">
		<h1 class="text-3xl">{t.availability.title}</h1>
		<p>
			{t.availability.subtitle(DAYS_AHEAD)}
		</p>
	</div>
</section>

<section class="section-fb container-fb">
	<div
		class="overflow-x-auto rounded-[var(--radius-fb-lg)] bg-white p-2 shadow-[var(--shadow-fb-sm)]"
		use:reveal
	>
		<table class="w-full border-collapse text-sm">
			<thead>
				<tr>
					<th class="sticky left-0 bg-white px-3 py-2 text-left font-semibold text-(--color-green)"
						>{t.availability.scooter_col}</th
					>
					{#each days as day (day.toISOString())}
						<th class="whitespace-nowrap px-2 py-2 text-center font-medium text-(--color-gray)">
							{dayLabel(day)}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each data.scooters as scooter (scooter.id)}
					<tr class="border-t border-(--color-light-gray)">
						<td class="sticky left-0 whitespace-nowrap bg-white px-3 py-2 font-medium text-(--color-dark)">
							{scooter.name}
							<span class="block text-xs font-normal text-(--color-gray)">{scooter.model}</span>
						</td>
						{#each days as day (day.toISOString())}
							{@const booked = isBooked(scooter.id, day)}
							<td class="px-1 py-2 text-center">
								<span
									class="inline-block h-4 w-4 rounded-sm {booked ? 'bg-red-400' : 'bg-green-500'}"
									title={booked ? t.availability.booked : t.availability.free}
									aria-label={booked ? t.availability.booked : t.availability.free}
								></span>
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div
		class="mx-auto mt-12 max-w-lg rounded-[var(--radius-fb-lg)] bg-white p-8 shadow-[var(--shadow-fb-sm)]"
		use:reveal
	>
		<h2 class="font-heading text-xl">{t.availability.booking_title}</h2>
		<p class="mt-2 text-sm text-(--color-dark)/70">
			{t.availability.booking_subtitle}
		</p>
		<form class="mt-6 space-y-4" onsubmit={handleBook}>
			<div>
				<label for="scooter" class="block text-sm font-medium text-(--color-dark)">{t.availability.scooter_label}</label>
				<select
					id="scooter"
					bind:value={scooterId}
					class="mt-1 w-full rounded-[var(--radius-fb)] border border-(--color-light-gray) px-3 py-2"
				>
					{#each data.scooters as scooter (scooter.id)}
						<option value={scooter.id}>{scooter.name} &mdash; {scooter.model} ({scooter.price_per_day} MAD/day)</option>
					{/each}
				</select>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div>
					<label for="start" class="block text-sm font-medium text-(--color-dark)">{t.availability.start_label}</label>
					<input
						id="start"
						type="date"
						bind:value={startDate}
						class="mt-1 w-full rounded-[var(--radius-fb)] border border-(--color-light-gray) px-3 py-2"
					/>
				</div>
				<div>
					<label for="end" class="block text-sm font-medium text-(--color-dark)">{t.availability.end_label}</label>
					<input
						id="end"
						type="date"
						bind:value={endDate}
						class="mt-1 w-full rounded-[var(--radius-fb)] border border-(--color-light-gray) px-3 py-2"
					/>
				</div>
			</div>

			{#if errorMessage}
				<p class="rounded-[var(--radius-fb)] bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
			{/if}

			<button type="submit" disabled={submitting} class="btn btn-whatsapp w-full disabled:opacity-50">
				{#if !submitting}<span>💬</span>{/if}
				<span>{submitting ? t.availability.preparing : t.availability.submit}</span>
			</button>
		</form>
	</div>
</section>
