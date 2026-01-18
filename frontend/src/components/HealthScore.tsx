"use client";

import { motion } from "framer-motion";

interface HealthScoreProps {
    score: number;
}

export function HealthScore({ score }: HealthScoreProps) {
    const color = score > 80 ? "#22c55e" : score > 50 ? "#eab308" : "#ef4444";
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center p-6 glass-card w-full h-full min-h-[250px]">
            <h3 className="text-muted-foreground font-medium mb-4 uppercase tracking-widest text-xs">Security Health</h3>

            <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 160 160">
                    {/* Background circle */}
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="transparent"
                        stroke="rgba(255,255,255,0.12)"
                        strokeWidth="12"
                    />
                    {/* Progress circle */}
                    <motion.circle
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="transparent"
                        stroke={color}
                        strokeWidth="12"
                        strokeDasharray={circumference}
                        strokeLinecap="round"
                        style={{
                            filter: `drop-shadow(0 0 8px ${color}44)`,
                            transform: 'rotate(-90deg)',
                            transformOrigin: 'center'
                        }}
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl font-bold tracking-tighter"
                    >
                        {score}%
                    </motion.span>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                        {score > 80 ? "Fortified" : score > 50 ? "Caution" : "Critical"}
                    </span>
                </div>
            </div>
        </div>
    );
}
