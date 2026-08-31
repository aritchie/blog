/**
 * GitHub contribution calendar, fetched at build time.
 *
 * GitHub's public contributions fragment needs no token, which keeps this
 * working in local dev and in CI without secrets. The site rebuilds on a
 * weekday cron, so the graph stays reasonably fresh.
 */

export interface ContributionDay {
	/** ISO date, `YYYY-MM-DD` */
	date: string;
	count: number;
	/** GitHub's own 0-4 intensity bucket */
	level: number;
}

export interface ContributionCalendar {
	days: ContributionDay[];
	total: number;
	from: string;
	to: string;
}

const DAY_CELL = /<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*>/g;
const CELL_ID = /id="([^"]+)"/;
const CELL_LEVEL = /data-level="(\d+)"/;
const TOOLTIP = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g;

/**
 * Pulls the day counts out of GitHub's contribution calendar markup. The count
 * only exists in the cell's tooltip text ("12 contributions on March 3rd."),
 * so cells are matched to tooltips by element id.
 */
export function parseContributions(html: string): ContributionCalendar | null {
	const counts = new Map<string, number>();
	for (const [, id, text] of html.matchAll(TOOLTIP)) {
		const n = /^\s*([\d,]+)\s+contribution/.exec(text);
		counts.set(id, n ? Number(n[1].replace(/,/g, '')) : 0);
	}

	const days: ContributionDay[] = [];
	for (const [tag, date] of html.matchAll(DAY_CELL)) {
		const id = CELL_ID.exec(tag)?.[1] ?? '';
		days.push({
			date,
			count: counts.get(id) ?? 0,
			level: Number(CELL_LEVEL.exec(tag)?.[1] ?? 0),
		});
	}

	if (days.length === 0) return null;

	days.sort((a, b) => a.date.localeCompare(b.date));
	return {
		days,
		total: days.reduce((n, d) => n + d.count, 0),
		from: days[0].date,
		to: days[days.length - 1].date,
	};
}

export async function getContributions(
	user: string,
	timeoutMs = 8000,
): Promise<ContributionCalendar | null> {
	try {
		const res = await fetch(`https://github.com/users/${user}/contributions`, {
			headers: {
				// GitHub serves the fragment differently without a browser-ish accept header
				accept: 'text/html',
				'user-agent': 'allanritchie.com build',
			},
			signal: AbortSignal.timeout(timeoutMs),
		});
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		return parseContributions(await res.text());
	} catch (err) {
		console.warn(
			`[contributions] could not load GitHub activity for ${user}: ${
				err instanceof Error ? err.message : err
			}`,
		);
		return null;
	}
}

/**
 * Lays the days out the way GitHub does - one column per week, Sunday at the
 * top - padding the first and last columns so partial weeks keep their offset.
 */
export function toWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
	const weeks: (ContributionDay | null)[][] = [];
	let week: (ContributionDay | null)[] = new Array(7).fill(null);

	for (const day of days) {
		const weekday = new Date(`${day.date}T00:00:00Z`).getUTCDay();
		week[weekday] = day;
		if (weekday === 6) {
			weeks.push(week);
			week = new Array(7).fill(null);
		}
	}
	if (week.some((d) => d !== null)) weeks.push(week);
	return weeks;
}
