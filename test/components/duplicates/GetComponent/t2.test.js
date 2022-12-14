import { mount } from "@vue/test-utils";
import flushPromises from 'flush-promises'
import GetComponent from "@components/GetComponent.vue"
import override from "@test/fixtures/get_override.json"
import { initialize } from "@test/utils"

/* This test suite merely exists to show that we can
  * have multiple worker pools running at the same time
  * and their mocked modules will not collide due to our use
  * of the VITEST_POOL_ID variable */

beforeAll(() => {
  vi.mock('axios')
})

describe("GetComponent.vue with Axios", () => {
  test("Should render based on unchanged mock file (see __mocks__/axios.js)", async () => {
    const wrapper = mount(GetComponent);
    await flushPromises()
    const msg = wrapper.find(".my-message")
    expect(msg.text()).toBe("Message from the server")
  });

  test("Should render with all GET routes overridden with a new object", async () => {
    const axios = await import('@mocks/axios')
    const response = { data: { message: "Message from the Javascript object"} }
    axios.default.get = vi.fn().mockResolvedValue(response)

    const wrapper = mount(GetComponent);
    await flushPromises()
    const msg = wrapper.find(".my-message")
    expect(msg.text()).toBe("Message from the Javascript object")
  });

  test("Should render with all GET routes overridden with a JSON file", async () => {
    const axios = await import('@mocks/axios')
    axios.default.get = vi.fn().mockResolvedValue({ data: override })

    const wrapper = mount(GetComponent);
    await flushPromises()
    const msg = wrapper.find(".my-message")
    expect(msg.text()).toBe("Message from the JSON override")
  });

  describe("With routing logic", () => {
    test("Should render with routing logic per request", async () => {
      const response = { data: { message: "Message from the Javascript object"} }
      const handlerOverride = (route) => {
        if(route === "/api/msg") {
          return response
        }
      }

      const axios = await import('@mocks/axios')
      axios.default.get = vi.fn(handlerOverride)

      const wrapper = mount(GetComponent);
      await flushPromises()
      const msg = wrapper.find(".my-message")
      expect(msg.text()).toBe("Message from the Javascript object")
    });

    test("Should use JSON file override for all GET requests", async () => {
      const axios = await import('@mocks/axios')
      const handlerOverride = (route) => {
        if(route === "/api/msg") {
          return { data: override }
        } 
      }
      axios.default.get = vi.fn(handlerOverride)

      const wrapper = mount(GetComponent);
      await flushPromises()
      const msg = wrapper.find(".my-message")
      expect(msg.text()).toBe("Message from the JSON override")
    })

    test("Should use JSON file override per endpoint", async () => {
      const axios = await import('@mocks/axios')
      const handlerOverride = (route) => {
        if(route === "/api/msg") {
          return { data: override }
        } 
      }
      axios.default.get = vi.fn(handlerOverride)

      const wrapper = mount(GetComponent);
      await flushPromises()
      const msg = wrapper.find(".my-message")
      expect(msg.text()).toBe("Message from the JSON override")
    })

    test("Abstraction of mock", async () => {
      await initialize()
      const wrapper = mount(GetComponent);
      await flushPromises()
      const msg = wrapper.find(".my-message")
      expect(msg.text()).toBe("Message from the server")
    })

    test("Abstraction of mock, with override", async () => {
      await initialize({ 'GET /api/msg': override })
      const wrapper = mount(GetComponent);
      await flushPromises()
      const msg = wrapper.find(".my-message")
      expect(msg.text()).toBe("Message from the JSON override")
   })
  })
});
