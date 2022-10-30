import { mount } from "@vue/test-utils";
import flushPromises from 'flush-promises'
import PostComponent from "@components/PostComponent.vue"
import override from "@test/fixtures/post_override.json"
import { initialize } from "@test/utils"

/* This test suite merely exists to show that we can
  * have multiple worker pools running at the same time
  * and their mocked modules will not collide due to our use
  * of the VITEST_POOL_ID variable */

beforeAll(() => {
  vi.mock('axios')
})

describe("PostComponent.vue with Axios", () => {
  test("Should render based on unchanged mock file (see __mocks__/axios.js)", async () => {
    const wrapper = mount(PostComponent);
    await flushPromises()
    const button = wrapper.find(".my-button")
    const count = wrapper.find(".my-count")
    expect(button.text()).toBe("Click Me")
    expect(count.text()).toBe("1")
  });

  test("Should increment the count", async () => {
    const wrapper = mount(PostComponent);
    await flushPromises()
    const button = wrapper.find(".my-button")
    const count = wrapper.find(".my-count")
    expect(button.text()).toBe("Click Me")
    expect(count.text()).toBe("1")

    await button.trigger('click')

    expect(count.text()).toBe("2")
  });

  test("Abstraction of mock, with override", async () => {
    await initialize({ 
      'POST /api/count': override, 
      'GET /api/count': override 
    })
    const wrapper = mount(PostComponent);
    await flushPromises()
    const button = wrapper.find(".my-button")
    const count = wrapper.find(".my-count")
    expect(button.text()).toBe("Click Me")
    expect(count.text()).toBe("6")

    await button.trigger('click')

    expect(count.text()).toBe("7")

 })
})

