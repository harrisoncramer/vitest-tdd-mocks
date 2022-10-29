import { mount } from "@vue/test-utils";
import flushPromises from 'flush-promises'
import TestComponent from "../../src/components/TestComponent.vue"
import { describe, it, expect } from "vitest";

vi.mock('axios')

describe("TestComponent.vue", () => {
  it("Should render the correct content", async () => {
    const wrapper = await mount(TestComponent);
    await flushPromises()
    const msg = await wrapper.find(".my-message")
    expect(msg.text()).toBe("Hello World")
  });
});

