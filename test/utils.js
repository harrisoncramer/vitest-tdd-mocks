import override from "./fixtures/another_file.json"


export const initialize = async (addOnMocks = {}) => {

  const getMockMap = {}
  getMockMap[process.env.VITEST_POOL_ID] = {
    '/api/msg': override
  }

  const mockAxios = await import('../__mocks__/axios')

  for (const [route, response] of Object.entries(addOnMocks)) {
    getMockMap[route] = response
  }

  const getHandler = (route) => getMockMap[process.env.VITEST_POOL_ID][route]

  mockAxios.default.get = vi.fn(getHandler)
}
