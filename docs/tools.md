# Tool reference

The dated, machine-readable input schemas are in [tools.json](../tools.json). The live endpoint is authoritative. Runtime validation also checks supported markets/currencies, actual calendar dates, known airport codes, route shape and passenger totals; a regular expression in JSON Schema is not the complete validation contract.

## find_airports

Inputs: `query` (2–80 characters), optional `language` (defaults to `en`). Example:

```json
{ "query": "JFK", "language": "en" }
```

Results come from Mubboo's local city index and OurAirports public-domain data. Several places can match; ask the traveller to choose. A code match is not a flight-availability check.

## prepare_flight_search

Required inputs: `market`, `language`, `currency`, `tripType`, `segments`, `adults`, `children`, `infants`, `childAges`, `cabin`.

- Ask for missing details; do not infer departure market from destination or language.
- Dates are local departure dates and must be valid and not in the past.
- Use uppercase three-letter airport/city codes returned by lookup.
- A round trip needs outbound and reversed inbound segments; one to six segments are accepted.
- Supply one age for each child. Infants are on lap; `comfort` means premium economy.

The result includes the validated inputs and a `searchUrl`, with `price: null` and `availabilityChecked: false`. Show the link for the traveller to open. Never turn the result into an invented fare or confirmed reservation. See [the runnable example](../examples/demo.mjs) for a complete request with a future date.

## get_service_info

Input: `{}`. Returns the service name/version, capabilities, website product links, limitations, privacy/terms/disclosure links and support contact.

No tool accepts credentials or traveller identities. Booking and payment occur with the selected provider. Required commercial information is included in the service output and [Affiliate Disclosure](https://mubboo.flights/affiliate-disclosure).
