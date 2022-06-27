import { PlElement, html, css } from "polylib";

class PlLabeledContainer extends PlElement {
    static get properties() {
        return {
            label: { type: String },
            variant: { type: String, reflectToAttribute: true },
            orientation: { type: String, reflectToAttribute: true }
        };
    }

    static get css() {
        return css`
			:host {
                display: inline-block;
                box-sizing: border-box;
				outline: none;
                min-height: var(--base-size-md);
                width: inherit;
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

            :host([variant=horizontal]), :host([orientation=horizontal]) {
                margin-left: calc(var(--has-padding) * var(--label-width, 240px));
            }

			:host([variant=horizontal]) label, :host([orientation=horizontal]) label{
                width: var(--label-width, 240px);
                min-height: var(--base-size-md);
                margin-left: calc(0px - var(--label-width, 240px));
                position: absolute;
            }

            :host([variant=horizontal]) label span{ 
                align-self: center;
                display: -webkit-box;
                display: -moz-box;
≈                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            :host([variant=vertical]) label{
                padding-bottom: var(--space-xs);
            }
            :host([variant=vertical]) label span{
				width: var(--content-width, 240px);
                overflow: hidden;
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

    connectedCallback() {
        super.connectedCallback();

        if (!this.label) {
            this.style.setProperty('--has-padding', 0);
        }
    }
}

customElements.define('pl-labeled-container', PlLabeledContainer);