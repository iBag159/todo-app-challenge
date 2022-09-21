import { mount, createLocalVue } from "@vue/test-utils";
import { VCard, VIcon, VCheckbox, VTextField } from "vuetify";
import TodoField from "@/components/TodoField";
import Vuex from "vuex";
import store from "@/store";

let localVue = createLocalVue();
localVue.use(Vuex);
describe("TodoField.vue", () => {
  let vuetify;
  let wrapper;
  beforeEach(() => {
    vuetify = {
      VCard,
      VCheckbox,
      VIcon,
      VTextField,
    };
    wrapper = mount(TodoField, {
      store,
      localVue,
      vuetify,
      attachTo: document.body,
    });
  });

  test("TodoField has been displayed correctly and it shows a placeholder", () => {
    expect(wrapper.html()).toMatch(/What needs to be done?/i);
  });

  test("TodoField can add a 'newTodo' when it has been entered a new 'A new todo' and it pressed 'enter' key", async () => {
    const newTodo = "A new Todo";
    const textInput = wrapper.find("input");
    await textInput.setValue(newTodo);
    expect(textInput.element.value).toBe(newTodo);

    await textInput.trigger("keydown.enter");
    expect(textInput.element.value).toBe("");
    expect(store.state.todos[0].text).toBe(newTodo);
  });
});
