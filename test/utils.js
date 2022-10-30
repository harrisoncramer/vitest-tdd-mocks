export const initialize = async (addOnMocks = {}) => {

  const mockAxios = await import('../__mocks__/axios')

  mockAxios.default.setMockRequests(addOnMocks)

  const getHandler = (route) => mockAxios.default.getMockResponse({ url: route })
  mockAxios.default.get = vi.fn(getHandler)
}
