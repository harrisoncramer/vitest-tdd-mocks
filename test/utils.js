export const initialize = async (addOnMocks = {}) => {
  const mockAxios = await import('../__mocks__/axios')
  mockAxios.default.clearMockRequests()
  mockAxios.default.setMockRequests(addOnMocks)
}
