import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface SummaryAIProps {
  summary?: string;
  content?: string;
  className?: string;
}

export function SummaryAI({ summary, content, className }: SummaryAIProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedSummary, setGeneratedSummary] = useState<string>("");

  useEffect(() => {
    // 如果已提供summary，直接使用
    if (summary) {
      setGeneratedSummary(summary);
      return;
    }
    
    // 如果没有提供summary但有content，则执行content总结逻辑
    if (content && !summary) {
      setIsLoading(true);
      
      // 这里是一个模拟总结内容的函数
      // 在实际应用中，您可能需要调用AI API来总结内容
      const simulateAISummary = () => {
        setTimeout(() => {
          // 模拟API返回
          setGeneratedSummary(`这是对内容的AI总结：${content.slice(0, 100)}...`);
          setIsLoading(false);
        }, 1000);
      };
      
      simulateAISummary();
    }
  }, [summary, content]);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">AI 内容总结</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[75%]" />
          </div>
        ) : generatedSummary ? (
          <div className="text-sm text-muted-foreground">{generatedSummary}</div>
        ) : (
          <div className="text-sm text-muted-foreground">无法生成总结，请提供内容。</div>
        )}
      </CardContent>
    </Card>
  );
}
