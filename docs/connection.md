# Connection examples

The hosted endpoint is `https://mubboo.flights/api/mcp`. Use a remote Streamable HTTP connection with no authentication. The official guide is <https://mubboo.flights/mcp>.

## VS Code

Merge this entry into `.vscode/mcp.json` for the workspace you intend to use:

```json
{
  "servers": {
    "mubboo-flights": {
      "type": "http",
      "url": "https://mubboo.flights/api/mcp"
    }
  }
}
```

Review your client's trust prompt and tool permissions. This repository does not change your client settings. [VS Code MCP documentation](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)

## Other compatible clients

Use the remote URL in the client's MCP connection interface. For clients that accept `mcpServers`, [README.md](../README.md) provides a portable configuration. Do not assume every client accepts identical JSON or provides remote servers on every plan.

## Troubleshooting

- A browser GET may return HTTP 405: the service accepts MCP JSON-RPC POST messages. Use the discovery example to check the connection.
- No API key is required. Do not send credentials to resolve a connection failure.
- HTTP 429 means rate limiting; wait before retrying instead of running a tight polling loop.
- Network, proxy or client problems do not establish that a directory has rejected the service.
- These client examples do not run a stdio server, OAuth bridge or self-hosted copy.

The SDK handles MCP initialization, transport and protocol negotiation. The example wrapper allows only the exact official endpoint, omits credentials, rejects redirects, caps each response at 1 MiB, uses 15-second request timeouts and limits tool pagination to five pages. Session identifiers remain in memory and are not printed. Errors deliberately omit raw response bodies.
