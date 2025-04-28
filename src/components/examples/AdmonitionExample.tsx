import { Admonition } from '../ui/admonition';

export default function AdmonitionExample() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Admonition 示例</h1>
      
      <Admonition type="note">
        <p>这是一个「注意」提示框，用于引起读者对某个细节的注意。</p>
      </Admonition>
      
      <Admonition type="tip" title="小技巧">
        <p>这是一个「技巧」提示框，用于分享一些有用的技巧或建议。</p>
      </Admonition>
      
      <Admonition type="info">
        <p>这是一个「信息」提示框，用于提供额外的背景信息。</p>
      </Admonition>
      
      <Admonition type="warning">
        <p>这是一个「警告」提示框，用于提醒用户注意可能的问题。</p>
      </Admonition>
      
      <Admonition type="danger" title="危险">
        <p>这是一个「危险」提示框，用于警告用户可能造成严重后果的操作。</p>
      </Admonition>
    </div>
  );
} 