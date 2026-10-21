# Mubboo Flights Search MCP

**Easier travel comparison, from your AI conversation.**

[Mubboo Flights](https://mubboo.flights/) is an all-in-one travel comparison and tickets platform. Compare flights, hotels and car rentals, explore tours and attraction tickets, and plan with destination guides and travel research to find better value.

**We compare. You choose. You save.**

Connect the free hosted MCP service to a compatible assistant to find airports, check your trip inputs and prepare a flight-search link. Open that link when you are ready to compare current options.

[Official connection guide](https://mubboo.flights/mcp) · [中文](https://github.com/Mubboo-Ai/mubboo-flights-mcp/blob/main/README.zh-CN.md) · [Tool reference](https://github.com/Mubboo-Ai/mubboo-flights-mcp/blob/main/docs/tools.md) · [Directory facts](https://github.com/Mubboo-Ai/mubboo-flights-mcp/blob/main/docs/directory-listing.md)

## Connect

| Setting | Value |
| --- | --- |
| Name | Mubboo Flights Search |
| Remote URL | `https://mubboo.flights/api/mcp` |
| Transport | Streamable HTTP |
| Authentication | None; no account or API key |
| Cost of these public MCP tools | Free |
| Official MCP Registry name | `flights.mubboo/flight-search` |

In a client that supports remote Streamable HTTP servers, add the URL above. Do not enter a password, API key or traveller identity. Client access requirements vary; an available endpoint does not imply approval in every client marketplace.

For clients using `mcpServers` configuration:

```json
{
  "mcpServers": {
    "mubboo-flights": {
      "url": "https://mubboo.flights/api/mcp"
    }
  }
}
```

VS Code uses a `servers` object and `type: "http"`; see [connection examples](https://github.com/Mubboo-Ai/mubboo-flights-mcp/blob/main/docs/connection.md). Merge the entry with your existing configuration, keeping other servers intact.

### Gemini CLI extension

Gemini CLI users can install the connection configuration directly:

```sh
gemini extensions install https://github.com/Mubboo-Ai/mubboo-flights-mcp
```

Review the connection details when prompted. The [extension manifest](https://github.com/Mubboo-Ai/mubboo-flights-mcp/blob/main/gemini-extension.json) connects to the hosted endpoint and includes only the three documented tools. It requires no API key, installs no local MCP server and includes no hooks or custom permission rules. See [Gemini CLI setup and verification](https://github.com/Mubboo-Ai/mubboo-flights-mcp/blob/main/docs/gemini-cli.md).

## What you can do

| Tool | Traveller benefit |
| --- | --- |
| `find_airports` | Look up airports and city codes by name or IATA code. Choose the intended place when several match. |
| `prepare_flight_search` | Validate route, dates, passenger counts, cabin, market, language and currency, then prepare a ready-to-open search link. Supports one-way, round-trip and multi-city trips. |
| `get_service_info` | Read capabilities, product links, connection details and support information. |

Example requests for your assistant:

> Find airport and city codes for London. Explain the options before choosing one.

> Help me prepare a round-trip flight search from New York to Paris. Ask me for my dates, departure market, currency, cabin and traveller counts before creating the link.

> Prepare my flight search and show me the link. I will open it to compare current options and choose where to book.

The MCP service does not return flight prices, schedules, live availability, baggage allowances or fare rules. It does not book, pay, cancel, access accounts or save trips. Hotels, cars, tours and tickets are available on the website; they are not additional MCP search tools. Airport matches identify places and do not establish scheduled passenger service.

## Try the public examples

This is Mubboo LLC's official **public integration and examples repository**. It includes runnable client code, tests and public tool schemas. The hosted server's production implementation is privately maintained; this repository is not a self-hostable MCP server.

Requires Node.js 20 or newer. Clone this repository, then run:

```sh
npm ci --ignore-scripts
npm test
node examples/discover.mjs
```

Discovery initializes a public MCP connection and lists its tools. It does not execute tools. The examples use the official MCP TypeScript SDK, pinned in the lockfile.

```sh
# Include the public input schemas
node examples/discover.mjs --schemas

# Print configuration without changing any local files or making network requests
node examples/config.mjs portable
node examples/config.mjs vscode

# Optional: run three non-booking tool calls with a fictional JFK–LHR example
node examples/demo.mjs
```

The demo chooses a date 30 days ahead, checks the three tools, and validates the returned search link without opening it. It does not request supplier prices or create a booking. These programs are client examples, not local MCP servers; do not configure them as an assistant's stdio server.

The public endpoint and tool inventory were checked on **21 October 2026**. See [tools.json](https://github.com/Mubboo-Ai/mubboo-flights-mcp/blob/main/tools.json) and [verification notes](https://github.com/Mubboo-Ai/mubboo-flights-mcp/blob/main/docs/verification.md). This is a dated observation, not an uptime or marketplace-approval guarantee.

## Privacy and support

Send only the trip inputs required by the tools. Do not send names, passport details, email addresses, phone numbers, passwords or payment information. Requests pass through hosting infrastructure and may appear in operational logs. Opening a search link sends the trip inputs to the selected search provider; the provider confirms prices, conditions and booking availability.

[Privacy](https://mubboo.flights/privacy) · [Terms](https://mubboo.flights/terms) · [Affiliate Disclosure](https://mubboo.flights/affiliate-disclosure) · [support@mubboo.flights](mailto:support@mubboo.flights)

For documentation or example-code corrections, open an issue or pull request. Keep private traveller data and credentials out of public reports. See [SECURITY.md](https://github.com/Mubboo-Ai/mubboo-flights-mcp/blob/main/SECURITY.md).

The [MIT license](https://github.com/Mubboo-Ai/mubboo-flights-mcp/blob/main/LICENSE) covers the original files in this repository. It does not license the hosted service's private implementation or Mubboo trademarks. Dependencies retain their own licenses.
