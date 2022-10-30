export const initialize = async () => {
  const axios = await import('../__mocks__/axios')
  const handlerOverride = (route) => {
    if(route === "/api/msg") {
      return override
    } 
  }
  axios.default.get = vi.fn(handlerOverride)
}
