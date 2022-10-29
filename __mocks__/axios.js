import { vi } from 'vitest'

function getRoute (url) {
  switch(url) {
    case "/api/msg":
      return { data: { message: "Hello World" }}
    default:
      return {}
  }
}

export default {
  get: vi.fn(getRoute),
}
