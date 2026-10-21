# Facts for directory maintainers

Mubboo Flights is an all-in-one travel comparison and tickets platform that helps travellers compare flights, hotels, cars, tours and attraction tickets and find better value. The hosted MCP connection makes the flight-search preparation step easier from a compatible assistant.

| Field | Value |
| --- | --- |
| Listing name | Mubboo Flights Search |
| Product website | https://mubboo.flights/ |
| MCP guide | https://mubboo.flights/mcp |
| Hosted endpoint | https://mubboo.flights/api/mcp |
| Maintainer | Mubboo LLC |
| Support | support@mubboo.flights |
| Transport | Streamable HTTP |
| Authentication | None |
| Pricing | Public MCP tools are free |
| Official Registry identity | `flights.mubboo/flight-search` |
| Tool count | 3, verified 21 October 2026 |
| Suggested categories | Travel & Hospitality; Travel & Transportation; Search |
| Public logo URL | https://mubboo.flights/mubboo-flights-favicon-512.png |
| Repository scope | Official integration documentation, runnable client examples, tests and public schema snapshot |
| Production implementation | Privately maintained; not included or licensed by this repository |

Suggested short description:

> Find airports, validate trip details and prepare Mubboo flight-search links with less manual setup. Free hosted MCP, no account or API key.

The three tools are `find_airports`, `prepare_flight_search` and `get_service_info`. They do not return live fares, inventory, schedules or baggage rules, and cannot book or take payment. Website verticals beyond flights are not exposed as additional MCP tools.

Use this repository where a directory accepts official hosted-service documentation or integration code. Do not describe it as an open-source implementation of the production server. A directory that requires self-hostable server source has a different eligibility condition. Published integration code does not establish client-directory approval, a security certification or universal compatibility.

The [server.json](../server.json) file describes the existing registered remote service. This repository does not create a second Registry identity or automatically publish Registry updates.
