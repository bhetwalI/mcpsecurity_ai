"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, Lock, Mail, ArrowRight, Key } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState<"credentials" | "otp">("credentials");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:54321/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || "Login failed");

            setStep("otp");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:54321/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || "OTP verification failed");

            login(data.user.email, data.user.role, data.user.name, data.access_token);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-[#0f0f12] to-[#0f0f12] z-0" />

            <div className="z-10 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex p-3 bg-primary/10 rounded-2xl glow-green mb-4">
                        <ShieldCheck className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-white/60">Enter your credentials to access the secure command center.</p>
                </div>

                <div className="glass-card p-8 border-t border-white/10">
                    {step === "credentials" ? (
                        <form onSubmit={handleLogin} className="space-y-4">
                            {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg text-center">{error}</div>}

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/70">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-white/20 transition-all"
                                        placeholder="admin@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/70">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                    <input
                                        type="password"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-white/20 transition-all"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 mt-6 active:scale-[0.98]"
                            >
                                {loading ? <span className="cursor-wait">Authenticating...</span> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOTP} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg text-center">{error}</div>}

                            <div className="text-center">
                                <h3 className="text-lg font-medium text-white">Two-Factor Authentication</h3>
                                <p className="text-sm text-white/50 mt-1">We sent a code to <span className="text-white/80">{email}</span></p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/70">Enter OTP Code</label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-white/20 text-center tracking-[0.5em] font-mono text-lg transition-all"
                                        placeholder="000000"
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                            >
                                {loading ? "Verifying..." : "Verify & Access"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep("credentials")}
                                className="w-full text-xs text-white/40 hover:text-white transition-colors"
                            >
                                Back to Login
                            </button>
                        </form>
                    )}
                </div>

                <p className="text-center text-white/30 text-sm mt-6">
                    Don't have an account? <Link href="/signup" className="text-primary hover:underline hover:text-primary/80 transition-colors">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
