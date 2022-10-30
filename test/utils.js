import override from "./fixtures/another_file.json"

const mockMap = {
  '/api/msg': override
}

export const initialize = async (addOnMocks = {}) => {

  const axios = await import('../__mocks__/axios')

  for (const [route, response] of Object.entries(addOnMocks)) {
    mockMap[route] = response
  }

  const getHandler = (route) => mockMap[route]

  axios.default.get = vi.fn(getHandler)
}
