# Verification record

Checked on 21 October 2026 from the public repository examples:

- The hosted endpoint initialized successfully and identified itself as Mubboo Flights Search, version `0.1.1`.
- `tools/list` returned exactly `find_airports`, `prepare_flight_search` and `get_service_info`; public input schemas and read-only/non-destructive annotations were present. The timestamped snapshot is in [tools.json](../tools.json).
- The optional demo successfully looked up JFK, read service information and prepared a fictional JFK–LHR one-way search for 20 November 2026. It checked `price: null`, `availabilityChecked: false` and the canonical Mubboo search-link origin/path.
- The returned search link was not opened. No supplier query, booking or payment was performed by the examples.
- Local automated tests cover changed/missing tool inventories, safety metadata, pagination limits, endpoint/credential restrictions, response bounds and configuration formats.
- `npm install --ignore-scripts` reported no known vulnerabilities on this date. This is a point-in-time dependency check, not a security certification.

Commands:

```sh
npm ci --ignore-scripts
npm test
npm run check:live
npm run demo:live
```

The GitHub workflow runs offline fixture tests only. It does not query the live service on every pull request. Marketplace acceptance is not established by these checks. Documentation, example version and hosted-service version are separate.

## Gemini CLI extension verification

On 21 October 2026, Gemini CLI `0.65.0` from the official npm package validated the root manifest, installed the local extension into an isolated temporary Gemini configuration, and reported the remote MCP as **Connected** through `gemini mcp list`. `gemini extensions list` confirmed the extension name/version and its single MCP server. The eight existing offline tests also passed after this change.

This verifies extension loading and connection in that CLI version. No Gemini model conversation or paid model call was performed. It does not establish Google endorsement, gallery inclusion, or compatibility with every client. The normal user Gemini configuration was not modified.
