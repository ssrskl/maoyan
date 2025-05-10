import type { BytemdPlugin } from "bytemd";
import Admonition from "../components/Admonition";
import { visit } from "unist-util-visit";

// 组件映射表
export const components = {
    'admonition': Admonition
}

function remarkExtension() {
    // 匹配 :::组件名 参数\n内容\n::: 格式
    const componentRegex = /^:::([\w-]+)(?:\s+(.+?))?\n([\s\S]+?)\n:::$/;
    return (tree: any) => {
        visit(tree, 'paragraph', (node, index, parent) => {
            // 需要检查节点是否包含子节点
            if (!node.children || node.children.length === 0) return;
            // 获取完整的文本内容
            let fullText = '';
            // 提取所有子节点的文本内容
            for (const child of node.children) {
                if (child.type === 'text') {
                    fullText += child.value;
                }
            }
            
            const match = fullText.match(componentRegex);
            if (match) {
                const [, componentName, params] = match;
                // 检查是否是我们支持的组件
                if (componentName in components) {
                    // 解析参数（如果有）
                    let parsedParams: Record<string, any> = {};
                    if (params) {
                        try {
                            // 尝试解析 JSON 格式的参数
                            parsedParams = JSON.parse(`{${params}}`);
                        } catch (e) {
                            // 如果不是有效的 JSON，尝试解析 key=value 格式
                            parsedParams = params.split(' ').reduce((acc: { [x: string]: any; }, param: string) => {
                                const [key, value] = param.split('=');
                                if (key && value) {
                                    acc[key] = value.replace(/^["'](.+)["']$/, '$1'); // 移除引号
                                }
                                return acc;
                            }, {});
                        }
                    }
                    // 替换为自定义节点
                    if (parent && typeof index === 'number') {
                        console.log(parent.children[index]);
                        parent.children[index] = {
                            type: 'CustomNode',
                            data: {
                                hName: 'div',
                                hProperties: {
                                    className: `custom-node`,
                                    dataComponent: componentName,
                                    dataProps: JSON.stringify({
                                        ...parsedParams
                                    })
                                }
                            },
                            children: parent.children[index].children
                        };
                        console.log(parent.children[index]);
                    }
                }
            }
        });
    };
}
export default function RemarkExtensionPlugin(): BytemdPlugin {
    return {
        remark: (processor) => processor.use(remarkExtension)
    }
};