import { vi } from 'vitest'
import normal from "../test/fixtures/normal.json"

const map = {
  "/api/msg": normal
}

const getMockResponse = (config) => {
  const { url} = config

  const response = map[url]

  const res = {
    status: 200,
    statusText: 'OK',
    data: response
  }

  return res
}

function getRoute (url = '', params = {}) {
  return getMockResponse({ url, params, method: 'get'})
}

export default {
  get: vi.fn(getRoute),
}
