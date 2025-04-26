import type { BytemdPlugin } from "bytemd";
import { createRoot } from "react-dom/client";
import BlockQuote from "@/components/BlockQuote";

export function RenderPlugin(): BytemdPlugin {
    return {
        viewerEffect({ markdownBody }) {
            const admonitionInfo = markdownBody.querySelectorAll('.admonition-info');
            const blockQuotes = markdownBody.querySelectorAll('.block-quote-cls');
            
            console.log('找到的blockQuotes元素数量:', blockQuotes?.length);
            
            admonitionInfo.forEach(admonitionInfo => {
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
            });
            
            // 处理所有block-quote元素
            blockQuotes.forEach(blockQuote => {
                const name = blockQuote.textContent;
                const url = blockQuote.getAttribute('class')?.split(' ')[2];                
                if (name && url) {
                    createRoot(blockQuote).render(
                        <BlockQuote 
                            anchorName={name} 
                            anchorLink={url} 
                        />
                    );
                }
            });
        }
    }
}