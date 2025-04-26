import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface BlockQuoteProps {
  anchorName: string;
  anchorLink: string;
  className?: string;
}

export default function BlockQuote({
  anchorName,
  anchorLink,
  className,
}: BlockQuoteProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={anchorLink}
      className={cn(
        "rounded-sm bg-muted p-1 flex max-w-fit",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center">
        <span className={cn("text-foreground text-xs font-medium",isHovered && "underline")}>{anchorName}</span>
        <ArrowRight
          className={cn(
            "text-foreground/60 transition-transform duration-300 w-4 h-4",
            isHovered && "translate-x-1"
          )}
        />
      </div>
    </a>
  );
}
