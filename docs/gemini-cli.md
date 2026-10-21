# Gemini CLI connection

The root `gemini-extension.json` packages a connection to Mubboo's hosted flight-search tools. It makes airport lookup and preparation of comparison links available through Gemini CLI. The website provides the broader travel comparison and planning experience.

## Install and inspect

With Gemini CLI installed, run:

```sh
gemini extensions install https://github.com/Mubboo-Ai/mubboo-flights-mcp
gemini extensions list
gemini mcp list
```

Review Gemini CLI's installation prompt. No automatic-update or automatic tool-approval option is required. Restart an existing Gemini CLI conversation after installation. Use its normal tool confirmation controls.

The extension uses `httpUrl` for Streamable HTTP, a 15-second request timeout and an explicit allowlist of `find_airports`, `prepare_flight_search` and `get_service_info`. It contains no local server command, authentication headers, environment settings, hooks, prompts or policy overrides.

Ask for airport options first, then provide route, dates, passenger counts, cabin, market, language and currency to prepare a search link. Open the link yourself to compare current travel options. No live prices, availability, baggage rules, bookings or payments are returned through MCP.

To remove this integration:

```sh
gemini extensions uninstall mubboo-flights-mcp
```

## Publication scope

This is an official Mubboo integration manifest. It does not make the hosted production implementation open source. The repository's MIT license covers its original files only.

Gemini CLI's gallery discovers public repositories tagged `gemini-cli-extension` that contain a valid root manifest. Discovery is asynchronous and subject to validation; publication of this file does not by itself confirm gallery inclusion or Google endorsement.

References checked 21 October 2026:

- [Extension reference](https://geminicli.com/docs/extensions/reference/)
- [MCP configuration](https://geminicli.com/docs/reference/configuration/#mcpservers)
- [Gallery release requirements](https://geminicli.com/docs/extensions/releasing/)
