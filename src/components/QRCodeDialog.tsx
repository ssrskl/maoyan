import { QRCodeSVG } from 'qrcode.react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SiWechat } from "react-icons/si";

interface QRCodeDialogProps {
  url: string;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function QRCodeDialog({ url, title, open, onOpenChange }: QRCodeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <SiWechat className="mr-2 text-green-600 text-xl" />
            微信扫码分享
          </DialogTitle>
          <DialogDescription>
            请使用微信扫描二维码分享"{title}"
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-6">
          <QRCodeSVG value={url} size={200} includeMargin />
          <p className="mt-4 text-sm text-gray-500">
            扫描上方二维码，在微信中打开链接后分享
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
} 