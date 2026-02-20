import { html, customElement, property, state, ifDefined } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbChangeEvent } from '@umbraco-cms/backoffice/event';
import { UMB_VALIDATION_EMPTY_LOCALIZATION_KEY } from '@umbraco-cms/backoffice/validation';
import type { 
    UmbPropertyEditorUiElement, 
    UmbPropertyEditorConfigCollection 
} from '@umbraco-cms/backoffice/property-editor';

/**
 * Property Editor UI for a text box with configurable max length
 */
@customElement('umb-property-editor-ui-text-box')
export default class UmbPropertyEditorUITextBoxElement 
    extends UmbLitElement 
    implements UmbPropertyEditorUiElement {
    
    /**
     * The current value of the property.
     * Automatically set by Umbraco and updated when the user types.
     */
    @property()
    value?: string;

    /**
     * Indicates if the property is required/mandatory.
     * Automatically set by Umbraco based on Document Type property settings.
     */
    @property({ type: Boolean })
    mandatory?: boolean;

    /**
     * Custom validation message when a mandatory field is empty.
     * Set in the Document Type property settings in the backoffice.
     * Defaults to a localized "This field is required" message.
     */
    @property({ type: String })
    mandatoryMessage = UMB_VALIDATION_EMPTY_LOCALIZATION_KEY;

    /**
     * Indicates if the Property Editor is in read-only mode.
     * Set automatically by Umbraco based on user permissions, content locks, etc.
     * When true, the value can be read and selected but not modified.
     */
    @property({ type: Boolean })
    readonly?: boolean;

    /**
     * Maximum allowed characters for the text input.
     * Configured via the Data Type settings.
     */
    @state()
    private maxLength?: number;

    /**
     * Configuration from the Data Type.
     * Automatically set by Umbraco when the Property Editor is initialized.
     * Extracts settings like maxLength for use in the UI.
     */
    @property({ attribute: false })
    public set config(config: UmbPropertyEditorConfigCollection | undefined) {
        if (!config) return;
        this.maxLength = config.getValueByAlias<number>("maxLength") ?? undefined;
    }

    /**
     * Handles input events from the text box.
     * Updates the value and notifies Umbraco of the change.
     */
    #onInput(e: InputEvent) {
        const newValue = (e.target as HTMLInputElement).value;
        if (newValue === this.value) return;
        
        // Update the value
        this.value = newValue;
        
        // Notify Umbraco that the value has changed
        this.dispatchEvent(new UmbChangeEvent());
    }

    /**
     * Renders the text input with all configured properties
     */
    override render() {
        return html`<uui-input 
                        type="text"
                        .value=${this.value ?? ''}
                        maxlength=${ifDefined(this.maxLength)}
                        ?required=${this.mandatory}
                        .requiredMessage=${this.mandatoryMessage}
                        ?readonly=${this.readonly}
                        @input=${this.#onInput}></uui-input>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'umb-property-editor-ui-text-box': UmbPropertyEditorUITextBoxElement;
    }
}