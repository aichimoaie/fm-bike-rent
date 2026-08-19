import Database from 'better-sqlite3';
import { randomUUID } from 'node:crypto';
import { building } from '$app/environment';

const DB_PATH = process.env.DATABASE_PATH ?? 'data.sqlite3';

// Skip opening a real DB file during `vite build` prerendering of static pages.
export const db = building ? new Database(':memory:') : new Database(DB_PATH);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
	CREATE TABLE IF NOT EXISTS scooters (
		id TEXT PRIMARY KEY,
		name TEXT NOT NULL,
		model TEXT NOT NULL,
		price_per_day INTEGER NOT NULL, -- MAD per day
		description TEXT NOT NULL,
		active INTEGER NOT NULL DEFAULT 1
	);

	CREATE TABLE IF NOT EXISTS reservations (
		id TEXT PRIMARY KEY,
		scooter_id TEXT NOT NULL REFERENCES scooters(id),
		customer_name TEXT NOT NULL,
		customer_phone TEXT NOT NULL,
		start_date TEXT NOT NULL, -- ISO date, inclusive
		end_date TEXT NOT NULL,   -- ISO date, inclusive
		created_at TEXT NOT NULL
	);

	CREATE INDEX IF NOT EXISTS idx_reservations_scooter ON reservations(scooter_id);
`);

const scooterCount = db.prepare('SELECT COUNT(*) as n FROM scooters').get() as { n: number };

if (scooterCount.n === 0) {
	const insert = db.prepare(
		'INSERT INTO scooters (id, name, model, price_per_day, description) VALUES (?, ?, ?, ?, ?)'
	);
	const seed = db.transaction(() => {
		insert.run(
			randomUUID(),
			'Scooter 1',
			'City Cruiser',
			150,
			'Comfortable electric scooter, great for beach-to-town rides around Tamraght and Taghazout.'
		);
		insert.run(
			randomUUID(),
			'Scooter 2',
			'City Cruiser',
			150,
			'Comfortable electric scooter, great for beach-to-town rides around Tamraght and Taghazout.'
		);
		insert.run(
			randomUUID(),
			'Scooter 3',
			'Long Range',
			200,
			'Higher-capacity battery for longer surf-spot-hopping days along the coast.'
		);
	});
	seed();
}

export interface Scooter {
	id: string;
	name: string;
	model: string;
	price_per_day: number;
	description: string;
	active: number;
}

export interface Reservation {
	id: string;
	scooter_id: string;
	customer_name: string;
	customer_phone: string;
	start_date: string;
	end_date: string;
	created_at: string;
}

export function listScooters(): Scooter[] {
	return db.prepare('SELECT * FROM scooters WHERE active = 1 ORDER BY name').all() as Scooter[];
}

export function getScooter(id: string): Scooter | undefined {
	return db.prepare('SELECT * FROM scooters WHERE id = ?').get(id) as Scooter | undefined;
}

export function listReservations(): Reservation[] {
	return db.prepare('SELECT * FROM reservations ORDER BY start_date').all() as Reservation[];
}

export function listReservationsForScooter(scooterId: string): Reservation[] {
	return db
		.prepare('SELECT * FROM reservations WHERE scooter_id = ? ORDER BY start_date')
		.all(scooterId) as Reservation[];
}

/**
 * Two inclusive date ranges [aStart, aEnd] and [bStart, bEnd] overlap iff
 * aStart <= bEnd AND bStart <= aEnd. ISO date strings (YYYY-MM-DD) compare
 * correctly with plain string comparison.
 */
export function hasOverlap(scooterId: string, startDate: string, endDate: string): boolean {
	const row = db
		.prepare(
			`SELECT COUNT(*) as n FROM reservations
			 WHERE scooter_id = ?
			 AND start_date <= ?
			 AND end_date >= ?`
		)
		.get(scooterId, endDate, startDate) as { n: number };
	return row.n > 0;
}

export class OverlapError extends Error {
	constructor() {
		super('Scooter is already booked for an overlapping date range.');
	}
}

/**
 * Checks for an overlap and inserts the reservation inside a single
 * transaction so two concurrent submissions can't both pass the check
 * and double-book the same scooter.
 */
const createReservationTxn = db.transaction((input: {
	scooterId: string;
	customerName: string;
	customerPhone: string;
	startDate: string;
	endDate: string;
}): Reservation => {
	if (hasOverlap(input.scooterId, input.startDate, input.endDate)) {
		throw new OverlapError();
	}
	const id = randomUUID();
	const created_at = new Date().toISOString();
	db.prepare(
		`INSERT INTO reservations (id, scooter_id, customer_name, customer_phone, start_date, end_date, created_at)
		 VALUES (?, ?, ?, ?, ?, ?, ?)`
	).run(id, input.scooterId, input.customerName, input.customerPhone, input.startDate, input.endDate, created_at);
	return {
		id,
		scooter_id: input.scooterId,
		customer_name: input.customerName,
		customer_phone: input.customerPhone,
		start_date: input.startDate,
		end_date: input.endDate,
		created_at
	};
});

export function createReservation(input: {
	scooterId: string;
	customerName: string;
	customerPhone: string;
	startDate: string;
	endDate: string;
}): Reservation {
	return createReservationTxn(input);
}
