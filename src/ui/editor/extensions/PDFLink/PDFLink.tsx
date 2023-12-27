import { Node } from '@tiptap/core';
const documentIconSvg = `
    <svg style="width:24px; height:24px; vertical-align:middle; margin-right:8px;" viewBox="0 0 24 24">
        <path fill="currentColor" d="M14,2H6C4.9,2 4,2.9 4,4V20C4,21.1 4.9,22 6,22H18C19.1,22 20,21.1 20,20V8L14,2M13,9V3.5L18.5,9H13Z" />
    </svg>
`;
export const PDFLink = Node.create({
    name: 'pdflink',

    addOptions() {
        return {
            HTMLAttributes: {},
        }
    },

    content: 'text*',
    inline: true,
    group: 'inline',

    addAttributes() {
        return {
            href: {
                default: null,
            },
            text: {
                default: 'Download PDF',
            },
        };
    },

    parseHTML() {
        // @ts-ignore
        // @ts-ignore
        // @ts-ignore
        return [
            {
                tag: 'a[data-type="pdf-download"]',
                getAttrs: dom => ({
                    // @ts-ignore
                    href: dom.getAttribute('href'),
                    // @ts-ignore
                    text: dom.textContent,
                }),
            },
        ];
    },

    renderHTML({ node }) {
        return [
            'a',
            {
                href: node.attrs.href,
                'data-pdf-link': '',
                download: '',
                target: '_blank',
                rel: 'noopener noreferrer',
                style: `
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 6px 16px;
                margin: 5px 0;
                font-size: 14px;
                cursor: pointer;
                border: 1px solid transparent; /* Spacing between the ring and the button */
                background-color: #1976D2; /* Material UI primary blue */
                color: white;
                text-align: center;
                text-decoration: none;
                border-radius: 4px;
                position: relative;
                box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 
                            0px 2px 2px 0px rgba(0,0,0,0.14), 
                            0px 1px 5px 0px rgba(0,0,0,0.12),
                            0 0 0 4px #f5f5f5; /* Outer ring */
                transition: background-color 0.3s, box-shadow 0.3s;

                &:hover {
                    background-color: #1565C0; /* Slightly darker blue on hover */
                    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 
                                0px 4px 5px 0px rgba(0,0,0,0.14), 
                                0px 1px 10px 0px rgba(0,0,0,0.12),
                                0 0 0 4px #e0e0e0; /* Slightly darker ring on hover */
                }
            `,
            },
            ['span', { style: 'margin-right: 8px;' }, '📄'], // Document emoji
            node.attrs.text,
        ];
    },

    // @ts-ignore
    addCommands() {
        return {
            setPdfDownloadLink: attributes => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: attributes,
                });
            },
        };
    },
});

