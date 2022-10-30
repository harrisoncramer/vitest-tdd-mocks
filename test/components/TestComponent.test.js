import { mount } from "@vue/test-utils";
import flushPromises from 'flush-promises'
import TestComponent from "../../src/components/TestComponent.vue"
import override from "../fixtures/another_file.json"

vi.mock('axios')

describe("TestComponent.vue with Axios", () => {

  it("Should render the normal content based on fixture", async () => {
    const wrapper = mount(TestComponent);
    await flushPromises()
    const msg = wrapper.find(".my-message")
    expect(msg.text()).toBe("Hello World")
  });

  it("Should render the correct content with object override", async () => {
    const axios = await import('../../__mocks__/axios')
    const response = { data: { message: "wow"} }
    axios.default.get = vi.fn().mockResolvedValue(response)

    const wrapper = mount(TestComponent);
    await flushPromises()
    const msg = wrapper.find(".my-message")
    expect(msg.text()).toBe("wow")
  });

  it("Should render the correct content with JSON file override", async () => {
    const axios = await import('../../__mocks__/axios')
    axios.default.get = vi.fn().mockResolvedValue(override)

    const wrapper = mount(TestComponent);
    await flushPromises()
    const msg = wrapper.find(".my-message")
    expect(msg.text()).toBe("Another message")
  });

  it("Should render the correct content with custom handler + object", async () => {
    const response = { data: { message: "wow"} }
    const handlerOverride = (route) => {
      if(route === "/api/msg") {
        return response
      }
    }

    const axios = await import('../../__mocks__/axios')
    axios.default.get = vi.fn(handlerOverride)

    const wrapper = mount(TestComponent);
    await flushPromises()
    const msg = wrapper.find(".my-message")
    expect(msg.text()).toBe("wow")
  });

  it("Should render the correct content with custom handler + JSON file", async () => {
    const axios = await import('../../__mocks__/axios')
    const handlerOverride = (route) => {
      if(route === "/api/msg") {
        return override
      } 
    }
    axios.default.get = vi.fn(handlerOverride)

    const wrapper = mount(TestComponent);
    await flushPromises()
    const msg = wrapper.find(".my-message")
    expect(msg.text()).toBe("Another message")
  })
});
