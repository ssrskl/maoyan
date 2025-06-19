declare module '*.mdx' {
  import type { ComponentType } from 'react';
  const MDXComponent: ComponentType<{ components: any }>;
  export default MDXComponent;
} 