import { mount } from "@vue/test-utils";
import probsearch from "@/components/utils/probsearch";
import Vue from "vue";
import ElementUI from "element-ui";

Vue.use(ElementUI);

describe("probsearch", () => {
  var msg = '快速搜索';
  const wrapper = mount(probsearch);

  it("renders the correct markup: " + msg, () => {
    expect(wrapper.html()).toContain(msg);
    expect(wrapper.text()).toMatch(msg);
  });

  it("has no button", () => {
    expect(wrapper.find("button").exists()).toBe(false);
  });

  // it('button should increment the count', () => {
  //   expect(wrapper.vm.count).toBe(0)
  //   const button = wrapper.find('button')
  //   button.trigger('click')
  //   expect(wrapper.vm.count).toBe(1)
  // })
});
