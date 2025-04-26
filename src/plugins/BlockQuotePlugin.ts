import { cn } from "@/lib/utils";
import type { BytemdPlugin } from "bytemd";
import { visit } from "unist-util-visit";

function remarkBlockQuote() {
    return (tree: any) => {
        visit(tree, "paragraph",(node: any) => {
            // 查找文本节点中的[[(名称),(网址)]]模式
            if (node.children && node.children.some((child: any) => 
                child.type === 'text' && 
                /\[\[\(.+?\),\(.+?\)\]\]/.test(child.value)
            )) {
                // 收集所有匹配的文本
                const newChildren: any[] = [];
                
                node.children.forEach((child: any) => {
                    if (child.type === 'text') {
                        // 分割文本，查找并处理匹配模式
                        let lastIndex = 0;
                        const regex = /\[\[\((.+?)\),\((.+?)\)\]\]/g;
                        let match;
                        
                        while ((match = regex.exec(child.value)) !== null) {
                            // 添加匹配前的文本
                            if (match.index > lastIndex) {
                                newChildren.push({
                                    type: 'text',
                                    value: child.value.substring(lastIndex, match.index)
                                });
                            }
                            
                            // 从匹配中提取名称和URL
                            const [_, name, url] = match;
                            
                            // 创建一个新的节点，代表block-quote
                            newChildren.push({
                                type: 'blockQuoteLink',
                                data: {
                                    hName: 'span',
                                    hProperties: {
                                        className: cn('block-quote-cls inline-block', url),
                                    }
                                },
                                children: [
                                    {
                                        type: 'text',
                                        value: name
                                    }
                                ]
                            });
                            
                            lastIndex = regex.lastIndex;
                        }
                        
                        // 添加剩余文本
                        if (lastIndex < child.value.length) {
                            newChildren.push({
                                type: 'text',
                                value: child.value.substring(lastIndex)
                            });
                        }
                    } else {
                        // 保留非文本节点
                        newChildren.push(child);
                    }
                });
                // 用新的children替换旧的
                node.children = newChildren;
            }
        });
    };
}

export default function BlockQuotePlugin(): BytemdPlugin {
    return {
        remark: (processor) => processor.use(remarkBlockQuote),
    };
}