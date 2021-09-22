declare module '*.vue' {
  import { DefineComponent } from 'vue';
  type Obj = Record<string, unknown>;
  const component: DefineComponent<Obj, Obj, unknown>;
  export default component;
}
