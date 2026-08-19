<script lang="ts">
	import '../lib/styles/app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { BUSINESS_NAME } from '$lib/config';
	import { waLink } from '$lib/whatsapp';
	import WhatsAppFloat from '$lib/components/WhatsAppFloat.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	let menuOpen = $state(false);

	const languages = [
		{ code: 'en', label: 'English', flag: '🇬🇧' },
		{ code: 'fr', label: 'Français', flag: '🇫🇷' },
		{ code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
		{ code: 'de', label: 'Deutsch', flag: '🇩🇪' },
		{ code: 'es', label: 'Español', flag: '🇪🇸' },
		{ code: 'it', label: 'Italiano', flag: '🇮🇹' },
		{ code: 'ar', label: 'العربية', flag: '🇲🇦' }
	];
	let currentLang = $state(languages[0]);
	let langOpen = $state(false);
	let langSwitcherEl: HTMLDivElement | undefined = $state();

	function handleWindowClick(e: MouseEvent) {
		if (langOpen && langSwitcherEl && !langSwitcherEl.contains(e.target as Node)) {
			langOpen = false;
		}
	}

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/#fleet', label: 'Fleet' },
		{ href: '/#how-it-works', label: 'How it works' },
		{ href: '/#pricing', label: 'Pricing' },
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

<svelte:window onclick={handleWindowClick} />

<div class="flex min-h-screen flex-col">
	<header
		class="fixed top-0 right-0 left-0 z-100 h-20"
		style="background: rgba(245, 238, 220, 0.95); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: var(--shadow-fb-sm);"
	>
		<div class="container-fb flex h-full items-center justify-between gap-8">
			<a href="/" class="flex shrink-0 items-center gap-3" aria-label={BUSINESS_NAME}>
				<img src="/images/logo.png" alt={BUSINESS_NAME} class="h-14 w-auto object-contain" />
			</a>

			<nav class="nav-desktop items-center gap-1" aria-label="Main navigation">
				{#each navItems as item (item.href)}
					<a href={item.href} class="nav-link" class:active={isActive(item.href)}>{item.label}</a>
				{/each}
			</nav>

			<div class="lang-switcher" class:open={langOpen} bind:this={langSwitcherEl}>
				<button
					class="lang-current"
					aria-label="Change language"
					onclick={() => (langOpen = !langOpen)}
				>
					<span class="lang-flag">{currentLang.flag}</span>
					<span>{currentLang.code.toUpperCase()}</span>
				</button>
				<div class="lang-dropdown">
					{#each languages as lang (lang.code)}
						<button
							class="lang-option"
							class:active={lang.code === currentLang.code}
							onclick={() => {
								currentLang = lang;
								langOpen = false;
							}}
						>
							<span class="lang-flag">{lang.flag}</span>
							<span>{lang.label}</span>
						</button>
					{/each}
				</div>
			</div>

			<button
				class="burger"
				class:open={menuOpen}
				aria-label="Toggle menu"
				aria-expanded={menuOpen}
				onclick={() => (menuOpen = !menuOpen)}
			>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>

		<!-- Mobile off-canvas nav: nested inside <header> so the burger's higher
		     z-index (105) is compared locally against the panel/backdrop (101/100)
		     within the same stacking context, instead of a page-level sibling
		     panel unconditionally covering the whole header. Matches the reference
		     site's own header/nav-list structure. -->
		<div
			class="fixed inset-0 z-100 bg-black/30 transition-opacity {menuOpen
				? 'opacity-100'
				: 'pointer-events-none opacity-0'}"
			onclick={closeMenu}
			role="presentation"
		></div>
		<aside class="nav-mobile-panel flex flex-col justify-center gap-2 p-8" class:open={menuOpen}>
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
				<span>💬</span>
				<span>Book on WhatsApp</span>
			</a>
		</aside>
	</header>

	<main class="flex-1 pt-20">
		{@render children()}
	</main>

	<footer id="contact" class="bg-(--color-dark) pt-16 text-(--color-beige)">
		<div class="container-fb footer-grid pb-12">
			<div>
				<p class="font-heading text-lg text-(--color-beige)">{BUSINESS_NAME}</p>
				<p class="mt-3 text-sm text-white/80">
					Electric scooter rental &mdash; Tamraght &amp; Taghazout, Morocco.
				</p>
				<div class="mt-4 flex gap-3">
					<a
						href={waLink(`Hi! I'd like to rent a scooter from ${BUSINESS_NAME}.`)}
						target="_blank"
						rel="noopener"
						class="footer-social"
						aria-label="Book on WhatsApp"
					>
						💬
					</a>
				</div>
			</div>
			<div>
				<h4 class="text-sm tracking-[3px] text-(--color-orange) uppercase">Navigation</h4>
				<ul class="mt-5 space-y-2 text-sm text-white/80">
					<li><a href="/" class="hover:text-(--color-orange)">Home</a></li>
					<li><a href="/#fleet" class="hover:text-(--color-orange)">Fleet</a></li>
					<li><a href="/#pricing" class="hover:text-(--color-orange)">Pricing</a></li>
				</ul>
			</div>
			<div>
				<h4 class="text-sm tracking-[3px] text-(--color-orange) uppercase">Information</h4>
				<ul class="mt-5 space-y-2 text-sm text-white/80">
					<li><a href="/#how-it-works" class="hover:text-(--color-orange)">How it works</a></li>
					<li><a href="/#faq" class="hover:text-(--color-orange)">FAQ</a></li>
				</ul>
			</div>
			<div>
				<h4 class="text-sm tracking-[3px] text-(--color-orange) uppercase">Contact</h4>
				<ul class="mt-5 space-y-2 text-sm text-white/80">
					<li>Tamraght &amp; Taghazout, Morocco</li>
				</ul>
			</div>
		</div>
		<div class="border-t border-white/10 py-6 text-center text-[0.82rem] text-white/70">
			<div class="container-fb">
				&copy; {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
			</div>
		</div>
	</footer>

	<WhatsAppFloat />
</div>
