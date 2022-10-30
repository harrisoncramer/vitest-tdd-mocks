import { vi } from 'vitest'
import normal from "../test/fixtures/normal.json"

/* The default responses to every endpoint */
const mockAxios = {}
mockAxios.mockRequests = {
  "GET /api/msg": normal
}

/* Attaches or overrides default mocks on the module */
mockAxios.setMockRequests = function (requests) {
  for (const [route, response] of Object.entries(requests)) {
    this.mockRequests[route] = response
  }
}

/* Wrapper around a call that provides additional axios context */
mockAxios.getMockResponse = function (config) {
  const { url, method } = config

  const response = this.mockRequests[method.toUpperCase() + " " + url]

  const res = {
    status: 200,
    statusText: 'OK',
    data: response
  }

  return res
}

/* The actual handler for an axios call */
function getRoute (url = '', params = {}) {
  return mockAxios.getMockResponse({ url, params, method: 'get'})
}

mockAxios.get = vi.fn(getRoute)

export default mockAxios
