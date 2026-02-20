import { LitElement as s, html as o, state as b, customElement as d } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as h } from "@umbraco-cms/backoffice/element-api";
import { UMB_AUTH_CONTEXT as m } from "@umbraco-cms/backoffice/auth";
var p = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, c = (e, l, u, t) => {
  for (var a = t > 1 ? void 0 : t ? _(l, u) : l, i = e.length - 1, r; i >= 0; i--)
    (r = e[i]) && (a = (t ? r(l, u, a) : r(a)) || a);
  return t && a && p(l, u, a), a;
};
let n = class extends h(s) {
  constructor() {
    super(...arguments), this._data = [];
  }
  async _fetchData() {
    const l = await (await this.getContext(m))?.getLatestToken(), u = await fetch("/umbraco/management/api/v1/articles", {
      headers: {
        Authorization: `Bearer ${l}`,
        "Content-Type": "application/json"
      }
    });
    if (u.ok) {
      var t = await u.json();
      this._data = t.items, console.log(t.items);
    } else
      console.error("Failed to fetch node data");
  }
  render() {
    return o`
			<uui-box>
            ${this._data.length > 0 ? o`<uui-table>
                <uui-table-head>
                    <uui-table-row>
                        <uui-table-header-cell>Id</uui-table-header-cell>
                        <uui-table-header-cell>Name</uui-table-header-cell>
                        <uui-table-header-cell>Email</uui-table-header-cell>
                    </uui-table-row>
                </uui-table-head>
                <uui-table-body>
                    ${this._data.map((e) => o`
                        <uui-table-row>
                            <uui-table-cell>${e.id}</uui-table-cell>
                            <uui-table-cell>${e.name}</uui-table-cell>
                            <uui-table-cell>${e.updateDate}</uui-table-cell>
                        </uui-table-row>
                    `)}
                </uui-table-body>
            </uui-table>
			` : o`
                <p>Click the button to load data.</p>
			<uui-button label="Click me" id="clickMe" look="secondary" @click="${this._fetchData}"></uui-button>
			</uui-box>`}`;
  }
};
c([
  b()
], n.prototype, "_data", 2);
n = c([
  d("custom-dashboard-element")
], n);
export {
  n as default
};
//# sourceMappingURL=custom-dashboard.js.map
