import { PlElement, html, css } from "polylib";

class PlLabeledContainer extends PlElement {
    static properties = {
        label: { type: String },
        orientation: { type: String, reflectToAttribute: true, value: 'vertical' },
        contentWidth: { type: Number, observer: '_contentWidthObserver' },
        labelWidth: { type: Number, observer: '_labelWidthObserver' },
    };

    static css = css`
        :host {
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            direction: var(--direction);
            align-items: flex-start;
            outline: none;
            min-height: var(--base-size-md);
            flex-shrink: 0;
            width: auto;
            row-gap: var(--space-xs);
        }

        :host([orientation=horizontal]) {
            flex-direction: row;
            width: calc(var(--label-width) + var(--content-width));
        }

        label {
            display: flex;
            user-select: none;
            font: var(--header-font);
            color: var(--header-color);
            flex-shrink: 0;
        }

        label[hidden]{
            display: none;
        }

        label span {
            width: 100%;
            overflow: hidden;
        }

        :host([orientation=horizontal]) label{
            width: var(--label-width, 240px);
            min-height: var(--base-size-md);
        }

        :host([orientation=horizontal]) label span{ 
            align-self: center;
            display: -webkit-box;
            display: -moz-box;
            display: -ms-flexbox;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
        }

        :host([orientation=vertical]) label span{
            width: var(--content-width, 240px);
        }
    `;

    static template = html`
        <label title$="[[label]]" hidden="[[!label]]">
            <slot name="label-prefix"></slot>
            <span>[[label]]</span>
            <slot name="label-suffix"></slot>
        </label>
        <slot></slot>
    `;

    connectedCallback() {
        super.connectedCallback()

        if (!this.label) {
            this.style.setProperty('--label-width', '0px');
        }

        if (this.contentWidth) {
            this.style.setProperty('--content-width', this.contentWidth + 'px');
        }

        if (this.labelWidth) {
            this.style.setProperty('--label-width', this.labelWidth + 'px');
        }
    }

    _contentWidthObserver() {
        if (this.contentWidth) {
            this.style.setProperty('--content-width', this.contentWidth + 'px');
        }
    }

    _labelWidthObserver() {
        if (this.labelWidth) {
            this.style.setProperty('--label-width', this.labelWidth + 'px');
        }
    }
}

customElements.define('pl-labeled-container', PlLabeledContainer);