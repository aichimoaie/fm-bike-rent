<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { BUSINESS_NAME } from '$lib/config';
	import { waLink } from '$lib/whatsapp';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

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
		return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
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
			const href = waLink(
				`Hi! I'd like to rent the ${scooter.name} from ${BUSINESS_NAME}. Is it available?`
			);
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
				errorMessage = body.error ?? 'Something went wrong. Please try again.';
				return;
			}

			const href = waLink(
				`Hi! I'd like to book the ${scooter.name} from ${BUSINESS_NAME}, ${startDate} to ${endDate}. Can you confirm?`
			);
			window.open(href, '_blank', 'noopener');
		} catch {
			errorMessage = 'Network error. Please try again.';
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

<section class="container-fb py-16">
	<h1 class="font-heading text-3xl">Scooter availability</h1>
	<div class="divider ml-0"></div>
	<p class="mt-4 text-(--color-dark)/70">
		Green = free, red = already booked. Showing the next {DAYS_AHEAD} days for our scooters in Tamraght
		&amp; Taghazout.
	</p>

	<div class="mt-8 overflow-x-auto rounded-[var(--radius-fb-lg)] bg-white p-2 shadow-[var(--shadow-fb-sm)]">
		<table class="w-full border-collapse text-sm">
			<thead>
				<tr>
					<th class="sticky left-0 bg-white px-3 py-2 text-left font-semibold text-(--color-green)"
						>Scooter</th
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
									title={booked ? 'Booked' : 'Free'}
									aria-label={booked ? 'Booked' : 'Free'}
								></span>
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="mx-auto mt-12 max-w-lg rounded-[var(--radius-fb-lg)] bg-white p-8 shadow-[var(--shadow-fb-sm)]">
		<h2 class="font-heading text-xl">Book on WhatsApp</h2>
		<p class="mt-2 text-sm text-(--color-dark)/70">
			Pick a scooter and your dates &mdash; we'll open WhatsApp with your request pre-filled.
		</p>
		<form class="mt-6 space-y-4" onsubmit={handleBook}>
			<div>
				<label for="scooter" class="block text-sm font-medium text-(--color-dark)">Scooter</label>
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
					<label for="start" class="block text-sm font-medium text-(--color-dark)">Start date</label>
					<input
						id="start"
						type="date"
						bind:value={startDate}
						class="mt-1 w-full rounded-[var(--radius-fb)] border border-(--color-light-gray) px-3 py-2"
					/>
				</div>
				<div>
					<label for="end" class="block text-sm font-medium text-(--color-dark)">End date</label>
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
				{submitting ? 'Preparing…' : 'Book on WhatsApp'}
			</button>
		</form>
	</div>
</section>
