/**
 * Speaking history behind /speaking.
 *
 * Kept as data so the page can sort, group by year, count and filter without
 * any of that being hand-maintained in a markdown table.
 */

export type TalkFormat =
	| 'Conference'
	| 'Community standup'
	| 'Live stream'
	| 'User group'
	| 'Podcast'
	| 'Workshop';

export interface Talk {
	/** Where it happened */
	event: string;
	/** The session title. Omitted when the appearance had no title of its own. */
	title?: string;
	/** ISO date. Day-precision unless the original listing only recorded a month. */
	date: string;
	/** True when only the month was recorded, so the day isn't displayed as fact */
	monthOnly?: boolean;
	format: TalkFormat;
	links?: { label: string; href: string }[];
}

/** Filter facets, in display order. */
export const FORMATS: TalkFormat[] = [
	'Conference',
	'Community standup',
	'Live stream',
	'User group',
	'Podcast',
	'Workshop',
];

/** What I'm usually asked to talk about. */
export const TOPICS = [
	'.NET MAUI',
	'Bluetooth LE',
	'Background processing',
	'Cross-platform architecture',
	'Mobile data & sync',
	'API design',
	'Open source maintenance',
	'Reactive programming',
];

export const TALKS: Talk[] = [
	{
		event: '.NET Community Standup',
		date: '2026-03-25',
		format: 'Community standup',
		links: [
			{
				label: 'YouTube',
				href: 'https://www.youtube.com/watch?v=nY74XPjLw0U&list=PLdo4fOcmZ0oX-sL7AFmygVw2A37Hbp8ZS&index=1&t=3648s',
			},
		],
	},
	{
		event: '.NET Community Standup',
		title: 'Allan Ritchie is SHINY (v3 Release)',
		date: '2023-09-07',
		format: 'Community standup',
		links: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=oyLgrIzfVIg' }],
	},
	{
		event: 'Inside dotNET with Cecil Phillip & Rodney Littles',
		title: 'Shiny Version 3',
		date: '2023-02-01',
		format: 'Live stream',
		links: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=98n3y2fYhVw' }],
	},
	{
		event: 'Microsoft Reactor',
		title: 'Introduction to .NET MAUI',
		date: '2022-09-28',
		format: 'Live stream',
		links: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=ZbKeM9wB4Ig' }],
	},
	{
		event: '.NET Conf: Focus on MAUI',
		title: 'Unit Testing For Your MAUI Applications',
		date: '2022-08-09',
		format: 'Conference',
		links: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=b4OJSmgMAaw' }],
	},
	{
		event: '.NET Community Standup',
		date: '2022-04-07',
		format: 'Community standup',
		links: [
			{
				label: 'YouTube',
				href: 'https://www.youtube.com/watch?v=Sa4pF1hAQHI&list=PLdo4fOcmZ0oX-DBuRG4u58ZTAJgBAeQ-t&index=2',
			},
		],
	},
	{
		event: 'XamExpertDay 2021',
		title: "There's More to Xamarin Than UI — Let's do Some Background Magic with Shiny.NET",
		date: '2021-10-01',
		format: 'Conference',
		links: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=5f8Gruz28DM' }],
	},
	{
		event: 'Cologne Xamarin User Group',
		title: 'Shiny 2.0 For Xamarin — Shinier Than Ever',
		date: '2021-06-11',
		format: 'User group',
		links: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=9nCFwSTkeCg' }],
	},
	{
		event: 'The Xamarin Show',
		title: 'Awesome Cross Platform with Shiny 2.0',
		date: '2021-06-10',
		format: 'Live stream',
		links: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=XEOw4Qe_fQk' }],
	},
	{
		event: "Kerry Lothrop's #DevTalk Podcast",
		title: 'Introducing Shiny',
		date: '2021-05-10',
		format: 'Podcast',
		links: [{ label: 'Listen', href: 'https://kerry.lothrop.de/devtalk-63-allan-ritchie/' }],
	},
	{
		event: 'Cape Town MS Developer User Group',
		title: 'Shiny 2.0',
		date: '2021-04-22',
		format: 'User group',
		links: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=Tfa84zjoHK0' }],
	},
	{
		event: "Dan Siegel's Live Stream",
		title: 'Shiny 2.0',
		date: '2021-04-06',
		format: 'Live stream',
		links: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=hwHdvKCjtl8' }],
	},
	{
		event: '.NET Dev Show',
		title: 'Introduction to Shiny.NET',
		date: '2021-04-06',
		format: 'Live stream',
		links: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=lcOD7VtSX3w' }],
	},
	{
		event: '.NET Conf 2020: Focus on Xamarin',
		title: 'Shiny 101',
		date: '2020-03-01',
		monthOnly: true,
		format: 'Conference',
		links: [
			{
				label: 'Watch',
				href: 'https://channel9.msdn.com/Events/dotnetConf/Focus-on-Xamarin/Spectacular-Components-for-Xamarin-Apps',
			},
		],
	},
	{
		event: "Dan Siegel's Live Stream",
		title: "Look it's so Shiny…",
		date: '2020-02-13',
		format: 'Live stream',
		links: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=HWqWqj--JIU' }],
	},
	{
		event: 'Xamarin Saturday — Toronto',
		title: 'Cross Platform API Design from the Trenches',
		date: '2019-08-24',
		format: 'Conference',
		links: [
			{
				label: 'YouTube',
				href: 'https://www.youtube.com/playlist?list=PL6DNtxsGuK842yk0yBIHOzTs2_IDWnI4I',
			},
		],
	},
	{
		event: 'My Live Stream',
		title: 'Unit Testing with Shiny',
		date: '2019-08-16',
		format: 'Live stream',
		links: [{ label: 'YouTube', href: 'https://youtu.be/pLXLSgWSr_8' }],
	},
	{
		event: 'My Live Stream',
		title:
			'What do Shiny, Prism & ReactiveUI have in common? They can make awesome apps! (Part 2)',
		date: '2019-08-09',
		format: 'Live stream',
		links: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=TCLb2RQeWDc&t=3632s' }],
	},
	{
		event: 'Xamarin Developer Summit',
		title: 'Background Like a Boss with Shiny',
		date: '2019-07-12',
		format: 'Conference',
		links: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=aLtk-VlGicY' }],
	},
	{
		event: 'Xamarin Developer Summit',
		title: 'Escape Room BLE Workshop',
		date: '2019-07-12',
		format: 'Workshop',
	},
	{
		event: 'My Live Stream',
		title:
			'What do Shiny, Prism & ReactiveUI have in common? They can make awesome apps! (Part 1)',
		date: '2019-06-17',
		format: 'Live stream',
		links: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=bkp2mXOatgk' }],
	},
	{
		event: 'Toronto Mobile .NET User Group',
		title: 'An Introduction to Shiny',
		date: '2019-06-17',
		format: 'User group',
		links: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=XgTbnJ_YNZs' }],
	},
	{
		event: "David Ortinau's Live Stream",
		title: 'Xamarin.Forms — Reactive Programming with Allan Ritchie',
		date: '2019-06-16',
		format: 'Live stream',
		links: [{ label: 'Twitch', href: 'https://www.twitch.tv/videos/438561811' }],
	},
];

/** Newest first, then grouped into descending years. */
export function talksByYear(talks: Talk[] = TALKS) {
	const sorted = [...talks].sort((a, b) => b.date.localeCompare(a.date));
	const years = new Map<string, Talk[]>();
	for (const talk of sorted) {
		const year = talk.date.slice(0, 4);
		years.set(year, [...(years.get(year) ?? []), talk]);
	}
	return [...years.entries()].map(([year, items]) => ({ year, items }));
}

export const TOTAL_TALKS = TALKS.length;
export const RECORDED_TALKS = TALKS.filter((t) => (t.links?.length ?? 0) > 0).length;
export const FIRST_YEAR = TALKS.reduce((min, t) => (t.date < min ? t.date : min), TALKS[0].date).slice(0, 4);
