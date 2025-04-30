import type { BytemdPlugin } from "bytemd";

function remarkTest() {
    return (tree: any) => {
        console.log(tree);
    }
}

function rehypeTest() {
    return (tree: any) => {
        console.log(tree);
    }
}



export default function TestPlugin(): BytemdPlugin {
    return {
        remark: (processor) => processor.use(remarkTest),
        rehype: (processor) => processor.use(rehypeTest),
    }
};