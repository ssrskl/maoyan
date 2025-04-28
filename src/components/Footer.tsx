
import {  FaCircleCheck } from "react-icons/fa6";
import { SiSinaweibo, SiTencentqq, SiWechat, SiZhihu } from "react-icons/si";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Footer() {
    return (
        <footer className="flex pb-32 w-full pt-48 items-start justify-center space-y-4 ">
          <div className="flex w-3/5 justify-between">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                    <AvatarImage src={"https://avatars.githubusercontent.com/u/18780761?v=4"}/>
                    <AvatarFallback>MY</AvatarFallback>
                </Avatar>
                <h1 className="text-lg font-bold">猫颜的个人博客</h1>
              </div>
              <p className="text-zinc-700 text-sm">一花一世界，一叶一追寻</p>
              <p className="text-zinc-400">© 2023-2025 Maoyan, LLC</p>
              <div className="grid grid-cols-4">
                <SiTencentqq className="border border-stone-300 w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer" />
                <SiWechat className="border border-stone-300 w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer" />
                <SiSinaweibo className="border border-stone-300 w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer" />
                <SiZhihu className="border border-stone-300 w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer" />
              </div>
              <div className="flex items-center space-x-2 rounded-lg hover:bg-zinc-200 hover:shadow-md px-2 py-1">
                <div className="relative flex w-4 h-4">
                  <FaCircleCheck className="absolute text-green-400 animate-ping " />
                  <FaCircleCheck className="text-green-400 " />
                </div>
                <p className="text-sm">服务器运行中</p>
              </div>
            </div>
            <div className=" text-gray-600 md:flex md:flex-col space-y-2 sm:hidden">
              <div className="text-base font-bold text-black pb-3">产品</div>
              <p className="hover:font-bold cursor-pointer">更新进度</p>
              <p className="hover:font-bold cursor-pointer">价格与计划</p>
              <p className="hover:font-bold cursor-pointer">助手市场</p>
              <p className="hover:font-bold cursor-pointer">插件市场</p>
              <p className="hover:font-bold cursor-pointer">社区版</p>
            </div>
    
            <div className=" text-gray-600 md:flex md:flex-col space-y-2 sm:hidden">
              <div className="text-base font-bold text-black pb-3">功能</div>
              <p className="hover:font-bold cursor-pointer">特性总览</p>
              <p className="hover:font-bold cursor-pointer">功能对比</p>
              <p className="hover:font-bold cursor-pointer">创新点</p>
            </div>
    
            <div className=" text-gray-600 md:flex md:flex-col space-y-2 sm:hidden">
              <div className="text-base font-bold text-black pb-3">资源</div>
              <p className="hover:font-bold cursor-pointer">博客</p>
              <p className="hover:font-bold cursor-pointer">论坛</p>
              <p className="hover:font-bold cursor-pointer">快速上手</p>
              <p className="hover:font-bold cursor-pointer">开发文档</p>
              <p className="hover:font-bold cursor-pointer">用户反馈</p>
            </div>
    
            <div className=" text-gray-600 md:flex md:flex-col space-y-2 sm:hidden">
              <div className="text-base font-bold text-black pb-3">开源</div>
              <p className="hover:font-bold cursor-pointer">更新进度</p>
              <p className="hover:font-bold cursor-pointer">价格与计划</p>
              <p className="hover:font-bold cursor-pointer">助手市场</p>
              <p className="hover:font-bold cursor-pointer">插件市场</p>
              <p className="hover:font-bold cursor-pointer">社区版</p>
            </div>
    
            <div className=" text-gray-600 md:flex md:flex-col space-y-2 sm:hidden">
              <div className="text-base font-bold text-black pb-3">关于</div>
              <p className="hover:font-bold cursor-pointer">关于我们</p>
              <p className="hover:font-bold cursor-pointer">服务条款</p>
              <p className="hover:font-bold cursor-pointer">隐私政策</p>
              <p className="hover:font-bold cursor-pointer">联系我们</p>
            </div>
          </div>
        </footer>);
}