import { PlElement, html, css } from "polylib";

class PlLabeledContainer extends PlElement {
    static get properties() {
        return {
            disabled: { type: Boolean, reflectToAttribute: true },
            label: { type: String },
            variant: { type: String, reflectToAttribute: true, value: 'vertical' }
        };
    }

    static get css() {
        return css`
			:host {
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
				direction: var(--direction);
				align-items: flex-start;
				outline: none;
                min-height: var(--base-size-md);
                flex-shrink: 0;
			}

            label {
                box-sizing: border-box;
                display: flex;
                user-select: none;
                font: var(--header-font);
                color: var(--header-color);
                flex-shrink: 0;
            }

            label[hidden] {
                display: none;
            }

            label span {
                width: 100%;
            }

			:host([variant=horizontal]) {
                flex-direction: row;
            }

            :host([variant=horizontal]) > ::slotted(*) {
                min-height: var(--base-size-md);
                display: flex;
                justify-content: center;
                align-items: center;
            }

			:host([variant=horizontal]) label{
                width: var(--label-width, 240px);
                min-height: var(--base-size-md);
            }

            :host([variant=horizontal]) label span{ 
                align-self: center;
                display: -webkit-box;
                display: -moz-box;
                display: -ms-flexbox;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            :host([variant=vertical]) {
                gap: var(--space-xs);
            }

            :host([variant=vertical]) label span{
				width: var(--content-width, 240px);
                overflow: hidden;
            }

            :host([variant=vertical]) > ::slotted(*) {
                align-self: flex-start !important;
            }
    	`;
    }

    static get template() {
        return html`
            <label title$="[[label]]" hidden$="[[!label]]">
                <slot name="label-prefix"></slot>
                <span>[[label]]</span>
                <slot name="label-suffix"></slot>
            </label>
            <slot></slot>
		`;
    }
}

customElements.define('pl-labeled-container', PlLabeledContainer);