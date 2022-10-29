import axios from 'axios'

vi.mock('axios')

describe("Testing axios itself", () => {
  test('mocked axios', async () => {
    const res = await axios.get('/api/msg')
    expect(axios.get).toHaveBeenCalledWith('/api/msg')
    expect(res).toStrictEqual({ data: { message: "Hello World" }})
  })

  test('can get actual axios', async () => {
    const ax = await vi.importActual('axios')
    expect(vi.isMockFunction(ax.get)).toBe(false)
  })
})
