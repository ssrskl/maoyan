import type { BytemdPlugin } from "bytemd";
import rehypeSlug from 'rehype-slug'

export default function CommonPlugin(): BytemdPlugin {
    return {
        rehype: (processor) => processor.use(rehypeSlug),
    }
};