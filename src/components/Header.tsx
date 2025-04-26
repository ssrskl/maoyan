import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router'
import { useScroll } from 'ahooks';
import { FaCat, FaGithub, FaRegLightbulb } from "react-icons/fa";
import { SiSearxng } from "react-icons/si";


export default function Header() {
  const scroll = useScroll(() => document);
  return (
    <header
      className={cn(
        "w-full sticky top-0 backdrop-blur transition-[background-color,border-width] border-x-0  flex justify-center z-10",
        (scroll?.top ?? 0) > 60 && "bg-background/50 border-b border-border/70"
      )}
    >
      <div className="w-full flex items-center h-16 p-4 sm:p-8 md:max-w-screen-md 2xl:max-w-screen-xl">
        <FaCat className={"text-3xl"} />
        <Link
          to={"/"}
          className={cn("mr-4 hidden sm:flex")}
          aria-label={"猫颜"}
        >
          <span className="ml-2 font-semibold text-primary text-base">
            {"猫颜的数字花园"}
          </span>
        </Link>
        <div className="h-16 flex-1 hidden sm:flex justify-end items-center gap-12 text-base font-medium mr-8">
          <Link to="/" className="hidden sm:flex" activeProps={{className: "text-primary font-bold underline"}} activeOptions={{exact:true}}>主页</Link>
          <Link to="/blog" className="hidden sm:flex" activeProps={{className: "text-primary font-bold underline"}}>博客</Link>
          <Link to="/markdown-demo" className="hidden sm:flex" activeProps={{className: "text-primary font-bold underline"}}>Markdown演示</Link>
          <Link to="/about" className="hidden sm:flex" activeProps={{className: "text-primary font-bold underline"}}>关于我</Link>
        </div>

        <div className="flex sm:flex-none justify-end items-center space-x-2">
          <FaGithub
            className="text-base w-8 h-8 p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
            onClick={() => window.open("https://github.com/ssrskl")}
          />
          <FaRegLightbulb className="text-base w-8 h-8 p-2 rounded-lg hover:bg-gray-200 cursor-pointer " />
          <SiSearxng
            className="text-base w-8 h-8 p-2 rounded-lg hover:bg-gray-200 cursor-pointer "
            onClick={() => {
              // setOpen(true);
            }}
          />
        </div>
      </div>
    </header>
  )
}
