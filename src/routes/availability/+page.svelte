<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
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
</script>

<SeoHead
	title="Scooter Availability in Tamraght & Taghazout | Filio's Bike"
	description="Check which electric scooters are free on which dates in Tamraght and Taghazout, Morocco. Live availability calendar for scooter rental."
	path="/availability"
/>

<section class="mx-auto max-w-5xl px-4 py-12">
	<h1 class="text-3xl font-bold text-stone-900">Scooter availability</h1>
	<p class="mt-2 text-stone-600">
		Green = free, red = already booked. Showing the next {DAYS_AHEAD} days for our scooters in Tamraght
		&amp; Taghazout.
	</p>

	<div class="mt-8 overflow-x-auto">
		<table class="w-full border-collapse text-sm">
			<thead>
				<tr>
					<th class="sticky left-0 bg-stone-50 px-3 py-2 text-left font-semibold text-stone-700"
						>Scooter</th
					>
					{#each days as day (day.toISOString())}
						<th class="whitespace-nowrap px-2 py-2 text-center font-medium text-stone-500">
							{dayLabel(day)}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each data.scooters as scooter (scooter.id)}
					<tr class="border-t border-stone-200">
						<td class="sticky left-0 whitespace-nowrap bg-stone-50 px-3 py-2 font-medium text-stone-900">
							{scooter.name}
							<span class="block text-xs font-normal text-stone-500">{scooter.model}</span>
						</td>
						{#each days as day (day.toISOString())}
							{@const booked = isBooked(scooter.id, day)}
							<td class="px-1 py-2 text-center">
								<span
									class="inline-block h-4 w-4 rounded-sm {booked
										? 'bg-red-400'
										: 'bg-green-400'}"
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

	<div class="mt-8 text-center">
		<a
			href="/reserve"
			class="inline-block rounded-full bg-amber-700 px-6 py-3 font-semibold text-white hover:bg-amber-800"
		>
			Reserve a scooter
		</a>
	</div>
</section>
