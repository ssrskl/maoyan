import { cn } from "@/lib/utils";
import type { BytemdPlugin } from "bytemd";
import { visit } from "unist-util-visit";

function remarkBlockQuote() {
    return (tree: any) => {
        console.log('remarkBlockQuote');
        console.log(tree); 
        visit(tree, "paragraph",(node: any) => {
            if (node.children.length === 3 
                && node.children[0].type === 'text' 
                && node.children[1].type === 'link' 
                && node.children[2].type === 'text'
                && node.children[0].value[0] === '['
                && node.children[2].value === ')]]'
                ){
                const newChildren: any[] = [];
                newChildren.push({
                    type: 'blockQuoteLink',
                    data: {
                        hName: 'span',
                        hProperties: {
                            className: cn('block-quote-cls inline-block', node.children[1].url),
                            dataComponent: 'block-quote',
                            dataContent: 'Test Content'
                        }
                    },
                    children: [
                        {
                            type: 'text',
                            value: node.children[0].value.slice(3, -3)
                        }
                    ]
                })
                node.children = newChildren
            }
        });
    };
}

function rehypeBlockQuote() {
    return (tree: any) => {
        visit(tree, "element", (node: any) => {
            if (node.tagName === 'span' && node.properties.className.includes('block-quote-cls')) {
                console.log(node.properties.dataContent);
            }
        });
    };
}
export default function BlockQuotePlugin(): BytemdPlugin {
    return {
        remark: (processor) => processor.use(remarkBlockQuote),
        rehype: (processor) => processor.use(rehypeBlockQuote),
    };
}