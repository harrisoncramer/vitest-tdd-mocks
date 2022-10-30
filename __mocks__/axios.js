import { vi } from 'vitest'
import message from "@test/fixtures/default_message.json"
import count from "@test/fixtures/default_count.json"

/* The default responses to every endpoint. */
const mockAxios = {}
const processId = process.env.VITEST_POOL_ID

const mockRequests = { 
  [processId]: { 
    "GET /api/msg": message,
    "GET /api/count": count,
    "POST /api/count": { ...count, num: 2 },
  } 
}
mockAxios.mockRequests = mockRequests

/* Attaches or overrides default mocks on the module */
mockAxios.setMockRequests = function (requests) {
  for (const [route, response] of Object.entries(requests)) {
    this.mockRequests[process.env.VITEST_POOL_ID][route] = response
  }
}

/* Wrapper around a call that provides additional axios context */
mockAxios.getMockResponse = function (config) {
  const { url, method } = config

  const processId = process.env.VITEST_POOL_ID
  const response = this.mockRequests[processId][method.toUpperCase() + " " + url]

  const res = {
    status: 200,
    statusText: 'OK',
    data: response
  }

  return res
}

/* The actual handlers axios calls */
function getRoute (url = '', params = {}) {
  return mockAxios.getMockResponse({ url, params, method: 'get'})
}

function postRoute (url = '', params = {}) {
  return mockAxios.getMockResponse({ url, params, method: 'post'})
}

/* Attach the handlers to the axios mock, allow them to be spied */
mockAxios.get = vi.fn(getRoute)
mockAxios.post = vi.fn(postRoute)

/* Clears the mocks to their default values */
mockAxios.clearMockRequests = function () {
  const processId = process.env.VITEST_POOL_ID
  mockAxios[processId] = {
    mockRequests
  }
  mockAxios.get = vi.fn(getRoute)
  mockAxios.post = vi.fn(postRoute)
}

export default mockAxios
