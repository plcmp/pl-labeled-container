import { PlElement, html, css } from "polylib";

class PlLabeledContainer extends PlElement {
    static get properties() {
        return {
            disabled: { type: Boolean, reflectToAttribute: true },
            label: { type: String },
            variant: { type: String, reflectToAttribute: true }
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
                min-height: 32px;
                flex-shrink: 0;
			}

			:host([variant=horizontal]) {
                flex-direction: row;
            }

			:host([variant=horizontal]) label{
                width: var(--label-width, 140px);
                align-self: self-start;
                min-height: 32px;
            }

            :host([variant=horizontal]) label span{ 
                align-self: center;
            }

            :host([variant=vertical]) label{
				width: var(--content-width, 140px);
            }
 
            :host([variant=vertical]) label span{
				width: var(--content-width, 140px);
                padding-bottom: 4px;
                text-align: initial;
            }

            label[hidden] {
                display: none;
            }

			label {
                box-sizing: border-box;
                display: inline-flex;
                pointer-events: none;
                user-select: none;
				font: var(--font-sm);
				color: var(--black-darkest);
                overflow:hidden;
                flex-shrink: 0;
            }

            label > span:empty {
                display: none;
            }

            label span {
                width: 100%;
                font-weight: 500;
            }

            :host([variant=horizontal]) ::slotted() {
                padding-top: 6px;
            }

            ::slotted() {
                width: auto;
                min-height: 32px;
                font-size: 13px;
                line-height: 16px;
				font: var(--font-md);
            }
    	`;
    }

    static get template() {
        return html`
            <label hidden$="[[!label]]">
                <slot name="label-prefix"></slot>
                <span>[[label]]</span>
                <slot name="label-suffix"></slot>
            </label>
            <slot></slot>
		`;
    }
}

customElements.define('pl-labeled-container', PlLabeledContainer);