import { browser } from '$app/environment';
import { LANGUAGES, TRANSLATIONS, type LangCode, type Translation } from './translations';

const STORAGE_KEY = 'filiosbike_lang';

function detectInitialLang(): LangCode {
	if (!browser) return 'en';
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored && stored in TRANSLATIONS) return stored as LangCode;
	} catch {
		// localStorage unavailable (private mode, etc.) — fall through to browser lang.
	}
	const browserLang = (navigator.language || 'en').slice(0, 2).toLowerCase();
	if (browserLang in TRANSLATIONS) return browserLang as LangCode;
	return 'en';
}

let lang = $state<LangCode>('en');
let initialized = false;

/** Call once on the client (e.g. from the root layout) to pick up stored/browser language. */
export function initLang() {
	if (initialized || !browser) return;
	initialized = true;
	lang = detectInitialLang();
}

export function getLang(): LangCode {
	return lang;
}

export function setLang(code: LangCode) {
	lang = code;
	if (browser) {
		try {
			localStorage.setItem(STORAGE_KEY, code);
		} catch {
			// ignore
		}
	}
}

export function currentTranslation(): Translation {
	return TRANSLATIONS[lang];
}

export { LANGUAGES };
export type { LangCode };
