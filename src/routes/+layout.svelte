<script lang="ts">
	import '../lib/styles/app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { BUSINESS_NAME } from '$lib/config';
	import { waLink } from '$lib/whatsapp';
	import WhatsAppFloat from '$lib/components/WhatsAppFloat.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	let menuOpen = $state(false);

	const navItems = [
		{ href: '/#fleet', label: 'Fleet' },
		{ href: '/#how-it-works', label: 'How it works' },
		{ href: '/#pricing', label: 'Pricing' },
		{ href: '/availability', label: 'Availability' },
		{ href: '/#faq', label: 'FAQ' },
		{ href: '/#contact', label: 'Contact' }
	];

	function isActive(href: string): boolean {
		if (href.startsWith('/#')) return false;
		return page.url.pathname === href;
	}

	function closeMenu() {
		menuOpen = false;
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<header
		class="fixed top-0 right-0 left-0 z-50 h-20 border-b border-black/5 shadow-sm"
		style="background: rgba(245, 238, 220, 0.95); backdrop-filter: blur(10px);"
	>
		<nav class="container-fb flex h-full items-center justify-between">
			<a href="/" class="flex items-center gap-2">
				<img src="/images/logo.png" alt={BUSINESS_NAME} class="h-10 w-10 rounded-full object-cover" />
				<span class="font-heading text-xl text-(--color-green)">{BUSINESS_NAME}</span>
			</a>

			<div class="hidden items-center gap-1 min-[861px]:flex">
				{#each navItems as item (item.href)}
					<a href={item.href} class="nav-link" class:active={isActive(item.href)}>{item.label}</a>
				{/each}
			</div>

			<div class="hidden min-[861px]:block">
				<a
					href={waLink(`Hi! I'd like to rent a scooter from ${BUSINESS_NAME}.`)}
					target="_blank"
					rel="noopener"
					class="btn btn-whatsapp"
				>
					Book on WhatsApp
				</a>
			</div>

			<button
				class="burger min-[861px]:hidden"
				class:open={menuOpen}
				aria-label="Toggle menu"
				aria-expanded={menuOpen}
				onclick={() => (menuOpen = !menuOpen)}
			>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</nav>
	</header>

	<!-- Mobile off-canvas nav -->
	<div
		class="fixed inset-0 z-40 bg-black/30 transition-opacity min-[861px]:hidden {menuOpen
			? 'opacity-100'
			: 'pointer-events-none opacity-0'}"
		onclick={closeMenu}
		role="presentation"
	></div>
	<aside
		class="fixed top-0 right-0 z-50 h-full w-4/5 max-w-[320px] bg-(--color-beige) shadow-[var(--shadow-fb-lg)] transition-transform duration-300 min-[861px]:hidden {menuOpen
			? 'translate-x-0'
			: 'translate-x-full'}"
	>
		<div class="flex flex-col gap-1 px-6 pt-24">
			{#each navItems as item (item.href)}
				<a href={item.href} class="nav-link" class:active={isActive(item.href)} onclick={closeMenu}>
					{item.label}
				</a>
			{/each}
			<a
				href={waLink(`Hi! I'd like to rent a scooter from ${BUSINESS_NAME}.`)}
				target="_blank"
				rel="noopener"
				class="btn btn-whatsapp mt-4"
				onclick={closeMenu}
			>
				Book on WhatsApp
			</a>
		</div>
	</aside>

	<main class="flex-1 pt-20">
		{@render children()}
	</main>

	<footer id="contact" class="bg-(--color-dark) py-16 text-(--color-beige)">
		<div class="container-fb grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
			<div>
				<p class="font-heading text-lg text-(--color-beige)">{BUSINESS_NAME}</p>
				<p class="mt-3 text-sm text-white/60">
					Electric scooter rental &mdash; Tamraght &amp; Taghazout, Morocco.
				</p>
			</div>
			<div>
				<p class="text-sm font-semibold tracking-wider text-(--color-orange) uppercase">Navigation</p>
				<ul class="mt-3 space-y-2 text-sm text-white/70">
					<li><a href="/#fleet" class="hover:text-white">Fleet</a></li>
					<li><a href="/#pricing" class="hover:text-white">Pricing</a></li>
					<li><a href="/availability" class="hover:text-white">Availability</a></li>
				</ul>
			</div>
			<div>
				<p class="text-sm font-semibold tracking-wider text-(--color-orange) uppercase">Information</p>
				<ul class="mt-3 space-y-2 text-sm text-white/70">
					<li><a href="/#how-it-works" class="hover:text-white">How it works</a></li>
					<li><a href="/#faq" class="hover:text-white">FAQ</a></li>
				</ul>
			</div>
			<div>
				<p class="text-sm font-semibold tracking-wider text-(--color-orange) uppercase">Contact</p>
				<ul class="mt-3 space-y-3 text-sm text-white/70">
					<li>Tamraght &amp; Taghazout, Morocco</li>
					<li>
						<a
							href={waLink(`Hi! I'd like to rent a scooter from ${BUSINESS_NAME}.`)}
							target="_blank"
							rel="noopener"
							class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--color-whatsapp) text-white hover:bg-(--color-whatsapp-dark)"
							aria-label="Book on WhatsApp"
						>
							💬
						</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="container-fb mt-10 border-t border-white/10 pt-6 text-xs text-white/40">
			&copy; {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
		</div>
	</footer>

	<WhatsAppFloat />
</div>
