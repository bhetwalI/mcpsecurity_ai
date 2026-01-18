"use client";

import { Settings, Save, Lock, Cpu, Sliders, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
    const [showKey, setShowKey] = useState(false);
    const [apiKey, setApiKey] = useState("sk-ant-........................");

    return (
        <div className="max-w-[1000px] mx-auto space-y-8 animate-in fade-in duration-700">
            <header>
                <div className="flex items-center gap-2 text-primary mb-2">
                    <Settings className="w-4 h-4 fill-primary" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em]">System Configuration</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">Settings</h1>
                <p className="text-muted-foreground">
                    Manage LLM connections, security thresholds, and system preferences.
                </p>
            </header>

            <div className="space-y-6">

                {/* Model Configuration */}
                <section className="glass-card p-8">
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                        <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                            <Cpu className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Model Selection</h3>
                            <p className="text-xs text-muted-foreground">Choose the LLM backend for security analysis</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Provider</label>
                            <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                                <option>Anthropic Claude 3.5 Sonnet</option>
                                <option>OpenAI GPT-4o</option>
                                <option>Local (Ollama)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Temperature</label>
                            <div className="flex items-center gap-4">
                                <input type="range" className="flex-1 accent-primary h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                                <span className="font-mono text-sm bg-white/5 px-3 py-1 rounded border border-white/10">0.7</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* API Keys */}
                <section className="glass-card p-8">
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                        <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                            <Lock className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">API Access</h3>
                            <p className="text-xs text-muted-foreground">Manage your secure API keys</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Anthropic API Key</label>
                            <div className="relative">
                                <input
                                    type={showKey ? "text" : "password"}
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-primary/50 transition-colors"
                                />
                                <button
                                    onClick={() => setShowKey(!showKey)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                                >
                                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Scan Parameters */}
                <section className="glass-card p-8">
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                        <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                            <Sliders className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Scan Thresholds</h3>
                            <p className="text-xs text-muted-foreground">Configure vulnerability detection sensitivity</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Deep Analysis Mode</p>
                                <p className="text-xs text-muted-foreground">Use slower, more reasoning-heavy evaluation</p>
                            </div>
                            <div className="w-12 h-6 rounded-full bg-primary/20 border border-primary/50 relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-3.5 h-3.5 bg-primary rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Auto-Block Threats</p>
                                <p className="text-xs text-muted-foreground">Automatically update firewall rules</p>
                            </div>
                            <div className="w-12 h-6 rounded-full bg-white/5 border border-white/10 relative cursor-pointer">
                                <div className="absolute left-1 top-1 w-3.5 h-3.5 bg-white/20 rounded-full" />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="flex justify-end pt-4">
                    <button className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-widest px-8 py-3 rounded-xl hover:scale-105 active:scale-95 transition-all glow-green">
                        <Save className="w-4 h-4" /> Save Configuration
                    </button>
                </div>

            </div>
        </div>
    );
}
