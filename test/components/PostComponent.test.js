import { mount } from "@vue/test-utils";
import flushPromises from 'flush-promises'
import PostComponent from "@components/PostComponent.vue"
// import { initialize } from "@test/utils"

beforeAll(() => {
  vi.mock('axios')
})

describe("PostComponent.vue with Axios", () => {
  test("Should render based on unchanged mock file (see __mocks__/axios.js)", async () => {
    const wrapper = mount(PostComponent);
    await flushPromises()
    const msg = wrapper.find(".my-button")
    const count = wrapper.find(".my-count")
    expect(msg.text()).toBe("Click Me")
    expect(count.text()).toBe("1")
  });
})

