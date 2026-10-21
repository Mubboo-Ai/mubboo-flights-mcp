import assert from 'node:assert/strict';
import { listAllTools, REQUEST_OPTIONS, withPublicClient } from '../lib/connection.mjs';

// Fixed, fictional example. No passenger identities, credentials or supplier clicks.
try {
  const report = await withPublicClient(async client => {
    await listAllTools(client);
    const call = async (name, args) => {
      const result = await client.callTool({ name, arguments: args }, undefined, REQUEST_OPTIONS);
      assert.notEqual(result.isError, true);
      assert.ok(result.structuredContent);
      return result.structuredContent;
    };
    const airports = await call('find_airports', { query: 'JFK', language: 'en' });
    assert.ok(airports.suggestions.some(place => place.code === 'JFK'));
    const service = await call('get_service_info', {});
    assert.equal(service.name, 'Mubboo Flights Search');
    const date = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);
    const search = await call('prepare_flight_search', {
      market: 'us', language: 'en', currency: 'USD', tripType: 'oneway',
      segments: [{ origin: 'JFK', destination: 'LHR', date }],
      adults: 1, children: 0, infants: 0, childAges: [], cabin: 'economy',
    });
    assert.equal(search.price, null);
    assert.equal(search.availabilityChecked, false);
    const url = new URL(search.searchUrl);
    assert.equal(url.origin, 'https://mubboo.flights');
    assert.equal(url.pathname, '/api/go/kayak');
    return { checkedAt: new Date().toISOString(), airportLookup: 'passed', serviceInfo: 'passed',
      searchPreparation: 'passed', exampleRoute: 'JFK to LHR', date,
      searchLinkOpened: false, bookingCreated: false, paymentMade: false };
  });
  console.log(JSON.stringify(report, null, 2));
} catch {
  console.error('Example validation failed. Check the current tool schemas and https://mubboo.flights/mcp. No booking or payment is performed by this example.');
  process.exitCode = 1;
}
