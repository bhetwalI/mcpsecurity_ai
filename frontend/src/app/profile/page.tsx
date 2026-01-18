"use client";

import { User, Shield, Key, Clock, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-white/50">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="max-w-[1000px] mx-auto space-y-8 animate-in fade-in duration-700">
            <header>
                <div className="flex items-center gap-2 text-primary mb-2">
                    <User className="w-4 h-4 fill-primary" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Personnel File</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">Operator Profile</h1>
                <p className="text-muted-foreground">
                    Security clearance details and session history.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Profile Card */}
                <div className="glass-card p-8 col-span-1 md:col-span-2 flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 border-2 border-white/10 flex items-center justify-center">
                            <User className="w-12 h-12 text-white/50" />
                        </div>
                        <div className="absolute bottom-0 right-0 p-2 bg-primary rounded-full border-4 border-[#0f0f12]">
                            <Shield className="w-4 h-4 text-primary-foreground fill-current" />
                        </div>
                    </div>

                    <div className="text-center md:text-left space-y-4 flex-1">
                        <div>
                            <h2 className="text-2xl font-bold">{user.name}</h2>
                            <p className="text-muted-foreground font-mono text-sm">{user.email}</p>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${user.role === "admin"
                                    ? "bg-primary/10 border border-primary/20 text-primary"
                                    : "bg-blue-500/10 border border-blue-500/20 text-blue-500"
                                }`}>
                                {user.role === "admin" ? "Admin Access" : "User Access"}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Role</p>
                                <p className="font-medium capitalize">{user.role}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Status</p>
                                <p className="font-medium text-primary">Active</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Panel */}
                <div className="glass-card p-6 space-y-4">
                    <h3 className="font-bold uppercase tracking-widest text-xs mb-4">Account Actions</h3>

                    <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group">
                        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                            <Key className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm font-bold">Change Password</p>
                            <p className="text-[10px] text-muted-foreground">Update your credentials</p>
                        </div>
                    </button>

                    <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group">
                        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                            <Clock className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm font-bold">Session History</p>
                            <p className="text-[10px] text-muted-foreground">View recent access logs</p>
                        </div>
                    </button>

                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-destructive/10 transition-colors text-left group text-destructive"
                    >
                        <div className="p-2 bg-destructive/10 rounded-lg group-hover:bg-destructive/20 transition-colors">
                            <LogOut className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm font-bold">Sign Out</p>
                            <p className="text-[10px] text-destructive/70">Terminate current session</p>
                        </div>
                    </button>
                </div>

            </div>
        </div>
    );
}
