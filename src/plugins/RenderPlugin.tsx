import type { BytemdPlugin } from "bytemd";
import { createRoot } from "react-dom/client";

export function RenderPlugin(): BytemdPlugin {
    return {
        viewerEffect({ markdownBody }) {
            const admonitionInfo = markdownBody.querySelector('.admonition-info');
            if (admonitionInfo) {
                const root = createRoot(admonitionInfo);
                root.render(<> Hello </>);
            }
        }
    }
}