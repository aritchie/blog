/**
 * Project catalogue behind /projects.
 *
 * Kept as data (rather than markup) so the page can group, count, filter and
 * search without any of that logic being duplicated per card. Each project
 * carries a short `tagline` for scanning and `highlights` for the detail that
 * used to live in one unreadable wall-of-text paragraph.
 */

export interface Project {
	/** Display name */
	name: string;
	/** `org/repo` - shown in the card's mono eyebrow and used to build the GitHub link */
	repo: string;
	/** One sentence, ~20 words. What it is and who it's for. */
	tagline: string;
	/** Short feature phrases. Rendered as chips - keep each under ~6 words. */
	highlights?: string[];
	/** Filter facets. Keep to the shared vocabulary in `TAGS` below. */
	tags: string[];
	/** Documentation site, when one exists. Verified links only. */
	docs?: string;
	/**
	 * Hero artwork filename in `src/assets`. Cards with art get the large
	 * media treatment; cards without get the compact treatment.
	 */
	hero?: string;
}

export interface ProjectGroup {
	id: string;
	title: string;
	blurb: string;
	/** Large media cards (a hero is required) vs. compact text cards */
	layout: 'media' | 'compact';
	projects: Project[];
}

/** Facets offered in the filter bar, in display order. */
export const TAGS = [
	'MAUI',
	'Blazor',
	'ASP.NET',
	'AI',
	'Data',
	'UI',
	'Hardware',
	'Tooling',
	'AOT',
] as const;

