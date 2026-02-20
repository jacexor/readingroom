import { property as s, state as d, customElement as y, ifDefined as v, html as _ } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as f } from "@umbraco-cms/backoffice/lit-element";
import { UmbChangeEvent as c } from "@umbraco-cms/backoffice/event";
import { UMB_VALIDATION_EMPTY_LOCALIZATION_KEY as g } from "@umbraco-cms/backoffice/validation";
var x = Object.defineProperty, E = Object.getOwnPropertyDescriptor, m = (t) => {
  throw TypeError(t);
}, n = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? E(e, r) : e, p = t.length - 1, u; p >= 0; p--)
    (u = t[p]) && (o = (i ? u(e, r, o) : u(o)) || o);
  return i && o && x(e, r, o), o;
}, L = (t, e, r) => e.has(t) || m("Cannot " + r), I = (t, e, r) => e.has(t) ? m("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), M = (t, e, r) => (L(t, e, "access private method"), r), h, l;
let a = class extends f {
  constructor() {
    super(...arguments), I(this, h), this.mandatoryMessage = g;
  }
  set config(t) {
    t && (this.maxLength = t.getValueByAlias("maxLength") ?? void 0);
  }
  /**
   * Renders the text input with all configured properties
   */
  render() {
    return _`<uui-input 
                        type="text"
                        .value=${this.value ?? ""}
                        maxlength=${v(this.maxLength)}
                        ?required=${this.mandatory}
                        .requiredMessage=${this.mandatoryMessage}
                        ?readonly=${this.readonly}
                        @input=${M(this, h, l)}></uui-input>`;
  }
};
h = /* @__PURE__ */ new WeakSet();
l = function(t) {
  const e = t.target.value;
  e !== this.value && (this.value = e, this.dispatchEvent(new c()));
};
n([
  s()
], a.prototype, "value", 2);
n([
  s({ type: Boolean })
], a.prototype, "mandatory", 2);
n([
  s({ type: String })
], a.prototype, "mandatoryMessage", 2);
n([
  s({ type: Boolean })
], a.prototype, "readonly", 2);
n([
  d()
], a.prototype, "maxLength", 2);
n([
  s({ attribute: !1 })
], a.prototype, "config", 1);
a = n([
  y("umb-property-editor-ui-text-box")
], a);
export {
  a as default
};
//# sourceMappingURL=custom-propertyui.js.map
