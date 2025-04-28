import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { myfetch } from "@/lib/fetch";

interface BlockQuoteProps {
  anchorName: string;
  anchorLink: string;
  className?: string;
}

export default function BlockQuote({
  anchorName,
  anchorLink,
}: BlockQuoteProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { data: icon } = useQuery({
    queryKey: ['icon', anchorLink],
    queryFn: async () => {
      if (anchorLink.includes('http')){
        const url = new URL(anchorLink)
        // 使用公共 CORS 代理服务
        const corsProxy = 'https://corsproxy.io/';

        try {
          const response = await fetch(corsProxy + url.origin + '/favicon.ico')
          if (response.ok) {
            const blob = await response.blob()
            return URL.createObjectURL(blob)
          }
        } catch (error) {
          console.error('Error fetching favicon:', error)
        }
        return null
      } else {
        return null
      }
    },
  });
  return (
    <span
      className={cn(
        "rounded-sm bg-muted px-2 py-1 flex max-w-fit shadow-md cursor-pointer"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(anchorLink, '_blank')}
    >
      <span className="flex items-center">
        {icon && <img src={icon} alt="icon" className="w-4 h-4 pr-2" />}
        <span className={cn("text-foreground text-xs font-medium",isHovered && "underline")}>{anchorName}</span>
        <ArrowRight
          className={cn(
            "text-foreground/60 transition-transform duration-300 w-4 h-4",
            isHovered && "translate-x-1"
          )}
        />
      </span>
    </span>
  );
}
