import { visit } from "unist-util-visit";
import type { BytemdPlugin } from "bytemd";

function rehypeExtension() {
    return (tree: any) => {
        visit(tree, 'CustomNode', (node) => {
            console.log("CustomNode", node);
        });
    }
}

export function RehypeExtensionPlugin(): BytemdPlugin {
    return {
        rehype: (processor) => processor.use(rehypeExtension)
    }
}