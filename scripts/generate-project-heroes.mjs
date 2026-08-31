/**
 * Generates hero artwork for the projects that don't have a blog hero to borrow.
 *
 * The blog heroes in `src/assets` are hand-drawn dark-navy 1200x630 scenes; these
 * follow the same palette and proportions so the /projects grid reads as one set.
 *
 *   node scripts/generate-project-heroes.mjs
 *
 * Output: src/assets/projects/<slug>-hero.svg (regenerated, safe to delete)
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../src/assets/projects');

const W = 1200;
const H = 630;

const esc = (s) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------------------------------------------------------------- motifs
// Each motif draws into the band y≈110..420, centred on x=600.

const motifs = {
	/** hub with orbiting satellites - integrations, mediators, platforms */
	hub(a) {
		const cx = 600;
		const cy = 268;
		const nodes = [
			[300, 170],
			[300, 366],
			[500, 130],
			[700, 130],
			[900, 170],
			[900, 366],
			[500, 406],
			[700, 406],
		];
		return `
	<g opacity="0.9">
		${nodes
			.map(
				([x, y]) =>
					`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${a}" stroke-width="1.5" opacity="0.35" stroke-dasharray="5 6"/>`,
			)
			.join('\n\t\t')}
	</g>
	<g>
		${nodes
			.map(
				([x, y]) =>
					`<rect x="${x - 46}" y="${y - 24}" width="92" height="48" rx="10" fill="#111a33" stroke="${a}" stroke-opacity="0.5"/>`,
			)
			.join('\n\t\t')}
	</g>
	<circle cx="${cx}" cy="${cy}" r="74" fill="#0d1428" stroke="${a}" stroke-width="2" filter="url(#glow)"/>
	<circle cx="${cx}" cy="${cy}" r="30" fill="${a}" opacity="0.9"/>`;
	},

	/** stacked panels in perspective - templates, platform backends */
	layers(a) {
		return `
	<g>
		${[0, 1, 2, 3]
			.map((i) => {
				const y = 150 + i * 62;
				const inset = (3 - i) * 46;
				return `<rect x="${330 + inset}" y="${y}" width="${540 - inset * 2}" height="46" rx="10" fill="#111a33" stroke="${a}" stroke-opacity="${0.25 + i * 0.2}"/>
		<rect x="${350 + inset}" y="${y + 17}" width="${120 - inset / 3}" height="12" rx="6" fill="${a}" opacity="${0.3 + i * 0.18}"/>`;
			})
			.join('\n\t\t')}
	</g>`;
	},

	/** waveform - speech and audio */
	wave(a) {
		const bars = Array.from({ length: 42 }, (_, i) => {
			const t = i / 41;
			const h = 26 + Math.abs(Math.sin(t * Math.PI * 3.1)) * 150 * (0.45 + 0.55 * Math.sin(t * Math.PI));
			return `<rect x="${268 + i * 16}" y="${268 - h / 2}" width="8" height="${h}" rx="4" fill="${a}" opacity="${0.45 + 0.5 * Math.abs(Math.sin(t * Math.PI * 3.1))}"/>`;
		}).join('\n\t\t');
		return `<g>\n\t\t${bars}\n\t</g>`;
	},

	/** map with dropped pins - location samples */
	pins(a) {
		const pin = (x, y, s) => `
		<g transform="translate(${x} ${y}) scale(${s})">
			<path d="M0 0c0-26-20-40-20-58a20 20 0 0 1 40 0C20-40 0-26 0 0Z" fill="${a}" opacity="0.92"/>
			<circle cx="0" cy="-58" r="8" fill="#0b1020"/>
		</g>`;
		return `
	<g opacity="0.5">
		${[0, 1, 2, 3, 4]
			.map((i) => `<path d="M300 ${150 + i * 58}h600" stroke="${a}" stroke-opacity="0.16" stroke-width="1.5"/>`)
			.join('\n\t\t')}
		${[0, 1, 2, 3, 4, 5, 6]
			.map((i) => `<path d="M${310 + i * 96} 140v250" stroke="${a}" stroke-opacity="0.16" stroke-width="1.5"/>`)
			.join('\n\t\t')}
	</g>
	<path d="M320 350c90-40 130 20 210-30s150-120 240-70 120 30 110 30" fill="none" stroke="${a}" stroke-width="3" stroke-dasharray="10 10" opacity="0.7"/>
	${pin(430, 330, 1)}
	${pin(640, 268, 1.25)}
	${pin(860, 320, 0.9)}`;
	},

	/** phone + tablet frames with UI blocks - app samples */
	device(a) {
		return `
	<g>
		<rect x="330" y="130" width="300" height="290" rx="18" fill="#111a33" stroke="${a}" stroke-opacity="0.4"/>
		${[0, 1, 2, 3]
			.map(
				(i) =>
					`<rect x="356" y="${168 + i * 56}" width="${248 - (i % 2) * 70}" height="34" rx="8" fill="${a}" opacity="${0.5 - i * 0.09}"/>`,
			)
			.join('\n\t\t')}
		<rect x="670" y="150" width="200" height="270" rx="26" fill="#0d1428" stroke="${a}" stroke-width="2"/>
		<rect x="742" y="164" width="56" height="8" rx="4" fill="${a}" opacity="0.6"/>
		${[0, 1, 2]
			.map((i) => `<rect x="694" y="${200 + i * 62} " width="152" height="46" rx="10" fill="${a}" opacity="${0.42 - i * 0.1}"/>`)
			.join('\n\t\t')}
	</g>`;
	},

	/** gauge - diagnostics, monitoring */
	dial(a) {
		const cx = 600;
		const cy = 320;
		const r = 165;
		const ticks = Array.from({ length: 21 }, (_, i) => {
			const ang = Math.PI + (i / 20) * Math.PI;
			const x1 = cx + Math.cos(ang) * (r - 26);
			const y1 = cy + Math.sin(ang) * (r - 26);
			const x2 = cx + Math.cos(ang) * (r - (i % 5 === 0 ? 2 : 12));
			const y2 = cy + Math.sin(ang) * (r - (i % 5 === 0 ? 2 : 12));
			return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${a}" stroke-width="${i % 5 === 0 ? 4 : 2}" opacity="${i % 5 === 0 ? 0.9 : 0.4}"/>`;
		}).join('\n\t\t');
		return `
	<path d="M${cx - r} ${cy}a${r} ${r} 0 0 1 ${r * 2} 0" fill="none" stroke="${a}" stroke-opacity="0.25" stroke-width="2"/>
	<g>${ticks}</g>
	<line x1="${cx}" y1="${cy}" x2="${cx + 108}" y2="${cy - 92}" stroke="${a}" stroke-width="7" stroke-linecap="round" filter="url(#glow)"/>
	<circle cx="${cx}" cy="${cy}" r="20" fill="#0d1428" stroke="${a}" stroke-width="4"/>`;
	},

	/** terminal window - build-time tooling */
	terminal(a) {
		const lines = [420, 300, 500, 250, 380, 200];
		return `
	<g>
		<rect x="290" y="120" width="620" height="300" rx="14" fill="#0d1428" stroke="${a}" stroke-opacity="0.45"/>
		<rect x="290" y="120" width="620" height="42" rx="14" fill="#111a33"/>
		<rect x="290" y="148" width="620" height="14" fill="#111a33"/>
		${[0, 1, 2].map((i) => `<circle cx="${318 + i * 24}" cy="141" r="6" fill="${a}" opacity="${0.85 - i * 0.25}"/>`).join('\n\t\t')}
		${lines
			.map(
				(w, i) => `<rect x="322" y="${192 + i * 34}" width="14" height="14" rx="3" fill="${a}" opacity="0.9"/>
		<rect x="350" y="${192 + i * 34}" width="${w * 0.86}" height="14" rx="7" fill="${a}" opacity="${0.34 - i * 0.03}"/>`,
			)
			.join('\n\t\t')}
	</g>`;
	},

	/** chat bubbles - conversational and party games */
	bubbles(a) {
		return `
	<g>
		<path d="M300 150h380a22 22 0 0 1 22 22v112a22 22 0 0 1-22 22H392l-58 46v-46h-34a22 22 0 0 1-22-22V172a22 22 0 0 1 22-22Z" fill="#111a33" stroke="${a}" stroke-opacity="0.45"/>
		${[0, 1, 2].map((i) => `<rect x="332" y="${188 + i * 40}" width="${300 - i * 64}" height="18" rx="9" fill="${a}" opacity="${0.45 - i * 0.1}"/>`).join('\n\t\t')}
		<path d="M900 210H620a22 22 0 0 0-22 22v104a22 22 0 0 0 22 22h188l50 40v-40h42a22 22 0 0 0 22-22V232a22 22 0 0 0-22-22Z" fill="${a}" fill-opacity="0.16" stroke="${a}" stroke-opacity="0.6"/>
		${[0, 1].map((i) => `<rect x="632" y="${248 + i * 40}" width="${236 - i * 88}" height="18" rx="9" fill="${a}" opacity="${0.7 - i * 0.25}"/>`).join('\n\t\t')}
	</g>`;
	},

	/** shield with a checklist - permissions */
	shield(a) {
		return `
	<g>
		<path d="M600 120 780 178v118c0 88-76 140-180 176-104-36-180-88-180-176V178Z" fill="#111a33" stroke="${a}" stroke-opacity="0.55" stroke-width="2"/>
		<path d="M600 120 780 178v118c0 88-76 140-180 176V120Z" fill="${a}" fill-opacity="0.12"/>
		${[0, 1, 2]
			.map(
				(i) => `<circle cx="524" cy="${232 + i * 56}" r="11" fill="none" stroke="${a}" stroke-width="3" opacity="0.85"/>
		<path d="m518 ${232 + i * 56}l5 6 10-12" fill="none" stroke="${a}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
		<rect x="552" y="${224 + i * 56}" width="${140 - i * 30}" height="16" rx="8" fill="${a}" opacity="${0.5 - i * 0.11}"/>`,
			)
			.join('\n\t\t')}
	</g>`;
	},

	/** globe with meridians - localization */
	globe(a) {
		return `
	<g>
		<circle cx="600" cy="270" r="150" fill="#0d1428" stroke="${a}" stroke-opacity="0.55" stroke-width="2"/>
		<circle cx="600" cy="270" r="150" fill="${a}" fill-opacity="0.07"/>
		${[0.32, 0.66, 1]
			.map(
				(k) =>
					`<ellipse cx="600" cy="270" rx="${(150 * k).toFixed(0)}" ry="150" fill="none" stroke="${a}" stroke-opacity="0.35" stroke-width="1.5"/>`,
			)
			.join('\n\t\t')}
		${[-90, -45, 0, 45, 90]
			.map((dy) => {
				const rx = Math.sqrt(Math.max(0, 150 * 150 - dy * dy));
				return `<path d="M${600 - rx} ${270 + dy}h${rx * 2}" stroke="${a}" stroke-opacity="0.3" stroke-width="1.5"/>`;
			})
			.join('\n\t\t')}
		${[
			[540, 208],
			[664, 244],
			[576, 318],
			[688, 330],
		]
			.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="${a}" filter="url(#glow)"/>`)
			.join('\n\t\t')}
	</g>`;
	},

	/** pipeline of boxes and arrows - request/response samples */
	pipeline(a) {
		const boxes = [340, 540, 740];
		return `
	<g>
		${boxes
			.map(
				(x, i) => `<rect x="${x}" y="${190 + (i % 2) * 40}" width="150" height="110" rx="14" fill="#111a33" stroke="${a}" stroke-opacity="${0.4 + i * 0.15}"/>
		<rect x="${x + 24}" y="${222 + (i % 2) * 40}" width="102" height="14" rx="7" fill="${a}" opacity="0.55"/>
		<rect x="${x + 24}" y="${248 + (i % 2) * 40}" width="66" height="14" rx="7" fill="${a}" opacity="0.3"/>`,
			)
			.join('\n\t\t')}
		${[0, 1]
			.map(
				(i) =>
					`<path d="M${boxes[i] + 150} ${245 + (i % 2) * 40}h34l16 ${i % 2 ? -40 : 40}h34" fill="none" stroke="${a}" stroke-width="3" stroke-linecap="round" opacity="0.7"/>`,
			)
			.join('\n\t\t')}
		<circle cx="${boxes[2] + 168}" cy="${325}" r="10" fill="${a}"/>
	</g>`;
	},

	/** two devices and broadcast arcs - Bluetooth samples */
	signal(a) {
		const arcs = (x, dir) =>
			[1, 2, 3]
				.map(
					(i) =>
						`<path d="M${x + dir * i * 34} ${268 - i * 26}a${i * 34} ${i * 34} 0 0 ${dir > 0 ? 1 : 0} 0 ${i * 52}" fill="none" stroke="${a}" stroke-width="4" stroke-linecap="round" opacity="${0.8 - i * 0.2}"/>`,
				)
				.join('\n\t\t');
		return `
	<g>
		<rect x="230" y="176" width="150" height="186" rx="20" fill="#111a33" stroke="${a}" stroke-opacity="0.6" stroke-width="2"/>
		<rect x="820" y="176" width="150" height="186" rx="20" fill="#111a33" stroke="${a}" stroke-opacity="0.6" stroke-width="2"/>
		${[0, 1].map((i) => `<rect x="256" y="${208 + i * 46}" width="98" height="18" rx="9" fill="${a}" opacity="${0.6 - i * 0.25}"/>`).join('\n\t\t')}
		${[0, 1].map((i) => `<rect x="846" y="${208 + i * 46}" width="98" height="18" rx="9" fill="${a}" opacity="${0.6 - i * 0.25}"/>`).join('\n\t\t')}
		${arcs(400, 1)}
		${arcs(800, -1)}
		<circle cx="600" cy="268" r="34" fill="#0d1428" stroke="${a}" stroke-width="3" filter="url(#glow)"/>
		<path d="M600 240v56l22-16-44-24 44-24-22-16" fill="none" stroke="${a}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
	</g>`;
	},

	/** fanned cards - party games */
	cards(a) {
		return `
	<g>
		${[-24, -8, 8, 24]
			.map((deg, i) => {
				const opacity = 0.35 + i * 0.18;
				return `<g transform="rotate(${deg} 600 470)">
			<rect x="502" y="140" width="196" height="272" rx="18" fill="#111a33" stroke="${a}" stroke-opacity="${opacity}" stroke-width="2"/>
			<rect x="530" y="176" width="140" height="20" rx="10" fill="${a}" opacity="${opacity}"/>
			<rect x="530" y="212" width="96" height="20" rx="10" fill="${a}" opacity="${opacity * 0.6}"/>
		</g>`;
			})
			.join('\n\t\t')}
		<circle cx="600" cy="252" r="30" fill="${a}" opacity="0.9" filter="url(#glow)"/>
	</g>`;
	},

	/** equalizer + note - music */
	music(a) {
		const bars = Array.from(
			{ length: 9 },
			(_, i) =>
				`<rect x="${348 + i * 46}" y="${390 - (40 + Math.abs(Math.sin(i * 1.1)) * 190)}" width="26" height="${40 + Math.abs(Math.sin(i * 1.1)) * 190}" rx="13" fill="${a}" opacity="${0.35 + (i % 3) * 0.22}"/>`,
		).join('\n\t\t');
		return `
	<g>${bars}</g>
	<g transform="translate(806 168)">
		<path d="M0 152V26l128-26v126" fill="none" stroke="${a}" stroke-width="9" stroke-linecap="round"/>
		<circle cx="-22" cy="152" r="26" fill="${a}"/>
		<circle cx="106" cy="126" r="26" fill="${a}"/>
	</g>`;
	},
};

// ---------------------------------------------------------------- template

function hero({ title, kicker, repo, accent, motif }) {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(title)}">
	<defs>
		<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" stop-color="#0b1020"/>
			<stop offset="50%" stop-color="#161c3d"/>
			<stop offset="100%" stop-color="#0b1020"/>
		</linearGradient>
		<radialGradient id="halo" cx="50%" cy="42%" r="62%">
			<stop offset="0%" stop-color="${accent}" stop-opacity="0.30"/>
			<stop offset="60%" stop-color="${accent}" stop-opacity="0.07"/>
			<stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
		</radialGradient>
		<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
			<path d="M40 0H0v40" fill="none" stroke="#ffffff" stroke-opacity="0.045" stroke-width="1"/>
		</pattern>
		<filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
			<feGaussianBlur stdDeviation="7" result="b"/>
			<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
		</filter>
	</defs>

	<rect width="${W}" height="${H}" fill="url(#bg)"/>
	<rect width="${W}" height="${H}" fill="url(#grid)"/>
	<rect width="${W}" height="${H}" fill="url(#halo)"/>
	<rect x="0" y="0" width="${W}" height="6" fill="${accent}" opacity="0.85"/>
${motifs[motif](accent)}

	<text x="${W / 2}" y="506" text-anchor="middle" font-family="Inter, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="66" font-weight="700" fill="#f8fafc" letter-spacing="-1.5">${esc(title)}</text>
	<text x="${W / 2}" y="556" text-anchor="middle" font-family="Inter, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="27" font-weight="500" fill="${accent}" opacity="0.95">${esc(kicker)}</text>
	<text x="${W / 2}" y="598" text-anchor="middle" font-family="ui-monospace, 'SF Mono', Menlo, Consolas, monospace" font-size="19" fill="#94a3b8" opacity="0.75">${esc(repo)}</text>
</svg>
`;
}

