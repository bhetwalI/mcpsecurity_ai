"use client";

import { ShieldAlert, ShieldCheck, AlertTriangle, Search, Filter } from "lucide-react";

export default function ThreatsPage() {
    const threats = [
        { id: "THR-001", type: "Prompt Injection", severity: "CRITICAL", status: "Active", detected: "2 mins ago", source: "User Input" },
        { id: "THR-002", type: "Jailbreak Attempt", severity: "HIGH", status: "Blocked", detected: "5 mins ago", source: "API Gateway" },
        { id: "THR-003", type: "Data Exfiltration", severity: "MEDIUM", status: "Investigating", detected: "12 mins ago", source: "System Log" },
        { id: "THR-004", type: "Token Manipulation", severity: "LOW", status: "Resolved", detected: "1 hour ago", source: "User Input" },
        { id: "THR-005", type: "Social Engineering", severity: "HIGH", status: "Blocked", detected: "2 hours ago", source: "Chat Interface" },
        { id: "THR-006", type: "Code Injection", severity: "CRITICAL", status: "Active", detected: "3 hours ago", source: "API Gateway" },
        { id: "THR-007", type: "PII Leakage", severity: "MEDIUM", status: "Resolved", detected: "4 hours ago", source: "Output Filter" },
        { id: "THR-008", type: "Unsafe Content", severity: "LOW", status: "Blocked", detected: "5 hours ago", source: "Content Filter" },
    ];

    return (
        <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-700">
            <header>
                <div className="flex items-center gap-2 text-primary mb-2">
                    <ShieldAlert className="w-4 h-4 fill-primary" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Threat Intelligence</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">Active Threats</h1>
                <p className="text-muted-foreground max-w-lg">
                    Real-time monitoring of detected security incidents and potential vulnerabilities.
                </p>
            </header>

            <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search threats..."
                                className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 w-64 transition-all"
                            />
                        </div>
                        <button className="glass-button flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                            <Filter className="w-3.5 h-3.5" /> Filter
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-xs text-muted-foreground font-mono">
                            <strong className="text-white">8</strong> Total Threats
                        </span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Threat Type</th>
                                <th className="px-6 py-4">Severity</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Source</th>
                                <th className="px-6 py-4">Detected</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {threats.map((threat) => (
                                <tr key={threat.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4 font-mono text-muted-foreground">{threat.id}</td>
                                    <td className="px-6 py-4 font-medium">{threat.type}</td>
                                    <td className="px-6 py-4">
                                        <span className={`
                      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border
                      ${threat.severity === 'CRITICAL' ? 'bg-destructive/10 text-destructive border-destructive/20' :
                                                threat.severity === 'HIGH' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                                                    threat.severity === 'LOW' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                        'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}
                    `}>
                                            {threat.severity === 'CRITICAL' && <AlertTriangle className="w-3 h-3" />}
                                            {threat.severity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`
                      inline-flex items-center gap-1.5 text-[11px] font-medium
                      ${threat.status === 'Active' ? 'text-white' : 'text-muted-foreground'}
                    `}>
                                            {threat.status === 'Active' && <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
                                            {threat.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{threat.source}</td>
                                    <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{threat.detected}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                                            Investigate
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
