<script lang="ts">
	import '../lib/styles/app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { BUSINESS_NAME, OWNER_WHATSAPP_NUMBER, OWNER_INSTAGRAM_HANDLE } from '$lib/config';
	import { waLink, formatPhoneDisplay } from '$lib/whatsapp';
	import WhatsAppFloat from '$lib/components/WhatsAppFloat.svelte';
	import { page } from '$app/state';
	import { initLang, getLang, setLang, currentTranslation, LANGUAGES } from '$lib/i18n/store.svelte';

	let { children } = $props();

	initLang();

	let t = $derived(currentTranslation());
	let lang = $derived(getLang());

	let menuOpen = $state(false);
	let langOpen = $state(false);
	let langSwitcherEl: HTMLDivElement | undefined = $state();

	function handleWindowClick(e: MouseEvent) {
		if (langOpen && langSwitcherEl && !langSwitcherEl.contains(e.target as Node)) {
			langOpen = false;
		}
	}

	$effect(() => {
		document.documentElement.lang = lang;
		document.documentElement.dir = t.dir;
	});

	let navItems = $derived([
		{ href: '/', label: t.nav.home },
		{ href: '/#fleet', label: t.nav.packages },
		{ href: '/#how-it-works', label: t.nav.how_it_works },
		{ href: '/#reviews', label: t.nav.reviews },
		{ href: '/#faq', label: t.nav.faq },
		{ href: '/#contact', label: t.nav.contact }
	]);

	function isActive(href: string): boolean {
		if (href.startsWith('/#')) return false;
		return page.url.pathname === href;
	}

	function closeMenu() {
		menuOpen = false;
	}

	let currentLangMeta = $derived(LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0]);
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
					<span class="lang-flag">{currentLangMeta.flag}</span>
					<span>{currentLangMeta.code.toUpperCase()}</span>
				</button>
				<div class="lang-dropdown">
					{#each LANGUAGES as langMeta (langMeta.code)}
						<button
							class="lang-option"
							class:active={langMeta.code === lang}
							onclick={() => {
								setLang(langMeta.code);
								langOpen = false;
							}}
						>
							<span class="lang-flag">{langMeta.flag}</span>
							<span>{langMeta.label}</span>
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
				href={waLink(t.messages.generic(BUSINESS_NAME))}
				target="_blank"
				rel="noopener"
				class="btn btn-whatsapp mt-4"
				onclick={closeMenu}
			>
				<span>💬</span>
				<span>{t.common.book_whatsapp}</span>
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
					{t.footer.tagline}
				</p>
				<div class="mt-4 flex gap-3">
					<a
						href="https://instagram.com/{OWNER_INSTAGRAM_HANDLE}"
						target="_blank"
						rel="noopener"
						class="footer-social"
						aria-label="Instagram"
					>
						📷
					</a>
				</div>
			</div>
			<div>
				<h4 class="text-sm tracking-[3px] text-(--color-orange) uppercase">{t.footer.nav_title}</h4>
				<ul class="mt-5 space-y-2 text-sm text-white/80">
					<li><a href="/" class="hover:text-(--color-orange)">{t.nav.home}</a></li>
					<li><a href="/#fleet" class="hover:text-(--color-orange)">{t.nav.packages}</a></li>
					<li><a href="/#reviews" class="hover:text-(--color-orange)">{t.nav.reviews}</a></li>
				</ul>
			</div>
			<div>
				<h4 class="text-sm tracking-[3px] text-(--color-orange) uppercase">{t.footer.info_title}</h4>
				<ul class="mt-5 space-y-2 text-sm text-white/80">
					<li><a href="/#how-it-works" class="hover:text-(--color-orange)">{t.nav.how_it_works}</a></li>
					<li><a href="/#faq" class="hover:text-(--color-orange)">{t.nav.faq}</a></li>
				</ul>
			</div>
			<div>
				<h4 class="text-sm tracking-[3px] text-(--color-orange) uppercase">{t.footer.contact_title}</h4>
				<ul class="mt-5 space-y-2 text-sm text-white/80">
					<li>
						<a
							href={waLink(t.messages.generic(BUSINESS_NAME))}
							target="_blank"
							rel="noopener"
							class="hover:text-(--color-orange)"
						>
							📱 <bdi dir="ltr">{formatPhoneDisplay(OWNER_WHATSAPP_NUMBER)}</bdi>
						</a>
					</li>
					<li>📍 {t.footer.location}</li>
				</ul>
			</div>
		</div>
		<div class="border-t border-white/10 py-6 text-center text-[0.82rem] text-white/70">
			<div class="container-fb">
				<bdi dir="ltr">&copy; {new Date().getFullYear()} {BUSINESS_NAME}.</bdi> {t.footer.rights}
			</div>
		</div>
	</footer>

	<WhatsAppFloat />
</div>
