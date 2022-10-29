import { mount } from "@vue/test-utils";
import flushPromises from 'flush-promises'
import TestComponent from "../../src/components/TestComponent.vue"

vi.mock('axios')

describe("TestComponent.vue", () => {
  it("Should render the correct content", async () => {
    const wrapper = mount(TestComponent);
    await flushPromises()
    const msg = wrapper.find(".my-message")
    expect(msg.text()).toBe("Hello World")
  });
});

