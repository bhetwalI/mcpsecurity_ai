"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    LayoutDashboard,
    ShieldAlert,
    Settings,
    Activity,
    User,
    ShieldCheck,
    LogOut
} from "lucide-react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user, logout, isAuthenticated, isLoading } = useAuth();

    const authPages = ["/login", "/signup"];
    const isAuthPage = authPages.includes(pathname);

    // Show loading state
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-pulse text-white/50">Loading...</div>
            </div>
        );
    }

    // Auth pages: No sidebar, just content
    if (isAuthPage) {
        return <main className="min-h-screen">{children}</main>;
    }

    // Protected pages: Show sidebar
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <aside className="w-20 lg:w-64 bg-black/50 backdrop-blur-xl border-r border-white/20 flex flex-col p-4 z-10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-10 px-2 lg:px-4">
                    <div className="p-2 bg-primary rounded-xl glow-green">
                        <ShieldCheck className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <span className="hidden lg:block font-bold text-xl tracking-tight">MCP Shield</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/" active={pathname === "/"} />
                    <SidebarItem icon={ShieldAlert} label="Threats" href="/threats" active={pathname === "/threats"} />
                    <SidebarItem icon={Activity} label="Analytics" href="/analytics" active={pathname === "/analytics"} />
                    <SidebarItem icon={Settings} label="Settings" href="/settings" active={pathname === "/settings"} />
                </nav>

                <div className="mt-auto pt-4 border-t border-white/20 space-y-2">
                    <SidebarItem icon={User} label="Profile" href="/profile" active={pathname === "/profile"} />

                    {isAuthenticated && (
                        <button onClick={logout} className="w-full block">
                            <div className="flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all group text-red-400/70 hover:bg-red-500/10 hover:text-red-400">
                                <LogOut className="w-6 h-6" />
                                <span className="hidden lg:block font-medium">Logout</span>
                            </div>
                        </button>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative bg-transparent p-6 lg:p-10">
                {/* Top bar with user info */}
                {isAuthenticated && user && (
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                        <div>
                            <p className="text-sm text-white/50">Welcome back,</p>
                            <p className="text-lg font-semibold">{user.name}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${user.role === "admin"
                                    ? "bg-primary/10 border border-primary/20 text-primary"
                                    : "bg-blue-500/10 border border-blue-500/20 text-blue-500"
                                }`}>
                                {user.role}
                            </span>
                        </div>
                    </div>
                )}
                {children}
            </main>
        </div>
    );
}

function SidebarItem({ icon: Icon, label, href, active }: { icon: any, label: string, href: string, active?: boolean }) {
    return (
        <a href={href} className="block">
            <div className={`
        flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all group
        ${active
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }
      `}>
                <Icon className="w-6 h-6" />
                <span className="hidden lg:block font-medium">{label}</span>
            </div>
        </a>
    );
}
