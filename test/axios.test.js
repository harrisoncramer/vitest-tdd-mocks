import axios from 'axios'

vi.mock('axios')

describe("Testing axios itself", () => {
  it('Should mock axios', async () => {
    const res = await axios.get('/api/msg')
    expect(axios.get).toHaveBeenCalledWith('/api/msg')
    expect(res).toStrictEqual({ data: { message: "Hello World" }})
  })

  it('Should get actual axios', async () => {
    const realAxios = await vi.importActual('axios')
    expect(vi.isMockFunction(realAxios.get)).toBe(false)
  })
})
