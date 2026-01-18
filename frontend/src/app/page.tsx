"use client";

import { useState, useEffect, useRef } from "react";
import {
  Play,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Settings2,
  BrainCircuit,
  Database
} from "lucide-react";
import { HealthScore } from "@/components/HealthScore";
import { LiveWarRoom, AttackResult } from "@/components/LiveWarRoom";
import { SecurityCharts } from "@/components/SecurityCharts";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [results, setResults] = useState<AttackResult[]>([]);
  const [status, setStatus] = useState("System Ready");
  const [isScanning, setIsScanning] = useState(false);
  const [useJudge, setUseJudge] = useState(true);
  const [tests, setTests] = useState(5);
  const [healthScore, setHealthScore] = useState(100);

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Calculate health score whenever results change
    if (results.length > 0) {
      const vulnerableCount = results.filter(r => r.status === "VULNERABLE").length;
      const score = Math.round(((results.length - vulnerableCount) / results.length) * 100);
      setHealthScore(score);
    } else {
      setHealthScore(100);
    }
  }, [results]);

  const startScan = () => {
    setResults([]);
    setIsScanning(true);
    setStatus("Connecting...");

    try {
      const socket = new WebSocket("ws://localhost:54321/ws/scan");
      socketRef.current = socket;

      socket.onopen = () => {
        setStatus("Handshake Successful");
        socket.send(JSON.stringify({
          mode: "random",
          tests: tests,
          judge: useJudge
        }));
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "status") {
          setStatus(data.message);
        } else if (data.type === "result") {
          setResults(prev => [...prev, data.data]);
        } else if (data.type === "complete") {
          setStatus("Scan Complete");
          setIsScanning(false);
          socket.close();
        }
      };

      socket.onerror = () => {
        setStatus("Connection Failed");
        setIsScanning(false);
      };

      socket.onclose = () => {
        setIsScanning(false);
      };
    } catch (error) {
      setStatus("Error: Backend Unreachable");
      setIsScanning(false);
    }
  };

  const resetDashboard = () => {
    setResults([]);
    setHealthScore(100);
    setStatus("System Ready");
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary mb-2">
            <Zap className="w-4 h-4 fill-primary" />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Operational Status: Live</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Security Dashboard</h1>
          <p className="text-muted-foreground max-w-lg">
            Real-time adversarial monitoring and vulnerability detection for MCP-enabled AI assistants.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetDashboard}
            disabled={isScanning}
            className="glass-button flex items-center gap-2 text-xs font-bold uppercase tracking-widest disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
          <button
            onClick={startScan}
            disabled={isScanning}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all
              ${isScanning ? 'bg-primary/20 text-primary cursor-wait' : 'bg-primary text-primary-foreground hover:scale-105 active:scale-95 glow-green'}
            `}
          >
            <Play className={`w-4 h-4 ${isScanning ? 'animate-spin' : 'fill-primary-foreground'}`} />
            {isScanning ? 'Executing Scan...' : 'Start Secure Scan'}
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full min-h-[600px]">
        {/* Left Column: Config and Health */}
        <div className="xl:col-span-3 space-y-6 flex flex-col">
          {/* Quick Config */}
          <section className="glass-card p-6 flex-1">
            <div className="flex items-center gap-2 mb-6">
              <Settings2 className="w-4 h-4 text-primary" />
              <h3 className="font-bold uppercase tracking-widest text-xs">Configuration</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Test Count</label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={tests}
                  onChange={(e) => setTests(parseInt(e.target.value))}
                  className="w-full accent-primary bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                  <span>1</span>
                  <span className="text-primary font-bold">{tests} Simulations</span>
                  <span>50</span>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <Toggle
                  label="Deep Reasoning (Judge)"
                  description="Use AI Judge for contextual analysis"
                  icon={BrainCircuit}
                  checked={useJudge}
                  onChange={setUseJudge}
                />
                <Toggle
                  label="Local LLM Target"
                  description="Connected to LM Studio (Rnj-1)"
                  icon={Database}
                  checked={true}
                  disabled
                  onChange={() => { }}
                />
              </div>
            </div>
          </section>

          <HealthScore score={healthScore} />
        </div>

        {/* Center/Right Column: Live Stream */}
        <div className="xl:col-span-9 flex flex-col gap-6">
          <div className="h-[500px]">
            <LiveWarRoom results={results} status={status} />
          </div>

          <SecurityCharts data={results} />
        </div>
      </div>

      {/* Footer Stats bar */}
      <footer className="glass-card p-4 flex items-center justify-between gap-6 overflow-x-auto no-scrollbar">
        <Stat label="Total Scans" value={results.length.toString()} icon={Activity} color="text-blue-400" />
        <Stat
          label="Safe Response"
          value={results.filter(r => r.status === "SAFE").length.toString()}
          icon={ShieldCheck}
          color="text-primary"
        />
        <Stat
          label="Vulnerabilities"
          value={results.filter(r => r.status === "VULNERABLE").length.toString()}
          icon={ShieldAlert}
          color="text-destructive"
        />
        <div className="h-8 w-px bg-white/10 hidden md:block" />
        <div className="hidden md:flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">FastAPI Bridge Connected: Port 8000</span>
        </div>
      </footer>
    </div>
  );
}

function Toggle({ label, description, icon: Icon, checked, onChange, disabled = false }: any) {
  return (
    <div className={`flex items-start justify-between gap-4 ${disabled ? 'opacity-50' : ''}`}>
      <div className="flex gap-3">
        <div className="mt-1 p-1.5 rounded-lg bg-white/5 border border-white/10">
          <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-white leading-tight">{label}</p>
          <p className="text-[9px] text-muted-foreground leading-tight mt-0.5">{description}</p>
        </div>
      </div>
      <button
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`
                relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out
                ${checked ? 'bg-primary' : 'bg-white/10 shadow-inner'}
            `}
      >
        <span className={`
                pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                ${checked ? 'translate-x-4' : 'translate-x-0'}
            `} />
      </button>
    </div>
  );
}

function Stat({ label, value, icon: Icon, color }: any) {
  return (
    <div className="flex items-center gap-4 min-w-[150px]">
      <div className={`p-2 rounded-lg bg-white/5 border border-white/5 ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">{label}</p>
        <p className="text-xl font-bold tracking-tight">{value}</p>
      </div>
    </div>
  );
}

function Activity(props: any) {
  return <Zap {...props} />
}
