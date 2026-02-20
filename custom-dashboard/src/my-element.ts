import { LitElement, html, customElement, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';

@customElement('custom-dashboard-element')
export default class CustomDashboardElement extends UmbElementMixin(LitElement) {
 	@state()
    private _data: Array<any> = [];

	 private async _fetchData() {
		const authContext = await this.getContext(UMB_AUTH_CONTEXT);
		const token = await authContext?.getLatestToken();

		const response = await fetch('/umbraco/management/api/v1/articles', {
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			var result = await response.json();
			this._data = result["items"];
			console.log(result["items"]);
		} else {
			// Error handling
			console.error("Failed to fetch node data");
		}
	};

	render() {
		return html`
			<uui-box>
            ${this._data.length > 0 ? html`<uui-table>
                <uui-table-head>
                    <uui-table-row>
                        <uui-table-header-cell>Id</uui-table-header-cell>
                        <uui-table-header-cell>Name</uui-table-header-cell>
                        <uui-table-header-cell>Email</uui-table-header-cell>
                    </uui-table-row>
                </uui-table-head>
                <uui-table-body>
                    ${this._data.map(item => html`
                        <uui-table-row>
                            <uui-table-cell>${item["id"]}</uui-table-cell>
                            <uui-table-cell>${item["name"]}</uui-table-cell>
                            <uui-table-cell>${item["updateDate"]}</uui-table-cell>
                        </uui-table-row>
                    `)}
                </uui-table-body>
            </uui-table>
			` : html`
                <p>Click the button to load data.</p>
			<uui-button label="Click me" id="clickMe" look="secondary" @click="${this._fetchData}"></uui-button>
			</uui-box>`}`;
	}
}


declare global {
    interface HTMLElementTagNameMap {
        'custom-dashboard-element': CustomDashboardElement;
    }
}