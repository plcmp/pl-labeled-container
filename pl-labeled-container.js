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
            align-items: flex-start;
            outline: none;
            min-height: var(--pl-base-size);
            width: var(--pl-content-width);
            row-gap: var(--pl-space-xs);
            max-width: 100%;
            flex-shrink: 0;
        }

        :host([orientation=horizontal]) {
            flex-direction: row;
            width: calc(var(--pl-label-width) + var(--pl-content-width));
            align-items: center;
        }

        label {
            display: flex;
            user-select: none;
            font: var(--pl-header-font);
            color: var(--pl-header-color);
        }

        label[hidden]{
            display: none;
        }

        label span {
            width: 100%;
            overflow: hidden;
        }

        :host([orientation=horizontal]) label{
            width: var(--pl-label-width, 240px);
            min-height: var(--pl-base-size);
            flex-shrink: 0;
            align-self: flex-start;
            text-align: start;
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
    `;

    static template = html`
        <label part="label" title$="[[label]]" hidden="[[!label]]">
            <slot name="label-prefix"></slot>
            <span>[[label]]</span>
            <slot name="label-suffix"></slot>
        </label>
        <slot></slot>
    `;

    connectedCallback() {
        super.connectedCallback()

        if (!this.label) {
            this.style.setProperty('--pl-label-width', '0px');
        }

        if (this.contentWidth) {
            this.style.setProperty('--pl-content-width', this.contentWidth + 'px');
        }

        if (this.labelWidth) {
            this.style.setProperty('--pl-label-width', this.labelWidth + 'px');
        }
    }

    _contentWidthObserver() {
        if (this.contentWidth) {
            this.style.setProperty('--pl-content-width', this.contentWidth + 'px');
        }
    }

    _labelWidthObserver() {
        if (this.labelWidth) {
            this.style.setProperty('--pl-label-width', this.labelWidth + 'px');
        }
    }
}

customElements.define('pl-labeled-container', PlLabeledContainer);