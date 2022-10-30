import { vi } from 'vitest'
import normal from "../test/fixtures/normal.json"

const mockAxios = {}
mockAxios.mockRequests = {
  "/api/msg": normal
}

mockAxios.getMockResponse = function (config) {
  const { url } = config

  const response = this.mockRequests[url]

  const res = {
    status: 200,
    statusText: 'OK',
    data: response
  }

  return res
}

mockAxios.setMockRequests = function (requests) {
  for (const [route, response] of Object.entries(requests)) {
    const [method, url] = route.split(" ")
    if(method) this.mockRequests[url] = response.data
    else {
      // Handle other endpoints in future tests
    }
  }
}

function getRoute (url = '', params = {}) {
  return mockAxios.getMockResponse({ url, params, method: 'get'})
}

mockAxios.get = vi.fn(getRoute)

export default mockAxios
