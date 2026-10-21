# Claude Code connection plugin

The repository includes a small Claude Code plugin that connects to the existing hosted Mubboo Flights Search MCP endpoint. It helps prepare flight comparisons with airport lookup, validated trip inputs and ready-to-open search links.

## Install from the public repository

Install the connection plugin in Claude Code:

```text
/plugin install mubboo-flights --marketplace Mubboo-Ai/mubboo-flights-mcp
```

Alternatively, register the repository and install from a shell:

```sh
claude plugin marketplace add Mubboo-Ai/mubboo-flights-mcp
claude plugin install mubboo-flights@mubboo-flights-plugins
```

The marketplace contains only this connection plugin.

## Use from a local checkout

Clone this public repository, then start Claude Code with the checkout as the plugin directory:

```sh
git clone https://github.com/Mubboo-Ai/mubboo-flights-mcp.git
claude --plugin-dir ./mubboo-flights-mcp
```

Review the remote connection when the client prompts. In Claude Code, use `/mcp` to inspect the connection and available tools. The plugin manifest declares one HTTP connection at `https://mubboo.flights/api/mcp`; no account or API key is required by Mubboo. Claude Code itself has its own access requirements.

The available tools remain `find_airports`, `prepare_flight_search` and `get_service_info`. The service does not return live fares or inventory, make bookings or take payments. Hotels, cars, tours and tickets are website products rather than additional MCP tools.

The plugin contains no local server command, hooks, agent instructions, custom permission rules or credentials. Enabling it connects to Mubboo; send only the trip parameters needed for a search, never personal identity or payment data. The MIT license covers this connection configuration and the original public repository files, not the private hosted backend.

## Validate the configuration

```sh
claude plugin validate --strict ./mubboo-flights-mcp
```

The official manifest validator checks both the plugin metadata and the declared remote MCP connection. This configuration does not itself imply acceptance in Anthropic’s directory or a third-party plugin index.

References: [official plugin manifest reference](https://code.claude.com/docs/en/plugins-reference), [plugin-provided MCP connections](https://code.claude.com/docs/en/mcp#plugin-provided-mcp-servers).