export const GROUPS: ProjectGroup[] = [
	{
		id: 'frameworks',
		title: 'Frameworks',
		blurb:
			'The big ones. Long-lived libraries that entire apps get built on top of, maintained across every platform .NET runs on.',
		layout: 'media',
		projects: [
			{
				name: 'Shiny Mobile',
				repo: 'shinyorg/shiny',
				docs: 'https://shinylib.net',
				hero: 'shiny-client-v4-hero.svg',
				tagline:
					'Device services and background processing for .NET — one API across iOS, Android, Mac Catalyst, macOS, Windows, Linux, and Blazor WebAssembly.',
				highlights: [
					'Bluetooth LE client, GATT hosting & L2CAP',
					'GPS, geofencing & background location',
					'Local and push notifications',
					'Background jobs',
					'Resumable HTTP transfers & data sync',
					'Contacts and calendar',
					'Wi-Fi scan, join & hotspot hosting',
					'mDNS, SSDP/UPnP & WS-Discovery',
				],
				tags: ['MAUI', 'Blazor', 'Hardware'],
			},
			{
				name: 'DocumentDB',
				repo: 'shinyorg/documentdb',
				docs: 'https://shinylib.net/documentdb/',
				hero: 'documentdb-v13-hero.svg',
				tagline:
					'A database-agnostic document store for .NET — keep object graphs as schema-free JSON on whichever engine you already run, fully AOT and trim clean.',
				highlights: [
					'Completely AOT & trim clean — verified by a real ILC publish in CI',
					'SQLite, Postgres, Mongo, Cosmos, SQL Server & 8 more',
					'LINQ fluent query builder',
					'JSON indexes, up to 30× faster queries',
					'Vector/ANN and full-text search',
					'Spatial geo-queries and geofencing',
					'Change feeds & temporal history',
					'Field-level encryption & multi-tenancy',
					'Offline-first sync, OData & REST/SSE',
					'Aspire, Orleans, MCP and admin UIs',
				],
				tags: ['Data', 'Blazor', 'ASP.NET', 'AOT'],
			},
			{
				name: 'Shiny Controls',
				repo: 'shinyorg/controls',
				docs: 'https://shinylib.net/controls/',
				hero: 'shiny-controls-1-0-hero.svg',
				tagline:
					'A native, MVVM-friendly control library for Blazor and every .NET MAUI platform — iOS, Android, macOS, Windows and Linux — the screens every app needs, without building them twice.',
				highlights: [
					'Blazor plus all MAUI targets: iOS, Android, macOS, Windows & Linux',
					'TableView, DataGrid, TreeView & virtualized grids',
					'Scheduling, calendar and agenda views',
					'CameraView: photo, video & live effects',
					'Frame analyzers: barcode, face, OCR & documents',
					'ImageViewer, ImageEditor & media picking',
					'FloatingPanel, Fab menus and overlays',
					'ChatView, Wizard flows & Walkthroughs',
					'42 motion icons and keyframe animation',
					'Markdown, Mermaid & barcode rendering',
					'Desktop tray, docking and global hotkeys',
				],
				tags: ['MAUI', 'Blazor', 'UI', 'AOT'],
			},
			{
				name: 'Shiny Mediator',
				repo: 'shinyorg/mediator',
				docs: 'https://shinylib.net/mediator/',
				hero: 'shinymediator-v6-hero.svg',
				tagline:
					'The mediator pattern rebuilt for app developers — source-generated contracts and a middleware pipeline that spans MAUI, Blazor, and ASP.NET.',
				highlights: [
					'Source-generated, reflection-free contracts',
					'Request/response, streaming & events',
					'Middleware: caching, offline, resilience',
					'One pipeline across client and server',
					'Fully AOT and trim clean',
				],
				tags: ['MAUI', 'Blazor', 'ASP.NET', 'AOT'],
			},
			{
				name: 'HTTP Server',
				repo: 'shinyorg/httpserver',
				docs: 'https://shinylib.net/httpserver/',
				hero: 'shiny-httpserver-hero.svg',
				tagline:
					'HTTP/1.1, HTTP/2 and HTTP/3 that runs anywhere .NET runs — including inside a .NET MAUI app, where ASP.NET Core cannot.',
				highlights: [
					'Routing with ASP.NET-shaped middleware',
					'Source-generated typed endpoints',
					'WebSockets and Server-Sent Events',
					'Static files & Blazor WebAssembly hosting',
					'Basic, API key, cookie and JWT auth',
					'TLS with managed self-signed certs',
					'Tunnelling over SSH, quick tunnels or Azure Relay',
					'MCP, gRPC, WebDAV add-ons',
				],
				tags: ['MAUI', 'ASP.NET', 'AOT'],
			},
			{
				name: 'SwiftDotNet',
				repo: 'shinyorg/SwiftDotNet',
				hero: 'swiftdotnet-hero.svg',
				tagline:
					'SwiftUI for .NET, everywhere — write declarative UI once in C# and render it as real native controls on six platforms.',
				highlights: [
					'SwiftUI on iOS, macOS and tvOS',
					'Jetpack Compose on Android',
					'GTK4 on Linux, WinUI 3 on Windows',
					'HTML/DOM on the web',
					'SkiaSharp backend for a pixel-identical look',
					'State, bindings, gestures & animation',
					'Hot reload and a Rider plugin',
				],
				tags: ['UI', 'MAUI'],
			},
			{
				name: 'Speech, Audio & AI Conversation',
				repo: 'shinyorg/speech',
				docs: 'https://shinylib.net/speech/',
				hero: 'projects/speech-ai-hero.svg',
				tagline:
					'The whole voice stack for .NET — microphone capture, speech-to-text, text-to-speech and a full AI conversation loop, on the native OS engines or any cloud provider you plug in.',
				highlights: [
					'STT & TTS on iOS, Android, Windows & browser',
					'Azure AI Speech, ElevenLabs, Typecast & OpenAI',
					'Offline Whisper on Linux and Raspberry Pi',
					'Portable emotion & tone across engines',
					'Capture, playback, VU meters & WAV recording',
					'Live mic effects, monitoring & route selection',
					'Echo cancellation and noise suppression',
					'Wake word, push-to-talk and text chat',
					'Structured turns with searchable history',
				],
				tags: ['AI', 'MAUI', 'Blazor', 'ASP.NET', 'Hardware'],
			},
		],
	},
	{
		id: 'libraries',
		title: 'Libraries & integrations',
		blurb:
			'Focused packages that solve one problem properly — usually a platform API that should have been cross-platform in the first place.',
		layout: 'compact',
		projects: [
			{
				name: 'MAUI Shell Extensions',
				repo: 'shinyorg/mauishell',
				hero: 'shiny-maui-shell-hero.svg',
				docs: 'https://shinylib.net/mauishell/',
				tagline:
					'Prism-inspired navigation for .NET MAUI Shell — ViewModel-based routing, dialogs, and source generation that deletes the route boilerplate.',
				highlights: [
					'INavigator & XAML Navigate.* properties',
					'Injectable IDialogs service',
					'Full ViewModel lifecycle wiring',
					'Cross-platform tab badges',
					'Strongly-typed generated routes',
				],
				tags: ['MAUI', 'UI'],
			},
			{
				name: 'App Extensions',
				repo: 'shinyorg/extensions',
				hero: 'projects/extensions-hero.svg',
				docs: 'https://shinylib.net/extensions/di/',
				tagline:
					'Source generators and utilities that cut boilerplate and keep your app reflection-free.',
				highlights: [
					'Attribute-driven DI registration',
					'Preferences & secure storage',
					'Reflector: AOT-safe property access',
					'Source-generated JSON serialization',
				],
				tags: ['Tooling', 'AOT', 'MAUI', 'Blazor'],
			},
			{
				name: 'Face Intelligence',
				repo: 'shinyorg/recogintelligence',
				hero: 'projects/faceintelligence-hero.svg',
				docs: 'https://shinylib.net/faceintelligence/',
				tagline:
					'On-device face enrollment and recognition for .NET — ArcFace embeddings, vector search, and live MAUI camera controls.',
				highlights: [
					'ArcFace ONNX embeddings, entirely on-device',
					'sqlite-vec nearest-neighbour matching',
					'Enrollment & recognition camera views',
					'No cloud API, no per-face billing',
				],
				tags: ['AI', 'MAUI', 'Data'],
			},
			{
				name: 'Voice Intelligence',
				repo: 'shinyorg/recogintelligence',
				hero: 'projects/voiceintelligence-hero.svg',
				docs: 'https://shinylib.net/voiceintelligence/',
				tagline:
					'Speaker recognition on-device — ECAPA voiceprints, vector search, and a guided enrollment wizard.',
				highlights: [
					'ECAPA voiceprints from any PCM buffer',
					'Text-independent speaker matching',
					'Guided enrollment sessions',
					'SQLite or DocumentDb vector stores',
				],
				tags: ['AI', 'MAUI', 'Data'],
			},
			{
				name: 'Document Intelligence',
				repo: 'shinyorg/recogintelligence',
				hero: 'projects/documentintelligence-hero.svg',
				docs: 'https://shinylib.net/documentintelligence/',
				tagline:
					'Native document scanning plus on-device extraction of receipts, invoices, licenses, passports and payment cards.',
				highlights: [
					'VisionKit & ML Kit document cameras',
					'Typed receipt and invoice extraction',
					'AAMVA licenses, MRZ passports & cards',
					'On-device OCR and barcode reading',
				],
				tags: ['AI', 'MAUI'],
			},
			{
				name: 'Health',
				repo: 'shinyorg/health',
				hero: 'shiny-health-v2-hero.svg',
				docs: 'https://shinylib.net/health/',
				tagline:
					'Apple HealthKit and Android Health Connect behind one cross-platform .NET API.',
				highlights: ['Steps, heart rate & calories', 'Sleep and blood pressure', 'Unified permission model'],
				tags: ['MAUI', 'Hardware'],
			},
			{
				name: 'Music',
				repo: 'shinyorg/music',
				hero: 'shiny-music-hero.svg',
				docs: 'https://shinylib.net/music/',
				tagline:
					'One .NET API for the device music library on iOS and Android — browse it, query it, play it, export it.',
				highlights: ['Artists, albums & tracks', 'Metadata querying', 'Playback control & file export'],
				tags: ['MAUI', 'Hardware'],
			},
			{
				name: 'OBD',
				repo: 'shinyorg/obd',
				hero: 'projects/obd-hero.svg',
				docs: 'https://shinylib.net/obd/',
				tagline:
					'Vehicle diagnostics over OBD-II adapters, with a command-object pattern and pluggable transports.',
				highlights: ['Adapter auto-detection', 'Bluetooth LE transport', 'Command-object pattern'],
				tags: ['Hardware', 'MAUI'],
			},
			{
				name: 'MAUI Platforms',
				repo: 'shinyorg/mauiplatforms',
				hero: 'maui-appletv-macos-hero.svg',
				tagline:
					'Community .NET MAUI backends for the platforms MAUI does not officially cover.',
				highlights: ['Apple TV (tvOS)', 'macOS via AppKit'],
				tags: ['MAUI', 'UI'],
			},
			{
				name: 'Shiny Aspire',
				repo: 'shinyorg/aspire',
				hero: 'documentdb-aspire-hero.svg',
				tagline:
					'Zero-friction .NET Aspire integrations that provision the infrastructure you would otherwise hand-roll.',
				highlights: [
					'Orleans ADO.NET schemas, auto-provisioned',
					'PostgreSQL, SQL Server & MySQL',
					'Gluetun VPN container routing',
				],
				tags: ['ASP.NET', 'Data', 'Tooling'],
			},
		],
	},
	{
		id: 'tooling',
		title: 'Developer tooling',
		blurb: 'Build-time helpers that take a repetitive job off your desk entirely.',
		layout: 'compact',
		projects: [
			{
				name: 'Localization Generator',
				repo: 'shinyorg/localizegen',
				hero: 'projects/localizegen-hero.svg',
				tagline:
					'Turns your .resx files into compile-time safe wrappers around IStringLocalizer.',
				highlights: ['Strongly typed keys', 'No runtime reflection'],
				tags: ['Tooling', 'AOT'],
			},
			{
				name: 'MSBuild Permissions',
				repo: 'shinyorg/msbuildpermissions',
				hero: 'projects/msbuildpermissions-hero.svg',
				tagline:
					'Declare .NET MAUI permissions once in your csproj — MSBuild writes the Android manifest and iOS Info.plist entries for you.',
				highlights: ['One declaration per permission', 'Generated at build time'],
				tags: ['Tooling', 'MAUI'],
			},
			{
				name: 'App Templates',
				repo: 'shinyorg/templates',
				hero: 'projects/templates-hero.svg',
				tagline:
					'dotnet CLI and Visual Studio templates for scaffolding Shiny-powered mobile and server apps.',
				highlights: ['dotnet new templates', 'Visual Studio integration'],
				tags: ['Tooling', 'MAUI'],
			},
		],
	},
	{
		id: 'samples',
		title: 'Sample apps',
		blurb:
			'Real apps, built in the open, that show the libraries doing actual work — usually because I wanted the app myself.',
		layout: 'compact',
		projects: [
			{
				name: "Canada's Wonderland Ride Times",
				repo: 'shinyorg/wonderland',
				hero: 'projects/wonderland-hero.svg',
				tagline:
					"Live ride wait times for Canada's Wonderland — Shiny Mediator paired with background jobs for real-time data.",
				tags: ['MAUI'],
			},
			{
				name: 'Where Are You',
				repo: 'GoneDotNet/whereareyou',
				hero: 'projects/whereareyou-hero.svg',
				tagline:
					'Background GPS tracking done right — continuous position updates streamed to a .NET Orleans backend.',
				tags: ['MAUI', 'Hardware', 'ASP.NET'],
			},
			{
				name: 'GitHub Mon',
				repo: 'aritchie/githubmon',
				hero: 'projects/githubmon-hero.svg',
				tagline:
					'A cross-platform desktop dashboard for your GitHub repos — live stars, forks, issues and PRs in the system tray.',
				tags: ['MAUI', 'Blazor', 'UI'],
			},
			{
				name: 'Bluetooth Digital Scoreboard',
				repo: 'aritchie/digitalscoreboard',
				hero: 'projects/digitalscoreboard-hero.svg',
				tagline:
					'A BLE client and peripheral hosting sample that syncs scores between devices in real time.',
				tags: ['MAUI', 'Hardware'],
			},
			{
				name: 'KML Recorder',
				repo: 'shinyorg/kmlrecorder',
				hero: 'maui-carplay-hero.svg',
				tagline:
					'Record GPS tracks and export them as KML or GeoJSON, with CarPlay and Android Auto dashboards.',
				tags: ['MAUI', 'Hardware'],
			},
			{
				name: 'Plex Suggest',
				repo: 'aritchie/plexsuggest',
				hero: 'projects/plexsuggest-hero.svg',
				tagline:
					'A recommendation engine for Plex libraries that scores unwatched content against your history. MAUI app and CLI.',
				tags: ['MAUI', 'Data'],
			},
			{
				name: 'Beat The Bank',
				repo: 'aritchie/beatthebank',
				hero: 'projects/beatthebank-hero.svg',
				tagline:
					'A voice-powered trivia game built on speech-to-text, text-to-speech and Shiny Mediator.',
				tags: ['MAUI', 'AI'],
			},
			{
				name: 'TUNE Games',
				repo: 'aritchie/tunegames',
				hero: 'projects/tunegames-hero.svg',
				tagline:
					'A music guessing game that plays clips from your own library and challenges you to name the tune.',
				tags: ['MAUI'],
			},
			{
				name: 'Heads Up Clone',
				repo: 'gonedotnet/headsup',
				hero: 'projects/headsup-hero.svg',
				tagline:
					'The party game rebuilt in .NET MAUI, with accelerometer-driven gestures and category card decks.',
				tags: ['MAUI', 'Hardware'],
			},
			{
				name: 'Mediator Sample',
				repo: 'shinyorg/mediatorsample',
				hero: 'projects/mediatorsample-hero.svg',
				tagline:
					'End-to-end Shiny Mediator sample — request/response handlers, event publishing and middleware pipelines.',
				tags: ['MAUI', 'Blazor'],
			},
		],
	},
];

export const githubUrl = (repo: string) => `https://github.com/${repo}`;

export const TOTAL_PROJECTS = GROUPS.reduce((n, g) => n + g.projects.length, 0);
