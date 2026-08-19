<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function statusColor(status: string): string {
		if (status === 'confirmed') return 'bg-green-100 text-green-800';
		if (status === 'cancelled') return 'bg-stone-200 text-stone-500 line-through';
		return 'bg-amber-100 text-amber-800';
	}
</script>

<svelte:head>
	<title>Admin — Reservations</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="mx-auto max-w-4xl px-4 py-12">
	<h1 class="text-3xl font-bold text-stone-900">Reservations</h1>
	<p class="mt-2 text-stone-600">
		Confirm a reservation once you've replied to the customer on WhatsApp, or cancel it to free
		up the scooter for those dates.
	</p>

	<div class="mt-8 space-y-3">
		{#each data.reservations as r (r.id)}
			<div class="flex items-center justify-between rounded-xl border border-stone-200 bg-white p-4">
				<div>
					<p class="font-semibold text-stone-900">
						{r.scooter_name} <span class="font-normal text-stone-500">({r.scooter_model})</span>
					</p>
					<p class="text-sm text-stone-600">{r.start_date} &rarr; {r.end_date}</p>
					<p class="text-sm text-stone-600">{r.customer_name} &middot; {r.customer_phone}</p>
					<span class="mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium {statusColor(r.status)}">
						{r.status}
					</span>
				</div>
				{#if r.status === 'pending'}
					<div class="flex gap-2">
						<form method="POST" action="?/confirm" use:enhance>
							<input type="hidden" name="id" value={r.id} />
							<button
								type="submit"
								class="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
							>
								Confirm
							</button>
						</form>
						<form method="POST" action="?/cancel" use:enhance>
							<input type="hidden" name="id" value={r.id} />
							<button
								type="submit"
								class="rounded-full bg-stone-200 px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-300"
							>
								Cancel
							</button>
						</form>
					</div>
				{/if}
			</div>
		{:else}
			<p class="text-stone-500">No reservations yet.</p>
		{/each}
	</div>
</section>
