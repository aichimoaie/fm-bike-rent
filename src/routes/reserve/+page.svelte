<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { OWNER_WHATSAPP_NUMBER, BUSINESS_NAME } from '$lib/config';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let scooterId = $state(data.preselectedScooterId || data.scooters[0]?.id || '');
	let customerName = $state('');
	let customerPhone = $state('');
	let startDate = $state('');
	let endDate = $state('');

	let submitting = $state(false);
	let errorMessage = $state('');
	let successUrl = $state('');

	function buildWhatsAppLink(scooterName: string): string {
		const message =
			`New scooter reservation via ${BUSINESS_NAME} website:\n` +
			`Scooter: ${scooterName}\n` +
			`Dates: ${startDate} to ${endDate}\n` +
			`Name: ${customerName}\n` +
			`Phone: ${customerPhone}`;
		return `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		errorMessage = '';
		successUrl = '';

		if (!scooterId || !customerName || !customerPhone || !startDate || !endDate) {
			errorMessage = 'Please fill in all fields.';
			return;
		}

		submitting = true;
		try {
			const res = await fetch('/api/reservations', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ scooterId, customerName, customerPhone, startDate, endDate })
			});
			const body = await res.json();

			if (!res.ok) {
				errorMessage = body.error ?? 'Something went wrong. Please try again.';
				return;
			}

			const waUrl = buildWhatsAppLink(body.scooter.name);
			successUrl = waUrl;
			window.open(waUrl, '_blank', 'noopener');
		} catch {
			errorMessage = 'Network error. Please try again.';
		} finally {
			submitting = false;
		}
	}
</script>

<SeoHead
	title="Reserve a Scooter | Filio's Bike Tamraght & Taghazout"
	description="Book your electric scooter rental in Tamraght or Taghazout. Pick dates, enter your details, and confirm instantly on WhatsApp."
	path="/reserve"
/>

<section class="mx-auto max-w-lg px-4 py-12">
	<h1 class="text-3xl font-bold text-stone-900">Reserve a scooter</h1>
	<p class="mt-2 text-stone-600">
		Fill in your details below. After submitting, we'll open WhatsApp with your booking summary
		pre-filled &mdash; just hit send to confirm with us.
	</p>

	<form class="mt-8 space-y-5" onsubmit={handleSubmit}>
		<div>
			<label for="scooter" class="block text-sm font-medium text-stone-700">Scooter</label>
			<select
				id="scooter"
				bind:value={scooterId}
				class="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
				required
			>
				{#each data.scooters as scooter (scooter.id)}
					<option value={scooter.id}>{scooter.name} &mdash; {scooter.model} ({scooter.price_per_day} MAD/day)</option>
				{/each}
			</select>
		</div>

		<div class="grid grid-cols-2 gap-4">
			<div>
				<label for="start" class="block text-sm font-medium text-stone-700">Start date</label>
				<input
					id="start"
					type="date"
					bind:value={startDate}
					class="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
					required
				/>
			</div>
			<div>
				<label for="end" class="block text-sm font-medium text-stone-700">End date</label>
				<input
					id="end"
					type="date"
					bind:value={endDate}
					class="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
					required
				/>
			</div>
		</div>

		<div>
			<label for="name" class="block text-sm font-medium text-stone-700">Your name</label>
			<input
				id="name"
				type="text"
				bind:value={customerName}
				class="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
				required
			/>
		</div>

		<div>
			<label for="phone" class="block text-sm font-medium text-stone-700">Phone number</label>
			<input
				id="phone"
				type="tel"
				bind:value={customerPhone}
				placeholder="+212 6XX XXX XXX"
				class="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
				required
			/>
		</div>

		{#if errorMessage}
			<p class="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
		{/if}

		{#if successUrl}
			<div class="rounded-lg bg-green-50 px-3 py-3 text-sm text-green-800">
				<p>Reservation recorded! We opened WhatsApp for you to confirm.</p>
				<p class="mt-1">
					If it didn't open, <a href={successUrl} class="underline" target="_blank" rel="noopener"
						>tap here to open WhatsApp</a
					>.
				</p>
			</div>
		{/if}

		<button
			type="submit"
			disabled={submitting}
			class="w-full rounded-full bg-amber-700 px-6 py-3 font-semibold text-white hover:bg-amber-800 disabled:opacity-50"
		>
			{submitting ? 'Submitting…' : 'Submit & confirm on WhatsApp'}
		</button>
	</form>

	<p class="mt-4 text-center text-sm">
		<a href="/availability" class="text-amber-700 underline">Check availability first</a>
	</p>
</section>
