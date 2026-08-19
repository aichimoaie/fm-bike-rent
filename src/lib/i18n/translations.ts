export type LangCode = 'en' | 'fr' | 'nl' | 'de' | 'es' | 'it' | 'ar';

export interface Translation {
	dir: 'ltr' | 'rtl';
	nav: {
		home: string;
		packages: string;
		how_it_works: string;
		pricing: string;
		faq: string;
		contact: string;
	};
	common: {
		book_whatsapp: string;
		check_availability: string;
		per_day: string;
		live_availability: string;
		availability_page: string;
	};
	footer: {
		tagline: string;
		location: string;
		nav_title: string;
		info_title: string;
		contact_title: string;
		rights: string;
	};
	hero: {
		location: string;
		title: string;
		subtitle: string;
		scroll: string;
	};
	features: {
		tag: string;
		heading: string;
		items: { title: string; desc: string }[];
	};
	packages: {
		tag: string;
		heading: string;
		subtitle: string;
		tiers: { label: string; tag: string; desc: string }[];
		popular: string;
		footnote_pre: string;
		footnote_post: string;
	};
	how_it_works: {
		tag: string;
		heading: string;
		steps: { title: string; desc: string }[];
		step1_pre: string;
		step1_post: string;
	};
	pricing: {
		tag: string;
		heading: string;
		subtitle: string;
		per_day: string;
		cards: { name: string; desc: string }[];
	};
	faq: {
		tag: string;
		heading: string;
		items: { q: string; a: string }[];
	};
	instagram: {
		tag: string;
		heading: string;
		subtitle: string;
		follow: string;
	};
	cta: {
		heading: string;
		subtitle: string;
	};
	availability: {
		title: string;
		subtitle: (days: number) => string;
		free: string;
		booked: string;
		scooter_col: string;
		booking_title: string;
		booking_subtitle: string;
		scooter_label: string;
		start_label: string;
		end_label: string;
		preparing: string;
		submit: string;
		error_generic: string;
		error_network: string;
	};
	messages: {
		generic: (business: string) => string;
		scooterAsk: (business: string, scooterName: string) => string;
		packageAsk: (business: string, tierLabel: string) => string;
		bookingDates: (business: string, scooterName: string, start: string, end: string) => string;
	};
}

