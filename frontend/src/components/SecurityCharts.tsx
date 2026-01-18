"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie
} from "recharts";

interface SecurityChartsProps {
    data: any[];
}

export function SecurityCharts({ data }: SecurityChartsProps) {
    // Aggregate data for category chart
    const categoryStats = data.reduce((acc: any, item: any) => {
        const cat = item.category || "Unknown";
        if (!acc[cat]) acc[cat] = { name: cat, total: 0, vulnerable: 0 };
        acc[cat].total += 1;
        if (item.status === "VULNERABLE") acc[cat].vulnerable += 1;
        return acc;
    }, {});

    const categoryChartData = Object.values(categoryStats).map((item: any) => ({
        name: item.name.split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        vulnerable: item.vulnerable,
        safe: item.total - item.vulnerable
    }));

    // Style distribution
    const styleStats = data.reduce((acc: any, item: any) => {
        const style = item.style || "N/A";
        if (!acc[style]) acc[style] = { name: style, value: 0 };
        acc[style].value += 1;
        return acc;
    }, {});
    const styleChartData = Object.values(styleStats);

    const COLORS = ['#22c55e', '#ef4444', '#eab308', '#3b82f6', '#a855f7'];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <div className="glass-card p-6 min-h-[300px]">
                <h3 className="text-muted-foreground font-medium mb-6 uppercase tracking-widest text-xs">Vulnerability by Category</h3>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={categoryChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#999"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#999"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                contentStyle={{ background: '#1a1a1f', border: '1px solid #444', borderRadius: '8px' }}
                                itemStyle={{ fontSize: '11px', color: '#ddd' }}
                            />
                            <Bar dataKey="safe" stackId="a" fill="#22c55e55" radius={[0, 0, 0, 0]} />
                            <Bar dataKey="vulnerable" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="glass-card p-6 min-h-[300px]">
                <h3 className="text-muted-foreground font-medium mb-6 uppercase tracking-widest text-xs">Attack Style Distribution</h3>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={styleChartData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {styleChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ background: '#1a1a1f', border: '1px solid #444', borderRadius: '8px' }}
                                itemStyle={{ fontSize: '11px', color: '#ddd' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
