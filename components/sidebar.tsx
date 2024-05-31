"use client";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard,
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Code,
  Settings,
  Music}
  from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
}); 
<LayoutDashboard size={48} color="blue" href="/dashboard"/>

const routes = [
    {
        label: "Dashboard",
        icon:LayoutDashboard,
        href: "/dashboard",
        color: "text-blue-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare ,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-700",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

const Sidebar = () => {
  const pathname = usePathname()
  return (
    <div className="space-y-4 py-4 flex felx-col h-ful bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb:14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            NaSa_AI
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            
            <Link
              href={route.href}
              key={route.href}
             className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bd-white/10 rounded-lg transition", 
            pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")}
            >
                
              <div className="flex flex-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3"  , route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
