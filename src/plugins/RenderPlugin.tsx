import type { BytemdPlugin } from "bytemd";
import { createRoot } from "react-dom/client";

export function RenderPlugin(): BytemdPlugin {
    return {
        viewerEffect({ markdownBody }) {
            const admonitionInfo = markdownBody.querySelector('.admonition-info');
            if (admonitionInfo) {
                createRoot(admonitionInfo).render(<div className="flex-col border-l-4 border-[#52b1d2] p-4 bg-[#eef9fd] rounded-lg my-2">
                    <div className="flex items-center space-x-2">
                        <div className="text-label font-extrabold text-[#24434e]">
                            Info
                        </div>
                    </div>
                    <div>
                    {admonitionInfo.children[0].textContent}
                    </div>
                </div>);
            }
        }
    }
}