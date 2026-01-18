from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
import os
import pandas as pd
from typing import List

# Import existing logic
# Ensure the root directory is in the path
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from scanner import run_security_scan, run_multi_turn_scan
from analyzer import analyze_response, analyze_response_ai

app = FastAPI()

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async library_connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)

manager = ConnectionManager()

@app.get("/")
async def root():
    return {"status": "MCP Security Tool API is running"}

@app.websocket("/ws/scan")
async def websocket_endpoint(websocket: WebSocket):
    await manager.library_connect(websocket)
    try:
        while True:
            # Wait for scan command
            data = await websocket.receive_text()
            scan_config = json.loads(data)
            
            # Start scan in a background task to keep websocket alive
            await run_ui_scan(scan_config, websocket)
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)

async def run_ui_scan(config, websocket):
    mode = config.get("mode", "random")
    tests = config.get("tests", 10)
    use_judge = config.get("judge", False)
    
    await websocket.send_json({"type": "status", "message": f"Starting {mode} scan..."})
    
    # We need to modify scanner functions to yield progress, 
    # but for now, we'll simulate the broadcast loop or refactor scanner
    # Let's perform a simple manual loop here to demonstrate real-time updates
    
    from prompt_generator import generate_single_attack
    from llm_client import get_llm_response
    
    results = []
    for i in range(tests):
        attack = generate_single_attack()
        await websocket.send_json({
            "type": "progress", 
            "current": i + 1, 
            "total": tests,
            "category": attack["category"],
            "prompt": attack["prompt"]
        })
        
        messages = [
            {"role": "system", "content": "You are a secure MCP assistant."},
            {"role": "user", "content": attack["prompt"]}
        ]
        
        # In a real app, this would be awaitable
        # For now, we simulate the async nature
        loop = asyncio.get_event_loop()
        llm_output = await loop.run_in_executor(None, get_llm_response, messages)
        
        if use_judge:
            status, reasoning = await loop.run_in_executor(None, analyze_response_ai, messages, llm_output)
        else:
            status = await loop.run_in_executor(None, analyze_response, attack["category"], llm_output)
            reasoning = "Static Keyword Analysis"
            
        result = {
            "id": i + 1,
            "category": attack["category"],
            "prompt": attack["prompt"],
            "response": llm_output,
            "status": status,
            "reasoning": reasoning
        }
        results.append(result)
        
        await websocket.send_json({"type": "result", "data": result})
        
    await websocket.send_json({"type": "complete", "results": results})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
