// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://allanritchie.com',
	integrations: [mdx(), sitemap()],
	redirects: {
		// Feb 2026
		'/blog/shinymediator-gettingstarted/': '/blog/2026/02/shinymediator-gettingstarted/',
		'/blog/shinymediator-whats-new-v6/': '/blog/2026/02/shinymediator-whats-new-v6/',
		'/blog/shinymediator-comparison/': '/blog/2026/02/shinymediator-comparison/',
		'/blog/shinymediator-aot/': '/blog/2026/02/shinymediator-aot/',
		'/blog/opensource-in-age-of-ai/': '/blog/2026/02/opensource-in-age-of-ai/',
		'/blog/maui-appletv-macos/': '/blog/2026/02/maui-appletv-macos/',
		'/blog/maui-carplay/': '/blog/2026/02/maui-carplay/',
		'/blog/shiny-maui-tableview/': '/blog/2026/02/shiny-maui-tableview/',
		'/blog/shiny-sqlitedocumentdb/': '/blog/2026/02/shiny-sqlitedocumentdb/',
		// Mar 2026
		'/blog/shiny-music/': '/blog/2026/03/shiny-music/',
		'/blog/shiny-spatial/': '/blog/2026/03/shiny-spatial/',
		'/blog/shiny-sqlitedocumentdb-v2/': '/blog/2026/03/shiny-sqlitedocumentdb-v2/',
		'/blog/shiny-maui-shell/': '/blog/2026/03/shiny-maui-shell/',
		'/blog/shiny-contactstore/': '/blog/2026/03/shiny-contactstore/',
		'/blog/shiny-documentdb-v3/': '/blog/2026/03/shiny-documentdb-v3/',
		'/blog/shiny-client-v4/': '/blog/2026/03/shiny-client-v4/',
		'/blog/maui-ui-testing-mauidevflow/': '/blog/2026/03/maui-ui-testing-mauidevflow/',
	},
});
