import { vi } from 'vitest'
import hello from "../test/fixtures/hello.json"

const map = {
  "/api/msg": hello
}

function getRoute (url) {
  return map[url]
}

export default {
  get: vi.fn(getRoute),
}
