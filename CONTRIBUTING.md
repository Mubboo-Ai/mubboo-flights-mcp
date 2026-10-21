# Contributing

Documentation corrections and small integration-example improvements are welcome. Keep tool names, input fields and capability claims aligned with the hosted service.

Run `npm ci --ignore-scripts` and `npm test` before opening a pull request. Live discovery is optional and sends requests to the public service; `npm run demo:live` additionally calls its three non-booking tools with fictional inputs.

Do not commit environment files, credentials, private production source, browser data or traveller records. Report security concerns privately as described in SECURITY.md. Do not add claims of approval or compatibility without evidence.
