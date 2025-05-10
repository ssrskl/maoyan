import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import QRCodeDialog from './QRCodeDialog';

interface ShareButtonProps {
  icon: React.ReactNode;
  platform: string;
  url?: string;
  title?: string;
  onClick?: () => void;
}

// 根据不同平台构建分享URL
export function buildShareUrl(platform: string, url: string, title?: string): string {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = title ? encodeURIComponent(title) : '';
  
  switch (platform) {
    case '复制链接':
      return url;
    case 'QQ':
      return `https://connect.qq.com/widget/shareqq/index.html?url=${encodedUrl}&title=${encodedTitle}`;
    case '微信':
      // 微信一般通过生成二维码分享，这里简化处理
      return url;
    case '微博':
      return `https://service.weibo.com/share/share.php?url=${encodedUrl}&title=${encodedTitle}`;
    case 'X':
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    case 'Facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'Gmail':
      return `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;
    case '知乎':
      return `https://www.zhihu.com/share?url=${encodedUrl}&title=${encodedTitle}`;
    default:
      return url;
  }
}

export default function ShareButton({ 
  icon, 
  platform, 
  url, 
  title,
  onClick 
}: ShareButtonProps) {
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [pageTitle, setPageTitle] = useState<string>('');
  const [showQRCode, setShowQRCode] = useState(false);
  
  useEffect(() => {
    // 在客户端运行时设置URL和标题
    setCurrentUrl(url || window.location.href);
    setPageTitle(title || document.title);
  }, [url, title]);
  
  const handleShare = () => {
    if (onClick) {
      onClick();
      return;
    }
    
    // 确保在客户端环境
    if (typeof window === 'undefined') {
      return;
    }
    
    if (platform === '复制链接') {
      navigator.clipboard.writeText(currentUrl)
        .then(() => toast.success('链接已复制到剪贴板'))
        .catch(() => toast.error('复制失败，请手动复制'));
      return;
    }
    
    if (platform === '微信') {
      setShowQRCode(true);
      return;
    }
    
    // 获取分享链接
    const shareUrl = buildShareUrl(platform, currentUrl, pageTitle);
    
    // 打开分享窗口
    window.open(shareUrl, `分享到${platform}`, 'width=600,height=500,menubar=no,toolbar=no');
    toast.success(`已打开${platform}分享窗口`);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.1 }}
              onClick={handleShare}
              className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300 flex items-center justify-center"
            >
              {icon}
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>分享到{platform}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {platform === '微信' && (
        <QRCodeDialog 
          url={currentUrl} 
          title={pageTitle} 
          open={showQRCode} 
          onOpenChange={setShowQRCode} 
        />
      )}
    </>
  );
} 