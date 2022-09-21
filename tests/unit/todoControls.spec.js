import { mount, createLocalVue } from "@vue/test-utils";
import { VBtnToggle, VBtn } from "vuetify";
import TodoControls from "@/components/TodoControls";
import VueRouter from "vue-router";

let localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe("TodoField.vue", () => {
  let vuetify;
  let wrapper;
  beforeEach(() => {
    vuetify = {
      VBtnToggle,
      VBtn,
    };
    wrapper = mount(TodoControls, {
      localVue,
      router,
      vuetify,
      attachTo: document.body,
      propsData: {
        filter: "all",
        filters: {
          all: () => {},
          active: () => {},
          completed: () => {},
        },
        remaining: 3,
      },
    });
  });

  test("TodoControls shows '3 items left'", () => {
    expect(wrapper.html()).toMatch(/3 items left/i);
  });

  test("TodoControls shows 3 options to filter todos", () => {
    const filters = wrapper.findAll("a");
    expect(filters.length).toBe(3);
  });

  test("TodoControls sets an 'activeBtn' based on a prop filter 'all'", () => {
    const activeBbtn = wrapper.find("a[class*='v-btn--active']");
    expect(activeBbtn.html()).toMatch(/all/i);
  });
});
