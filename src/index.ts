import { App } from "vue";
import VTree from "./components/tree.vue";

export { VTree };

export default {
  install(app: App<Element>, options: any) {
    app.component(VTree.name, VTree);
  },
};