export const LANGUAGES: { code: LangCode; label: string; flag: string }[] = [
	{ code: 'en', label: 'English', flag: '🇬🇧' },
	{ code: 'fr', label: 'Français', flag: '🇫🇷' },
	{ code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
	{ code: 'de', label: 'Deutsch', flag: '🇩🇪' },
	{ code: 'es', label: 'Español', flag: '🇪🇸' },
	{ code: 'it', label: 'Italiano', flag: '🇮🇹' },
	{ code: 'ar', label: 'العربية', flag: '🇲🇦' }
];

export const TRANSLATIONS: Record<LangCode, Translation> = {
	en: {
		dir: 'ltr',
		nav: {
			home: 'Home',
			packages: 'Packages',
			how_it_works: 'How it works',
			pricing: 'Pricing',
			faq: 'FAQ',
			contact: 'Contact'
		},
		common: {
			book_whatsapp: 'Book on WhatsApp',
			check_availability: 'Check availability',
			per_day: '/ day',
			live_availability: 'live availability',
			availability_page: 'availability page'
		},
		footer: {
			tagline: 'Electric scooter rental — Tamraght & Taghazout, Morocco.',
			location: 'Tamraght & Taghazout, Morocco',
			nav_title: 'Navigation',
			info_title: 'Information',
			contact_title: 'Contact',
			rights: 'All rights reserved.'
		},
		hero: {
			location: 'Tamraght — Taghazout — Morocco',
			title: 'Rent an electric scooter in Tamraght & Taghazout',
			subtitle:
				"Fast, easy e-scooter rental for surf trips, beach cruising and getting around town. Message us on WhatsApp and we'll confirm your dates — just like booking with a friend.",
			scroll: 'Scroll'
		},
		features: {
			tag: 'Why book with us',
			heading: 'Easy, local, no-hassle rental',
			items: [
				{ title: 'Local pickup', desc: 'Pickup in Tamraght, minutes from Taghazout.' },
				{ title: 'Well-maintained scooters', desc: 'Electric, comfortable, ready for coast and town rides.' },
				{ title: 'Flexible dates', desc: 'Check live availability and book the dates you need.' },
				{ title: 'WhatsApp support', desc: 'Questions before or during your rental? Message us directly.' }
			]
		},
		packages: {
			tag: 'Packages',
			heading: 'Rental packages',
			subtitle: 'The longer you ride, the less you pay per day.',
			popular: 'Most popular',
			tiers: [
				{
					label: '1-3 Days',
					tag: 'Short trip',
					desc: 'Perfect for a quick surf trip or a long weekend cruising the coast.'
				},
				{
					label: '4-7 Days',
					tag: 'Week-long',
					desc: 'Our most popular option — a full week to explore Tamraght and Taghazout.'
				},
				{
					label: '11+ Days',
					tag: 'Extended stay',
					desc: 'Best per-day rate for longer stays along the coast.'
				}
			],
			footnote_pre: 'Rates shown per scooter, per day. Check',
			footnote_post: 'for our current fleet.'
		},
		how_it_works: {
			tag: 'Process',
			heading: 'How booking works',
			step1_pre: 'Check the',
			step1_post: 'and choose a free date range.',
			steps: [
				{ title: 'Pick your scooter & dates', desc: '' },
				{ title: 'Message us on WhatsApp', desc: 'Tap any "Book on WhatsApp" button — it opens a chat with your request pre-filled.' },
				{ title: 'Confirm & ride', desc: 'We confirm your dates and pickup details directly over WhatsApp.' }
			]
		},
		pricing: {
			tag: 'Pricing',
			heading: 'Simple daily rates',
			subtitle: 'No hidden fees.',
			per_day: 'per day',
			cards: [
				{ name: 'City Cruiser', desc: 'Comfortable and light — ideal for beach-to-town rides.' },
				{ name: 'Long Range', desc: 'Bigger battery for longer surf-spot-hopping days.' }
			]
		},
		faq: {
			tag: 'FAQ',
			heading: 'Frequently asked questions',
			items: [
				{
					q: 'Where do I pick up the scooter?',
					a: 'Pickup is arranged directly with us in Tamraght, a short ride from Taghazout — exact location confirmed over WhatsApp when you book.'
				},
				{ q: 'Do I need a license?', a: 'A valid driving license is required. Bring it with you at pickup.' },
				{
					q: 'What if the scooter I want is booked?',
					a: 'Check the live availability page for open dates, or message us on WhatsApp — we sometimes have last-minute openings.'
				},
				{
					q: 'How do I confirm a reservation?',
					a: 'Tap any "Book on WhatsApp" button — it opens a WhatsApp chat with your request pre-filled, and we confirm from there.'
				}
			]
		},
		instagram: {
			tag: 'Instagram',
			heading: 'Follow the ride live',
			subtitle: '— photos, videos and behind the scenes.',
			follow: 'Follow'
		},
		cta: {
			heading: 'Ready to ride?',
			subtitle: "Message us on WhatsApp now — we'll help you pick the right scooter and confirm your dates."
		},
		availability: {
			title: 'Scooter availability',
			subtitle: (days) =>
				`Green = free, red = already booked. Showing the next ${days} days for our scooters in Tamraght & Taghazout.`,
			free: 'Free',
			booked: 'Booked',
			scooter_col: 'Scooter',
			booking_title: 'Book on WhatsApp',
			booking_subtitle: "Pick a scooter and your dates — we'll open WhatsApp with your request pre-filled.",
			scooter_label: 'Scooter',
			start_label: 'Start date',
			end_label: 'End date',
			preparing: 'Preparing…',
			submit: 'Book on WhatsApp',
			error_generic: 'Something went wrong. Please try again.',
			error_network: 'Network error. Please try again.'
		},
		messages: {
			generic: (business) => `Hi! I'd like to rent a scooter from ${business}.`,
			scooterAsk: (business, scooterName) =>
				`Hi! I'd like to rent the ${scooterName} from ${business}. Is it available?`,
			packageAsk: (business, tierLabel) =>
				`Hi! I'd like to rent a scooter from ${business} for ${tierLabel}. Is it available?`,
			bookingDates: (business, scooterName, start, end) =>
				`Hi! I'd like to book the ${scooterName} from ${business}, ${start} to ${end}. Can you confirm?`
		}
	},
	fr: {
		dir: 'ltr',
		nav: {
			home: 'Accueil',
			packages: 'Forfaits',
			how_it_works: 'Comment ça marche',
			pricing: 'Tarifs',
			faq: 'FAQ',
			contact: 'Contact'
		},
		common: {
			book_whatsapp: 'Réserver sur WhatsApp',
			check_availability: 'Voir les disponibilités',
			per_day: '/ jour',
			live_availability: 'disponibilités en direct',
			availability_page: 'page des disponibilités'
		},
		footer: {
			tagline: 'Location de scooters électriques — Tamraght & Taghazout, Maroc.',
			location: 'Tamraght & Taghazout, Maroc',
			nav_title: 'Navigation',
			info_title: 'Informations',
			contact_title: 'Contact',
			rights: 'Tous droits réservés.'
		},
		hero: {
			location: 'Tamraght — Taghazout — Maroc',
			title: 'Louez un scooter électrique à Tamraght & Taghazout',
			subtitle:
				'Location de scooter électrique rapide et simple pour le surf, la plage ou vos déplacements en ville. Écrivez-nous sur WhatsApp et nous confirmons vos dates — comme entre amis.',
			scroll: 'Défiler'
		},
		features: {
			tag: 'Pourquoi nous choisir',
			heading: 'Une location simple et locale',
			items: [
				{ title: 'Retrait local', desc: 'Retrait à Tamraght, à quelques minutes de Taghazout.' },
				{ title: 'Scooters bien entretenus', desc: 'Électriques, confortables, prêts pour la côte et la ville.' },
				{ title: 'Dates flexibles', desc: 'Consultez les disponibilités en direct et réservez vos dates.' },
				{ title: 'Assistance WhatsApp', desc: 'Une question avant ou pendant la location ? Écrivez-nous directement.' }
			]
		},
		packages: {
			tag: 'Forfaits',
			heading: 'Forfaits de location',
			subtitle: 'Plus vous roulez longtemps, moins vous payez par jour.',
			popular: 'Le plus populaire',
			tiers: [
				{
					label: '1-3 Jours',
					tag: 'Court séjour',
					desc: 'Idéal pour une session de surf rapide ou un long week-end sur la côte.'
				},
				{
					label: '4-7 Jours',
					tag: 'Une semaine',
					desc: 'Notre option la plus populaire — une semaine complète pour explorer Tamraght et Taghazout.'
				},
				{
					label: '11+ Jours',
					tag: 'Long séjour',
					desc: 'Le meilleur tarif journalier pour les séjours prolongés sur la côte.'
				}
			],
			footnote_pre: 'Tarifs par scooter, par jour. Consultez les',
			footnote_post: 'pour notre flotte actuelle.'
		},
		how_it_works: {
			tag: 'Processus',
			heading: 'Comment réserver',
			step1_pre: 'Consultez la',
			step1_post: 'et choisissez une période libre.',
			steps: [
				{ title: 'Choisissez votre scooter et vos dates', desc: '' },
				{ title: 'Écrivez-nous sur WhatsApp', desc: 'Appuyez sur un bouton « Réserver sur WhatsApp » — un chat s\'ouvre avec votre demande pré-remplie.' },
				{ title: 'Confirmez et roulez', desc: 'Nous confirmons vos dates et le lieu de retrait directement sur WhatsApp.' }
			]
		},
		pricing: {
			tag: 'Tarifs',
			heading: 'Tarifs journaliers simples',
			subtitle: 'Sans frais cachés.',
			per_day: 'par jour',
			cards: [
				{ name: 'City Cruiser', desc: 'Confortable et léger — idéal pour les trajets plage-ville.' },
				{ name: 'Long Range', desc: 'Plus grande batterie pour enchaîner les spots de surf.' }
			]
		},
		faq: {
			tag: 'FAQ',
			heading: 'Questions fréquentes',
			items: [
				{
					q: 'Où puis-je récupérer le scooter ?',
					a: 'Le retrait se fait directement avec nous à Tamraght, à deux pas de Taghazout — lieu exact confirmé sur WhatsApp lors de la réservation.'
				},
				{ q: 'Ai-je besoin d\'un permis ?', a: 'Un permis de conduire valide est requis. Apportez-le lors du retrait.' },
				{
					q: 'Et si le scooter que je veux est déjà réservé ?',
					a: 'Consultez la page des disponibilités en direct, ou écrivez-nous sur WhatsApp — il reste parfois des créneaux de dernière minute.'
				},
				{
					q: 'Comment confirmer une réservation ?',
					a: 'Appuyez sur un bouton « Réserver sur WhatsApp » — un chat WhatsApp s\'ouvre avec votre demande pré-remplie, et nous confirmons ensuite.'
				}
			]
		},
		instagram: {
			tag: 'Instagram',
			heading: 'Suivez l\'aventure en direct',
			subtitle: '— photos, vidéos et coulisses.',
			follow: 'Suivre'
		},
		cta: {
			heading: 'Prêt à rouler ?',
			subtitle: 'Écrivez-nous sur WhatsApp dès maintenant — on vous aide à choisir le bon scooter et à confirmer vos dates.'
		},
		availability: {
			title: 'Disponibilité des scooters',
			subtitle: (days) =>
				`Vert = libre, rouge = déjà réservé. Les ${days} prochains jours pour nos scooters à Tamraght & Taghazout.`,
			free: 'Libre',
			booked: 'Réservé',
			scooter_col: 'Scooter',
			booking_title: 'Réserver sur WhatsApp',
			booking_subtitle: 'Choisissez un scooter et vos dates — nous ouvrirons WhatsApp avec votre demande pré-remplie.',
			scooter_label: 'Scooter',
			start_label: 'Date de début',
			end_label: 'Date de fin',
			preparing: 'Préparation…',
			submit: 'Réserver sur WhatsApp',
			error_generic: 'Une erreur est survenue. Veuillez réessayer.',
			error_network: 'Erreur réseau. Veuillez réessayer.'
		},
		messages: {
			generic: (business) => `Bonjour ! Je souhaite louer un scooter chez ${business}.`,
			scooterAsk: (business, scooterName) =>
				`Bonjour ! Je souhaite louer le ${scooterName} chez ${business}. Est-il disponible ?`,
			packageAsk: (business, tierLabel) =>
				`Bonjour ! Je souhaite louer un scooter chez ${business} pour ${tierLabel}. Est-ce disponible ?`,
			bookingDates: (business, scooterName, start, end) =>
				`Bonjour ! Je souhaite réserver le ${scooterName} chez ${business}, du ${start} au ${end}. Pouvez-vous confirmer ?`
		}
	},
	nl: {
		dir: 'ltr',
		nav: {
			home: 'Home',
			packages: 'Pakketten',
			how_it_works: 'Hoe het werkt',
			pricing: 'Prijzen',
			faq: 'FAQ',
			contact: 'Contact'
		},
		common: {
			book_whatsapp: 'Boek via WhatsApp',
			check_availability: 'Beschikbaarheid bekijken',
			per_day: '/ dag',
			live_availability: 'actuele beschikbaarheid',
			availability_page: 'beschikbaarheidspagina'
		},
		footer: {
			tagline: 'Verhuur van elektrische scooters — Tamraght & Taghazout, Marokko.',
			location: 'Tamraght & Taghazout, Marokko',
			nav_title: 'Navigatie',
			info_title: 'Informatie',
			contact_title: 'Contact',
			rights: 'Alle rechten voorbehouden.'
		},
		hero: {
			location: 'Tamraght — Taghazout — Marokko',
			title: 'Huur een elektrische scooter in Tamraght & Taghazout',
			subtitle:
				'Snelle, eenvoudige scooterverhuur voor surftrips, strandritjes en verplaatsingen in de stad. Stuur ons een bericht op WhatsApp en we bevestigen je data — net als bij een vriend boeken.',
			scroll: 'Scroll'
		},
		features: {
			tag: 'Waarom bij ons boeken',
			heading: 'Eenvoudig, lokaal, zonder gedoe',
			items: [
				{ title: 'Lokaal ophalen', desc: 'Ophalen in Tamraght, enkele minuten van Taghazout.' },
				{ title: 'Goed onderhouden scooters', desc: 'Elektrisch, comfortabel, klaar voor kust en stad.' },
				{ title: 'Flexibele data', desc: 'Bekijk de actuele beschikbaarheid en boek je data.' },
				{ title: 'WhatsApp-ondersteuning', desc: 'Vragen voor of tijdens je huurperiode? Stuur ons direct een bericht.' }
			]
		},
		packages: {
			tag: 'Pakketten',
			heading: 'Huurpakketten',
			subtitle: 'Hoe langer je rijdt, hoe minder je per dag betaalt.',
			popular: 'Meest gekozen',
			tiers: [
				{
					label: '1-3 Dagen',
					tag: 'Korte trip',
					desc: 'Perfect voor een korte surftrip of een lang weekend aan de kust.'
				},
				{
					label: '4-7 Dagen',
					tag: 'Een week',
					desc: 'Onze populairste optie — een hele week om Tamraght en Taghazout te verkennen.'
				},
				{
					label: '11+ Dagen',
					tag: 'Langer verblijf',
					desc: 'Beste dagprijs voor langere verblijven aan de kust.'
				}
			],
			footnote_pre: 'Tarieven per scooter, per dag. Bekijk de',
			footnote_post: 'voor onze huidige vloot.'
		},
		how_it_works: {
			tag: 'Werkwijze',
			heading: 'Zo boek je',
			step1_pre: 'Bekijk de',
			step1_post: 'en kies een vrije periode.',
			steps: [
				{ title: 'Kies je scooter & data', desc: '' },
				{ title: 'Stuur ons een bericht op WhatsApp', desc: 'Tik op een "Boek via WhatsApp"-knop — er opent een chat met je verzoek al ingevuld.' },
				{ title: 'Bevestig & rijd', desc: 'We bevestigen je data en ophaaldetails rechtstreeks via WhatsApp.' }
			]
		},
		pricing: {
			tag: 'Prijzen',
			heading: 'Eenvoudige dagtarieven',
			subtitle: 'Geen verborgen kosten.',
			per_day: 'per dag',
			cards: [
				{ name: 'City Cruiser', desc: 'Comfortabel en licht — ideaal voor ritjes tussen strand en stad.' },
				{ name: 'Long Range', desc: 'Grotere accu voor langere dagen langs de surfspots.' }
			]
		},
		faq: {
			tag: 'FAQ',
			heading: 'Veelgestelde vragen',
			items: [
				{
					q: 'Waar haal ik de scooter op?',
					a: 'Ophalen gebeurt rechtstreeks bij ons in Tamraght, vlak bij Taghazout — exacte locatie bevestigen we via WhatsApp bij je boeking.'
				},
				{ q: 'Heb ik een rijbewijs nodig?', a: 'Een geldig rijbewijs is verplicht. Neem het mee bij het ophalen.' },
				{
					q: 'Wat als de scooter die ik wil al geboekt is?',
					a: 'Bekijk de actuele beschikbaarheidspagina voor vrije data, of stuur ons een bericht op WhatsApp — soms hebben we last-minute plekken vrij.'
				},
				{
					q: 'Hoe bevestig ik een boeking?',
					a: 'Tik op een "Boek via WhatsApp"-knop — er opent een WhatsApp-chat met je verzoek al ingevuld, en wij bevestigen van daaruit.'
				}
			]
		},
		instagram: {
			tag: 'Instagram',
			heading: 'Volg het avontuur live',
			subtitle: '— foto\'s, video\'s en achter de schermen.',
			follow: 'Volgen'
		},
		cta: {
			heading: 'Klaar om te rijden?',
			subtitle: 'Stuur ons nu een bericht op WhatsApp — we helpen je de juiste scooter te kiezen en je data te bevestigen.'
		},
		availability: {
			title: 'Beschikbaarheid scooters',
			subtitle: (days) =>
				`Groen = vrij, rood = al geboekt. De komende ${days} dagen voor onze scooters in Tamraght & Taghazout.`,
			free: 'Vrij',
			booked: 'Geboekt',
			scooter_col: 'Scooter',
			booking_title: 'Boek via WhatsApp',
			booking_subtitle: 'Kies een scooter en je data — we openen WhatsApp met je verzoek al ingevuld.',
			scooter_label: 'Scooter',
			start_label: 'Startdatum',
			end_label: 'Einddatum',
			preparing: 'Bezig…',
			submit: 'Boek via WhatsApp',
			error_generic: 'Er ging iets mis. Probeer het opnieuw.',
			error_network: 'Netwerkfout. Probeer het opnieuw.'
		},
		messages: {
			generic: (business) => `Hoi! Ik wil graag een scooter huren bij ${business}.`,
			scooterAsk: (business, scooterName) =>
				`Hoi! Ik wil graag de ${scooterName} huren bij ${business}. Is deze beschikbaar?`,
			packageAsk: (business, tierLabel) =>
				`Hoi! Ik wil graag een scooter huren bij ${business} voor ${tierLabel}. Is dat beschikbaar?`,
			bookingDates: (business, scooterName, start, end) =>
				`Hoi! Ik wil graag de ${scooterName} boeken bij ${business}, van ${start} tot ${end}. Kun je dit bevestigen?`
		}
	},
	de: {
		dir: 'ltr',
		nav: {
			home: 'Start',
			packages: 'Pakete',
			how_it_works: 'So geht\'s',
			pricing: 'Preise',
			faq: 'FAQ',
			contact: 'Kontakt'
		},
		common: {
			book_whatsapp: 'Per WhatsApp buchen',
			check_availability: 'Verfügbarkeit prüfen',
			per_day: '/ Tag',
			live_availability: 'aktuelle Verfügbarkeit',
			availability_page: 'Verfügbarkeitsseite'
		},
		footer: {
			tagline: 'Vermietung von Elektro-Scootern — Tamraght & Taghazout, Marokko.',
			location: 'Tamraght & Taghazout, Marokko',
			nav_title: 'Navigation',
			info_title: 'Informationen',
			contact_title: 'Kontakt',
			rights: 'Alle Rechte vorbehalten.'
		},
		hero: {
			location: 'Tamraght — Taghazout — Marokko',
			title: 'Elektro-Scooter mieten in Tamraght & Taghazout',
			subtitle:
				'Schnelle, unkomplizierte E-Scooter-Vermietung für Surftrips, Strandfahrten und Fahrten in die Stadt. Schreib uns auf WhatsApp und wir bestätigen deine Termine — wie unter Freunden.',
			scroll: 'Scrollen'
		},
		features: {
			tag: 'Warum bei uns buchen',
			heading: 'Einfach, lokal, unkompliziert',
			items: [
				{ title: 'Lokale Abholung', desc: 'Abholung in Tamraght, wenige Minuten von Taghazout entfernt.' },
				{ title: 'Gepflegte Scooter', desc: 'Elektrisch, komfortabel, bereit für Küste und Stadt.' },
				{ title: 'Flexible Termine', desc: 'Aktuelle Verfügbarkeit prüfen und deine Termine buchen.' },
				{ title: 'WhatsApp-Support', desc: 'Fragen vor oder während der Miete? Schreib uns direkt.' }
			]
		},
		packages: {
			tag: 'Pakete',
			heading: 'Mietpakete',
			subtitle: 'Je länger du fährst, desto weniger zahlst du pro Tag.',
			popular: 'Am beliebtesten',
			tiers: [
				{
					label: '1-3 Tage',
					tag: 'Kurztrip',
					desc: 'Perfekt für einen kurzen Surftrip oder ein langes Wochenende an der Küste.'
				},
				{
					label: '4-7 Tage',
					tag: 'Eine Woche',
					desc: 'Unsere beliebteste Option — eine ganze Woche, um Tamraght und Taghazout zu erkunden.'
				},
				{
					label: '11+ Tage',
					tag: 'Längerer Aufenthalt',
					desc: 'Bester Tagespreis für längere Aufenthalte an der Küste.'
				}
			],
			footnote_pre: 'Preise pro Scooter, pro Tag. Sieh dir die',
			footnote_post: 'für unsere aktuelle Flotte an.'
		},
		how_it_works: {
			tag: 'Ablauf',
			heading: 'So funktioniert die Buchung',
			step1_pre: 'Sieh dir die',
			step1_post: 'an und wähle einen freien Zeitraum.',
			steps: [
				{ title: 'Scooter & Termine wählen', desc: '' },
				{ title: 'Schreib uns auf WhatsApp', desc: 'Tippe auf einen „Per WhatsApp buchen“-Button — ein Chat mit deiner vorausgefüllten Anfrage öffnet sich.' },
				{ title: 'Bestätigen & losfahren', desc: 'Wir bestätigen deine Termine und Abholdetails direkt über WhatsApp.' }
			]
		},
		pricing: {
			tag: 'Preise',
			heading: 'Einfache Tagespreise',
			subtitle: 'Keine versteckten Kosten.',
			per_day: 'pro Tag',
			cards: [
				{ name: 'City Cruiser', desc: 'Komfortabel und leicht — ideal für Fahrten zwischen Strand und Stadt.' },
				{ name: 'Long Range', desc: 'Größerer Akku für längere Tage von Surfspot zu Surfspot.' }
			]
		},
		faq: {
			tag: 'FAQ',
			heading: 'Häufig gestellte Fragen',
			items: [
				{
					q: 'Wo hole ich den Scooter ab?',
					a: 'Die Abholung erfolgt direkt bei uns in Tamraght, nur kurz von Taghazout entfernt — der genaue Ort wird bei der Buchung über WhatsApp bestätigt.'
				},
				{ q: 'Brauche ich einen Führerschein?', a: 'Ein gültiger Führerschein ist erforderlich. Bring ihn zur Abholung mit.' },
				{
					q: 'Was, wenn der gewünschte Scooter schon gebucht ist?',
					a: 'Sieh dir die aktuelle Verfügbarkeitsseite an oder schreib uns auf WhatsApp — manchmal gibt es kurzfristig freie Termine.'
				},
				{
					q: 'Wie bestätige ich eine Buchung?',
					a: 'Tippe auf einen „Per WhatsApp buchen“-Button — ein WhatsApp-Chat mit deiner vorausgefüllten Anfrage öffnet sich, und wir bestätigen von dort aus.'
				}
			]
		},
		instagram: {
			tag: 'Instagram',
			heading: 'Folge dem Abenteuer live',
			subtitle: '— Fotos, Videos und Blicke hinter die Kulissen.',
			follow: 'Folgen'
		},
		cta: {
			heading: 'Bereit loszufahren?',
			subtitle: 'Schreib uns jetzt auf WhatsApp — wir helfen dir, den richtigen Scooter zu finden und deine Termine zu bestätigen.'
		},
		availability: {
			title: 'Scooter-Verfügbarkeit',
			subtitle: (days) =>
				`Grün = frei, rot = bereits gebucht. Die nächsten ${days} Tage für unsere Scooter in Tamraght & Taghazout.`,
			free: 'Frei',
			booked: 'Gebucht',
			scooter_col: 'Scooter',
			booking_title: 'Per WhatsApp buchen',
			booking_subtitle: 'Wähle einen Scooter und deine Termine — wir öffnen WhatsApp mit deiner vorausgefüllten Anfrage.',
			scooter_label: 'Scooter',
			start_label: 'Startdatum',
			end_label: 'Enddatum',
			preparing: 'Wird vorbereitet…',
			submit: 'Per WhatsApp buchen',
			error_generic: 'Etwas ist schiefgelaufen. Bitte versuche es erneut.',
			error_network: 'Netzwerkfehler. Bitte versuche es erneut.'
		},
		messages: {
			generic: (business) => `Hallo! Ich möchte gerne einen Scooter bei ${business} mieten.`,
			scooterAsk: (business, scooterName) =>
				`Hallo! Ich möchte gerne den ${scooterName} bei ${business} mieten. Ist er verfügbar?`,
			packageAsk: (business, tierLabel) =>
				`Hallo! Ich möchte gerne einen Scooter bei ${business} für ${tierLabel} mieten. Ist das verfügbar?`,
			bookingDates: (business, scooterName, start, end) =>
				`Hallo! Ich möchte gerne den ${scooterName} bei ${business} buchen, von ${start} bis ${end}. Kannst du das bestätigen?`
		}
	},
	es: {
		dir: 'ltr',
		nav: {
			home: 'Inicio',
			packages: 'Paquetes',
			how_it_works: 'Cómo funciona',
			pricing: 'Precios',
			faq: 'FAQ',
			contact: 'Contacto'
		},
		common: {
			book_whatsapp: 'Reservar por WhatsApp',
			check_availability: 'Ver disponibilidad',
			per_day: '/ día',
			live_availability: 'disponibilidad en vivo',
			availability_page: 'página de disponibilidad'
		},
		footer: {
			tagline: 'Alquiler de scooters eléctricos — Tamraght y Taghazout, Marruecos.',
			location: 'Tamraght y Taghazout, Marruecos',
			nav_title: 'Navegación',
			info_title: 'Información',
			contact_title: 'Contacto',
			rights: 'Todos los derechos reservados.'
		},
		hero: {
			location: 'Tamraght — Taghazout — Marruecos',
			title: 'Alquila un scooter eléctrico en Tamraght y Taghazout',
			subtitle:
				'Alquiler de scooter eléctrico rápido y sencillo para surfear, ir a la playa o moverte por la ciudad. Escríbenos por WhatsApp y confirmamos tus fechas — como si reservaras con un amigo.',
			scroll: 'Desplázate'
		},
		features: {
			tag: 'Por qué elegirnos',
			heading: 'Alquiler fácil y local, sin complicaciones',
			items: [
				{ title: 'Recogida local', desc: 'Recogida en Tamraght, a pocos minutos de Taghazout.' },
				{ title: 'Scooters bien cuidados', desc: 'Eléctricos, cómodos, listos para la costa y la ciudad.' },
				{ title: 'Fechas flexibles', desc: 'Consulta la disponibilidad en vivo y reserva tus fechas.' },
				{ title: 'Soporte por WhatsApp', desc: '¿Dudas antes o durante el alquiler? Escríbenos directamente.' }
			]
		},
		packages: {
			tag: 'Paquetes',
			heading: 'Paquetes de alquiler',
			subtitle: 'Cuanto más tiempo alquiles, menos pagas por día.',
			popular: 'Más popular',
			tiers: [
				{
					label: '1-3 Días',
					tag: 'Viaje corto',
					desc: 'Perfecto para un viaje de surf rápido o un largo fin de semana en la costa.'
				},
				{
					label: '4-7 Días',
					tag: 'Una semana',
					desc: 'Nuestra opción más popular — una semana completa para explorar Tamraght y Taghazout.'
				},
				{
					label: '11+ Días',
					tag: 'Estancia larga',
					desc: 'La mejor tarifa por día para estancias más largas en la costa.'
				}
			],
			footnote_pre: 'Tarifas por scooter, por día. Consulta la',
			footnote_post: 'para ver nuestra flota actual.'
		},
		how_it_works: {
			tag: 'Proceso',
			heading: 'Cómo reservar',
			step1_pre: 'Consulta la',
			step1_post: 'y elige un rango de fechas libre.',
			steps: [
				{ title: 'Elige tu scooter y tus fechas', desc: '' },
				{ title: 'Escríbenos por WhatsApp', desc: 'Toca cualquier botón "Reservar por WhatsApp" — se abrirá un chat con tu solicitud ya rellenada.' },
				{ title: 'Confirma y disfruta', desc: 'Confirmamos tus fechas y los detalles de recogida directamente por WhatsApp.' }
			]
		},
		pricing: {
			tag: 'Precios',
			heading: 'Tarifas diarias sencillas',
			subtitle: 'Sin costes ocultos.',
			per_day: 'por día',
			cards: [
				{ name: 'City Cruiser', desc: 'Cómodo y ligero — ideal para trayectos entre la playa y la ciudad.' },
				{ name: 'Long Range', desc: 'Batería más grande para días largos recorriendo spots de surf.' }
			]
		},
		faq: {
			tag: 'FAQ',
			heading: 'Preguntas frecuentes',
			items: [
				{
					q: '¿Dónde recojo el scooter?',
					a: 'La recogida se organiza directamente con nosotros en Tamraght, muy cerca de Taghazout — la ubicación exacta se confirma por WhatsApp al reservar.'
				},
				{ q: '¿Necesito carné de conducir?', a: 'Se requiere un carné de conducir válido. Tráelo el día de la recogida.' },
				{
					q: '¿Y si el scooter que quiero ya está reservado?',
					a: 'Consulta la página de disponibilidad en vivo, o escríbenos por WhatsApp — a veces tenemos huecos de última hora.'
				},
				{
					q: '¿Cómo confirmo una reserva?',
					a: 'Toca cualquier botón "Reservar por WhatsApp" — se abrirá un chat de WhatsApp con tu solicitud ya rellenada, y confirmamos desde ahí.'
				}
			]
		},
		instagram: {
			tag: 'Instagram',
			heading: 'Sigue la aventura en directo',
			subtitle: '— fotos, vídeos y detrás de cámaras.',
			follow: 'Seguir'
		},
		cta: {
			heading: '¿Listo para rodar?',
			subtitle: 'Escríbenos ahora por WhatsApp — te ayudamos a elegir el scooter adecuado y a confirmar tus fechas.'
		},
		availability: {
			title: 'Disponibilidad de scooters',
			subtitle: (days) =>
				`Verde = libre, rojo = ya reservado. Los próximos ${days} días para nuestros scooters en Tamraght y Taghazout.`,
			free: 'Libre',
			booked: 'Reservado',
			scooter_col: 'Scooter',
			booking_title: 'Reservar por WhatsApp',
			booking_subtitle: 'Elige un scooter y tus fechas — abriremos WhatsApp con tu solicitud ya rellenada.',
			scooter_label: 'Scooter',
			start_label: 'Fecha de inicio',
			end_label: 'Fecha de fin',
			preparing: 'Preparando…',
			submit: 'Reservar por WhatsApp',
			error_generic: 'Algo salió mal. Inténtalo de nuevo.',
			error_network: 'Error de red. Inténtalo de nuevo.'
		},
		messages: {
			generic: (business) => `¡Hola! Me gustaría alquilar un scooter en ${business}.`,
			scooterAsk: (business, scooterName) =>
				`¡Hola! Me gustaría alquilar el ${scooterName} en ${business}. ¿Está disponible?`,
			packageAsk: (business, tierLabel) =>
				`¡Hola! Me gustaría alquilar un scooter en ${business} por ${tierLabel}. ¿Está disponible?`,
			bookingDates: (business, scooterName, start, end) =>
				`¡Hola! Me gustaría reservar el ${scooterName} en ${business}, del ${start} al ${end}. ¿Puedes confirmarlo?`
		}
	},
	it: {
		dir: 'ltr',
		nav: {
			home: 'Home',
			packages: 'Pacchetti',
			how_it_works: 'Come funziona',
			pricing: 'Prezzi',
			faq: 'FAQ',
			contact: 'Contatti'
		},
		common: {
			book_whatsapp: 'Prenota su WhatsApp',
			check_availability: 'Verifica disponibilità',
			per_day: '/ giorno',
			live_availability: 'disponibilità in tempo reale',
			availability_page: 'pagina disponibilità'
		},
		footer: {
			tagline: 'Noleggio scooter elettrici — Tamraght e Taghazout, Marocco.',
			location: 'Tamraght e Taghazout, Marocco',
			nav_title: 'Navigazione',
			info_title: 'Informazioni',
			contact_title: 'Contatti',
			rights: 'Tutti i diritti riservati.'
		},
		hero: {
			location: 'Tamraght — Taghazout — Marocco',
			title: 'Noleggia uno scooter elettrico a Tamraght e Taghazout',
			subtitle:
				'Noleggio scooter elettrico veloce e semplice per il surf, la spiaggia o gli spostamenti in città. Scrivici su WhatsApp e confermiamo le tue date — come tra amici.',
			scroll: 'Scorri'
		},
		features: {
			tag: 'Perché sceglierci',
			heading: 'Noleggio semplice e locale, senza pensieri',
			items: [
				{ title: 'Ritiro locale', desc: 'Ritiro a Tamraght, a pochi minuti da Taghazout.' },
				{ title: 'Scooter ben tenuti', desc: 'Elettrici, comodi, pronti per costa e città.' },
				{ title: 'Date flessibili', desc: 'Controlla la disponibilità in tempo reale e prenota le tue date.' },
				{ title: 'Assistenza su WhatsApp', desc: 'Domande prima o durante il noleggio? Scrivici direttamente.' }
			]
		},
		packages: {
			tag: 'Pacchetti',
			heading: 'Pacchetti di noleggio',
			subtitle: 'Più giorni noleggi, meno paghi al giorno.',
			popular: 'Più richiesto',
			tiers: [
				{
					label: '1-3 Giorni',
					tag: 'Viaggio breve',
					desc: 'Perfetto per una rapida sessione di surf o un lungo weekend sulla costa.'
				},
				{
					label: '4-7 Giorni',
					tag: 'Una settimana',
					desc: 'La nostra opzione più richiesta — una settimana intera per esplorare Tamraght e Taghazout.'
				},
				{
					label: '11+ Giorni',
					tag: 'Soggiorno lungo',
					desc: 'La miglior tariffa giornaliera per soggiorni più lunghi sulla costa.'
				}
			],
			footnote_pre: 'Tariffe per scooter, al giorno. Controlla la',
			footnote_post: 'per la nostra flotta attuale.'
		},
		how_it_works: {
			tag: 'Processo',
			heading: 'Come prenotare',
			step1_pre: 'Controlla la',
			step1_post: 'e scegli un periodo libero.',
			steps: [
				{ title: 'Scegli scooter e date', desc: '' },
				{ title: 'Scrivici su WhatsApp', desc: 'Tocca un pulsante "Prenota su WhatsApp" — si aprirà una chat con la tua richiesta già compilata.' },
				{ title: 'Conferma e parti', desc: 'Confermiamo le tue date e i dettagli del ritiro direttamente su WhatsApp.' }
			]
		},
		pricing: {
			tag: 'Prezzi',
			heading: 'Tariffe giornaliere semplici',
			subtitle: 'Nessun costo nascosto.',
			per_day: 'al giorno',
			cards: [
				{ name: 'City Cruiser', desc: 'Comodo e leggero — ideale per gli spostamenti tra spiaggia e città.' },
				{ name: 'Long Range', desc: 'Batteria più grande per giornate lunghe tra gli spot di surf.' }
			]
		},
		faq: {
			tag: 'FAQ',
			heading: 'Domande frequenti',
			items: [
				{
					q: 'Dove ritiro lo scooter?',
					a: 'Il ritiro viene organizzato direttamente con noi a Tamraght, a pochi passi da Taghazout — la posizione esatta viene confermata su WhatsApp al momento della prenotazione.'
				},
				{ q: 'Serve la patente?', a: 'È richiesta una patente di guida valida. Portala con te al ritiro.' },
				{
					q: 'E se lo scooter che voglio è già prenotato?',
					a: 'Controlla la pagina della disponibilità in tempo reale, oppure scrivici su WhatsApp — a volte abbiamo posti last-minute.'
				},
				{
					q: 'Come confermo una prenotazione?',
					a: 'Tocca un pulsante "Prenota su WhatsApp" — si aprirà una chat WhatsApp con la tua richiesta già compilata, e confermiamo da lì.'
				}
			]
		},
		instagram: {
			tag: 'Instagram',
			heading: 'Segui l\'avventura dal vivo',
			subtitle: '— foto, video e dietro le quinte.',
			follow: 'Segui'
		},
		cta: {
			heading: 'Pronto a partire?',
			subtitle: 'Scrivici ora su WhatsApp — ti aiutiamo a scegliere lo scooter giusto e a confermare le tue date.'
		},
		availability: {
			title: 'Disponibilità scooter',
			subtitle: (days) =>
				`Verde = libero, rosso = già prenotato. I prossimi ${days} giorni per i nostri scooter a Tamraght e Taghazout.`,
			free: 'Libero',
			booked: 'Prenotato',
			scooter_col: 'Scooter',
			booking_title: 'Prenota su WhatsApp',
			booking_subtitle: 'Scegli uno scooter e le tue date — apriremo WhatsApp con la tua richiesta già compilata.',
			scooter_label: 'Scooter',
			start_label: 'Data di inizio',
			end_label: 'Data di fine',
			preparing: 'Preparazione…',
			submit: 'Prenota su WhatsApp',
			error_generic: 'Qualcosa è andato storto. Riprova.',
			error_network: 'Errore di rete. Riprova.'
		},
		messages: {
			generic: (business) => `Ciao! Vorrei noleggiare uno scooter da ${business}.`,
			scooterAsk: (business, scooterName) =>
				`Ciao! Vorrei noleggiare il ${scooterName} da ${business}. È disponibile?`,
			packageAsk: (business, tierLabel) =>
				`Ciao! Vorrei noleggiare uno scooter da ${business} per ${tierLabel}. È disponibile?`,
			bookingDates: (business, scooterName, start, end) =>
				`Ciao! Vorrei prenotare il ${scooterName} da ${business}, dal ${start} al ${end}. Puoi confermare?`
		}
	},
	ar: {
		dir: 'rtl',
		nav: {
			home: 'الرئيسية',
			packages: 'الباقات',
			how_it_works: 'كيف يعمل',
			pricing: 'الأسعار',
			faq: 'الأسئلة الشائعة',
			contact: 'اتصل بنا'
		},
		common: {
			book_whatsapp: 'احجز عبر واتساب',
			check_availability: 'تحقق من التوفر',
			per_day: '/ لليوم',
			live_availability: 'التوفر المباشر',
			availability_page: 'صفحة التوفر'
		},
		footer: {
			tagline: 'تأجير دراجات كهربائية — تمراغت وتغازوت، المغرب.',
			location: 'تمراغت وتغازوت، المغرب',
			nav_title: 'التنقل',
			info_title: 'معلومات',
			contact_title: 'اتصل بنا',
			rights: 'جميع الحقوق محفوظة.'
		},
		hero: {
			location: 'تمراغت — تغازوت — المغرب',
			title: 'استأجر دراجة كهربائية في تمراغت وتغازوت',
			subtitle:
				'تأجير دراجات كهربائية سريع وسهل لرحلات السيرف والشاطئ والتنقل في المدينة. راسلنا عبر واتساب وسنؤكد تواريخك — تماماً كالحجز مع صديق.',
			scroll: 'مرر للأسفل'
		},
		features: {
			tag: 'لماذا تحجز معنا',
			heading: 'تأجير سهل ومحلي بدون تعقيد',
			items: [
				{ title: 'استلام محلي', desc: 'الاستلام من تمراغت، على بعد دقائق من تغازوت.' },
				{ title: 'دراجات جيدة الصيانة', desc: 'كهربائية ومريحة وجاهزة لرحلات الساحل والمدينة.' },
				{ title: 'تواريخ مرنة', desc: 'تحقق من التوفر المباشر واحجز التواريخ التي تناسبك.' },
				{ title: 'دعم عبر واتساب', desc: 'لديك أسئلة قبل أو أثناء الإيجار؟ راسلنا مباشرة.' }
			]
		},
		packages: {
			tag: 'الباقات',
			heading: 'باقات التأجير',
			subtitle: 'كلما طالت مدة الإيجار، انخفض السعر اليومي.',
			popular: 'الأكثر طلباً',
			tiers: [
				{
					label: '١-٣ أيام',
					tag: 'رحلة قصيرة',
					desc: 'مثالية لرحلة سيرف سريعة أو عطلة نهاية أسبوع طويلة على الساحل.'
				},
				{
					label: '٤-٧ أيام',
					tag: 'أسبوع كامل',
					desc: 'خيارنا الأكثر شعبية — أسبوع كامل لاستكشاف تمراغت وتغازوت.'
				},
				{
					label: '+١١ يوماً',
					tag: 'إقامة ممتدة',
					desc: 'أفضل سعر يومي للإقامات الطويلة على الساحل.'
				}
			],
			footnote_pre: 'الأسعار لكل دراجة، لكل يوم. تحقق من',
			footnote_post: 'لمعرفة أسطولنا الحالي.'
		},
		how_it_works: {
			tag: 'الخطوات',
			heading: 'كيف يتم الحجز',
			step1_pre: 'تحقق من',
			step1_post: 'واختر فترة تواريخ متاحة.',
			steps: [
				{ title: 'اختر دراجتك وتواريخك', desc: '' },
				{ title: 'راسلنا عبر واتساب', desc: 'اضغط على أي زر "احجز عبر واتساب" — ستُفتح محادثة مع طلبك معبأً مسبقاً.' },
				{ title: 'أكّد وانطلق', desc: 'نؤكد تواريخك وتفاصيل الاستلام مباشرة عبر واتساب.' }
			]
		},
		pricing: {
			tag: 'الأسعار',
			heading: 'أسعار يومية بسيطة',
			subtitle: 'بدون رسوم خفية.',
			per_day: 'لليوم',
			cards: [
				{ name: 'City Cruiser', desc: 'مريحة وخفيفة — مثالية للتنقل بين الشاطئ والمدينة.' },
				{ name: 'Long Range', desc: 'بطارية أكبر لأيام أطول من التنقل بين نقاط السيرف.' }
			]
		},
		faq: {
			tag: 'الأسئلة الشائعة',
			heading: 'الأسئلة المتكررة',
			items: [
				{
					q: 'أين أستلم الدراجة؟',
					a: 'يتم الاستلام معنا مباشرة في تمراغت، على بعد دقائق من تغازوت — يتم تأكيد الموقع الدقيق عبر واتساب عند الحجز.'
				},
				{ q: 'هل أحتاج إلى رخصة قيادة؟', a: 'رخصة قيادة سارية مطلوبة. أحضرها معك عند الاستلام.' },
				{
					q: 'ماذا لو كانت الدراجة التي أريدها محجوزة؟',
					a: 'تحقق من صفحة التوفر المباشر، أو راسلنا عبر واتساب — أحياناً تتوفر لدينا مواعيد في اللحظة الأخيرة.'
				},
				{
					q: 'كيف أؤكد الحجز؟',
					a: 'اضغط على أي زر "احجز عبر واتساب" — ستُفتح محادثة واتساب مع طلبك معبأً مسبقاً، ونقوم بالتأكيد من هناك.'
				}
			]
		},
		instagram: {
			tag: 'انستغرام',
			heading: 'تابع المغامرة مباشرة',
			subtitle: '— صور وفيديوهات وما وراء الكواليس.',
			follow: 'تابعنا'
		},
		cta: {
			heading: 'جاهز للانطلاق؟',
			subtitle: 'راسلنا الآن عبر واتساب — سنساعدك على اختيار الدراجة المناسبة وتأكيد تواريخك.'
		},
		availability: {
			title: 'توفر الدراجات',
			subtitle: (days) =>
				`أخضر = متاح، أحمر = محجوز بالفعل. الأيام الـ ${days} القادمة لدراجاتنا في تمراغت وتغازوت.`,
			free: 'متاح',
			booked: 'محجوز',
			scooter_col: 'الدراجة',
			booking_title: 'احجز عبر واتساب',
			booking_subtitle: 'اختر دراجة وتواريخك — سنفتح واتساب مع طلبك معبأً مسبقاً.',
			scooter_label: 'الدراجة',
			start_label: 'تاريخ البدء',
			end_label: 'تاريخ الانتهاء',
			preparing: 'جارٍ التحضير…',
			submit: 'احجز عبر واتساب',
			error_generic: 'حدث خطأ ما. حاول مرة أخرى.',
			error_network: 'خطأ في الشبكة. حاول مرة أخرى.'
		},
		messages: {
			generic: (business) => `مرحباً! أود استئجار دراجة من ${business}.`,
			scooterAsk: (business, scooterName) =>
				`مرحباً! أود استئجار ${scooterName} من ${business}. هل هي متاحة؟`,
			packageAsk: (business, tierLabel) =>
				`مرحباً! أود استئجار دراجة من ${business} لمدة ${tierLabel}. هل هذا متاح؟`,
			bookingDates: (business, scooterName, start, end) =>
				`مرحباً! أود حجز ${scooterName} من ${business}، من ${start} إلى ${end}. هل يمكنكم التأكيد؟`
		}
	}
};
