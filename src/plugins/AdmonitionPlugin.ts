import type { BytemdPlugin } from "bytemd";
import remarkDirective from "remark-directive";
import rehypeSlug from 'rehype-slug'
import { visit } from 'unist-util-visit';
import { createRoot } from "react-dom/client";
import { Button } from "@/components/ui/button";

function remarkDirectiveCustom(){
    return (tree) => {
        visit(tree,(node)=>{
            if(node.type === 'containerDirective'){
                node.data = {
                    hName: 'div',
                    hProperties: {
                        className: `admonition-${node.name}`
                    }
                }
            }
        })
    }
}

export default function AdmonitionPlugin(): BytemdPlugin {
    return {
        // 扩展 Remark 解析器，添加指令解析
        remark: (processor) => processor.use(remarkDirective).use(
            remarkDirectiveCustom
        ),
        // 扩展 Rehype 渲染器，处理指令节点
        rehype: (processor)=>processor.use(()=>(tree)=>{
            visit(tree,(node)=>{
                if(node.type === 'element' && node.tagName === 'div'){
                    const className = node.properties?.className as string[];
                    if(className && className[0].startsWith('admonition-')){
                        const type = className[0].replace('admonition-','');
                        node.tagName = 'div';
                    }
                }
            })
        }),
        viewerEffect({markdownBody}){
            const admonition_info = markdownBody.querySelector('.admonition-info');
            }
        }
    };