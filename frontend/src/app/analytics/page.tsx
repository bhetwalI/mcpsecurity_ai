"use client";

import { Activity, BarChart3, PieChart as PieIcon, TrendingUp, ShieldCheck } from "lucide-react";
import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell
} from "recharts";

export default function AnalyticsPage() {
    // Mock Data
    const radarData = [
        { subject: 'Prompt Injection', A: 120, fullMark: 150 },
        { subject: 'Jailbreak', A: 98, fullMark: 150 },
        { subject: 'Social Eng.', A: 86, fullMark: 150 },
        { subject: 'Data Leak', A: 99, fullMark: 150 },
        { subject: 'Code Injection', A: 85, fullMark: 150 },
        { subject: 'Token Manipulation', A: 65, fullMark: 150 },
    ];

    const timelineData = [
        { name: '00:00', attacks: 4, blocked: 3 },
        { name: '04:00', attacks: 7, blocked: 6 },
        { name: '08:00', attacks: 15, blocked: 12 },
        { name: '12:00', attacks: 23, blocked: 20 },
        { name: '16:00', attacks: 18, blocked: 15 },
        { name: '20:00', attacks: 10, blocked: 9 },
        { name: '24:00', attacks: 5, blocked: 5 },
    ];

    const severityData = [
        { name: 'Critical', value: 5 },
        { name: 'High', value: 12 },
        { name: 'Medium', value: 25 },
        { name: 'Low', value: 45 },
    ];

    const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e'];

    return (
        <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-700">
            <header>
                <div className="flex items-center gap-2 text-primary mb-2">
                    <Activity className="w-4 h-4 fill-primary" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Security Analytics</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">Attack Metrics</h1>
                <p className="text-muted-foreground max-w-lg">
                    Deep dive analysis of attack vectors, frequency, and system resilience.
                </p>
            </header>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* Radar Chart - Attack Vectors */}
                <div className="glass-card p-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                        <PieIcon className="w-4 h-4 text-primary" />
                        <h3 className="font-bold uppercase tracking-widest text-xs">Attack Vector Analysis</h3>
                    </div>
                    <div className="h-[300px] w-full flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid stroke="#ffffff20" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#999', fontSize: 10 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                <Radar
                                    name="Attacks"
                                    dataKey="A"
                                    stroke="#22c55e"
                                    strokeWidth={2}
                                    fill="#22c55e"
                                    fillOpacity={0.2}
                                />
                                <Tooltip
                                    contentStyle={{ background: '#1a1a1f', border: '1px solid #444', borderRadius: '8px' }}
                                    itemStyle={{ fontSize: '11px', color: '#ddd' }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Area Chart - Timeline */}
                <div className="glass-card p-6 flex flex-col col-span-1 xl:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <h3 className="font-bold uppercase tracking-widest text-xs">24h Attack Frequency</h3>
                    </div>
                    <div className="h-[300px] w-full flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={timelineData}>
                                <defs>
                                    <linearGradient id="colorAttacks" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ background: '#1a1a1f', border: '1px solid #444', borderRadius: '8px' }}
                                    itemStyle={{ fontSize: '11px', color: '#ddd' }}
                                />
                                <Area type="monotone" dataKey="attacks" stroke="#ef4444" fillOpacity={1} fill="url(#colorAttacks)" strokeWidth={2} />
                                <Area type="monotone" dataKey="blocked" stroke="#22c55e" fillOpacity={1} fill="url(#colorBlocked)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Metric Cards */}
                <div className="glass-card p-6 flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                        <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Resilience Score</p>
                        <p className="text-2xl font-bold tracking-tight">94.2%</p>
                    </div>
                </div>

                <div className="glass-card p-6 flex items-center gap-4">
                    <div className="p-3 bg-destructive/10 rounded-xl border border-destructive/20">
                        <BarChart3 className="w-6 h-6 text-destructive" />
                    </div>
                    <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Avg. Attempts/Hr</p>
                        <p className="text-2xl font-bold tracking-tight">42</p>
                    </div>
                </div>

                <div className="glass-card p-6 flex items-center gap-4">
                    <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                        <Activity className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Active Monitors</p>
                        <p className="text-2xl font-bold tracking-tight">12/12</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
