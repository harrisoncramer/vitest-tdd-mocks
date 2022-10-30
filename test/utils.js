export const initialize = async (addOnMocks = {}) => {

  const mockAxios = await import('../__mocks__/axios')

  for (const [route, response] of Object.entries(addOnMocks)) {
    mockAxios.default.mockRequests[route] = response
  }

  const getHandler = (route) => mockAxios.default.getMockResponse({ url: route })
  mockAxios.default.get = vi.fn(getHandler)
}
