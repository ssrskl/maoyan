import type { BytemdPlugin } from "bytemd";
import remarkDirective from "remark-directive";
import { visit } from 'unist-util-visit';

function remarkDirectiveCustom() {
    return (tree: any) => {
        visit(tree, (node) => {
            if (node.type === 'containerDirective') {
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
        rehype: (processor)=>processor.use(()=>{}),
        }
    };