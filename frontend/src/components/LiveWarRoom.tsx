"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldAlert, ShieldCheck, Info, AlertTriangle } from "lucide-react";
import { useEffect, useRef } from "react";

export interface AttackResult {
    id: number;
    category: string;
    prompt: string;
    response: string;
    status: string;
    reasoning: string;
}

interface LiveWarRoomProps {
    results: AttackResult[];
    status: string;
}

export function LiveWarRoom({ results, status }: LiveWarRoomProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [results]);

    return (
        <div className="flex flex-col h-full glass-card overflow-hidden">
            <div className="p-4 border-b border-white/15 flex items-center justify-between bg-white/[0.05]">
                <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-primary" />
                    <h3 className="font-bold uppercase tracking-widest text-xs">Live War Room</h3>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-[10px] text-muted-foreground animate-pulse flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {status}
                    </span>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide custom-scrollbar"
            >
                <AnimatePresence initial={false}>
                    {results.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-20">
                            <Terminal className="w-12 h-12 mb-2" />
                            <p className="text-sm">Waiting for scan simulation...</p>
                        </div>
                    ) : (
                        results.map((res) => (
                            <motion.div
                                key={res.id}
                                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                className={`p-4 rounded-xl border ${res.status === 'VULNERABLE'
                                    ? 'bg-destructive/10 border-destructive/20'
                                    : res.status === 'SAFE'
                                        ? 'bg-primary/10 border-primary/20'
                                        : 'bg-white/5 border-white/10'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        {res.status === 'VULNERABLE' ? (
                                            <AlertTriangle className="w-4 h-4 text-destructive" />
                                        ) : (
                                            <ShieldCheck className="w-4 h-4 text-primary" />
                                        )}
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${res.status === 'VULNERABLE' ? 'text-destructive' : 'text-primary'
                                            }`}>
                                            {res.category}
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground font-mono">
                                        ID: #{res.id.toString().padStart(3, '0')}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold px-1">Attack Prompt</p>
                                        <div className="bg-black/50 p-3 rounded-lg border border-white/15 font-mono text-xs text-white/90 leading-relaxed italic">
                                            "{res.prompt}"
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold px-1">AI Response</p>
                                        <div className="bg-black/30 p-3 rounded-lg border border-white/15 font-mono text-xs text-white/70 leading-relaxed">
                                            {res.response.substring(0, 150)}{res.response.length > 150 ? "..." : ""}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 pt-3 border-t border-white/15 flex items-center gap-2">
                                    <Info className="w-3.5 h-3.5 text-muted-foreground" />
                                    <p className="text-[10px] text-muted-foreground italic truncate">
                                        <span className="font-bold not-italic">JUDGE:</span> {res.reasoning}
                                    </p>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
