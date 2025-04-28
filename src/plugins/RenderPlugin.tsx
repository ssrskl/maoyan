import type { BytemdPlugin } from "bytemd";
import { createRoot } from "react-dom/client";
import BlockQuote from "@/components/BlockQuote";
import { FaCircleCheck, FaCircleExclamation, FaCircleInfo, FaCircleQuestion } from "react-icons/fa6";

export function RenderPlugin(): BytemdPlugin {
    return {
        viewerEffect({ markdownBody }) {
            const admonitionInfo = markdownBody.querySelectorAll('.admonition-info');
            const admonitionWarning = markdownBody.querySelectorAll('.admonition-warning');
            const admonitionDanger = markdownBody.querySelectorAll('.admonition-danger');
            const admonitionSuccess = markdownBody.querySelectorAll('.admonition-success');
            const blockQuotes = markdownBody.querySelectorAll('.block-quote-cls');
            admonitionInfo.forEach(admonitionInfo => {
                createRoot(admonitionInfo).render(
                    <div className="flex-col border-l-4 border-[#52b1d2] p-4 bg-[#eef9fd] rounded-lg my-2">
                        <div className="flex items-center space-x-2">
                            <FaCircleInfo className="text-[#52b1d2]" />
                            <div className="text-sm font-extrabold text-[#24434e]">
                                信息
                            </div>
                        </div>
                        <div className="text-md mt-1 font-light">
                            {admonitionInfo.children[0].textContent}
                        </div>
                    </div>
                );
            });
            admonitionWarning.forEach(admonitionWarning => {
                createRoot(admonitionWarning).render(
                    <div className="flex-col border-l-4 border-[#E6A700] p-4 bg-[#FFF8E6] rounded-lg my-2">
                        <div className="flex items-center space-x-2">
                        <FaCircleQuestion className="text-[#E6A700]" />
                            <div className="text-sm font-extrabold text-[#4F3A02]">
                                警告
                            </div>
                        </div>
                        <div className="text-md mt-1 font-light">
                            {admonitionWarning.children[0].textContent}
                        </div>
                    </div>
                );
            });
            admonitionDanger.forEach(admonitionDanger => {
                createRoot(admonitionDanger).render(
                    <div className="flex-col border-l-4 border-[#E13238] p-4 bg-[#FFEBEC] rounded-lg my-2">
                        <div className="flex items-center space-x-2">
                            <FaCircleExclamation className="text-[#E13238]" />
                            <div className="text-sm font-extrabold text-[#6C393B]">
                                危险
                            </div>
                        </div>
                        <div className="text-md mt-1 font-light">
                            {admonitionDanger.children[0].textContent}
                        </div>
                    </div>
                );
            });
            admonitionSuccess.forEach(admonitionSuccess => {
                createRoot(admonitionSuccess).render(
                    <div className="flex-col border-l-4 border-[#009400] p-4 bg-[#E6F6E6] rounded-lg my-2">
                        <div className="flex items-center space-x-2">
                            <FaCircleCheck className="text-[#009400]" />
                            <div className="text-sm font-extrabold text-[#2A552A]">
                                提示
                            </div>
                        </div>
                        <div className="text-md mt-1 font-light">
                            {admonitionSuccess.children[0].textContent}
                        </div>
                    </div>
                );
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