// ---------------------------------------------------------------- catalogue

const projects = [
	// libraries
	{ slug: 'speech', title: 'Speech', kicker: 'Speech-to-text, text-to-speech, everywhere', repo: 'shinyorg/speech', accent: '#38bdf8', motif: 'wave' },
	{ slug: 'obd', title: 'OBD', kicker: 'Vehicle diagnostics over OBD-II', repo: 'shinyorg/obd', accent: '#f97316', motif: 'dial' },
	{ slug: 'extensions', title: 'App Extensions', kicker: 'Source generators that delete boilerplate', repo: 'shinyorg/extensions', accent: '#a78bfa', motif: 'hub' },

	// tooling
	{ slug: 'localizegen', title: 'Localization Generator', kicker: 'Type-safe .resx, at compile time', repo: 'shinyorg/localizegen', accent: '#22d3ee', motif: 'globe' },
	{ slug: 'msbuildpermissions', title: 'MSBuild Permissions', kicker: 'Declare once, generated at build', repo: 'shinyorg/msbuildpermissions', accent: '#4ade80', motif: 'shield' },
	{ slug: 'templates', title: 'App Templates', kicker: 'Scaffolding for Shiny-powered apps', repo: 'shinyorg/templates', accent: '#818cf8', motif: 'layers' },

	// samples
	{ slug: 'wonderland', title: "Wonderland Ride Times", kicker: 'Live wait times, background jobs', repo: 'shinyorg/wonderland', accent: '#f472b6', motif: 'device' },
	{ slug: 'whereareyou', title: 'Where Are You', kicker: 'Background GPS into .NET Orleans', repo: 'GoneDotNet/whereareyou', accent: '#34d399', motif: 'pins' },
	{ slug: 'githubmon', title: 'GitHub Mon', kicker: 'Desktop dashboard for your repos', repo: 'aritchie/githubmon', accent: '#60a5fa', motif: 'terminal' },
	{ slug: 'digitalscoreboard', title: 'Digital Scoreboard', kicker: 'Bluetooth LE client and peripheral', repo: 'aritchie/digitalscoreboard', accent: '#22d3ee', motif: 'signal' },
	{ slug: 'plexsuggest', title: 'Plex Suggest', kicker: 'Scored picks from your watch history', repo: 'aritchie/plexsuggest', accent: '#fbbf24', motif: 'layers' },
	{ slug: 'beatthebank', title: 'Beat The Bank', kicker: 'Voice-powered trivia', repo: 'aritchie/beatthebank', accent: '#f87171', motif: 'bubbles' },
	{ slug: 'tunegames', title: 'TUNE Games', kicker: 'Name that tune, from your own library', repo: 'aritchie/tunegames', accent: '#c084fc', motif: 'music' },
	{ slug: 'headsup', title: 'Heads Up Clone', kicker: 'Accelerometer party game', repo: 'gonedotnet/headsup', accent: '#fb923c', motif: 'cards' },
	{ slug: 'mediatorsample', title: 'Mediator Sample', kicker: 'Handlers, events, middleware', repo: 'shinyorg/mediatorsample', accent: '#a3e635', motif: 'pipeline' },
];

mkdirSync(OUT, { recursive: true });
for (const project of projects) {
	writeFileSync(`${OUT}/${project.slug}-hero.svg`, hero(project));
}
console.log(`Wrote ${projects.length} hero images to ${OUT}`);
