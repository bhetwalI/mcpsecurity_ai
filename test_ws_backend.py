import asyncio
import websockets
import json

async def test_ws():
    uri = "ws://localhost:54321/ws/scan"
    try:
        async with websockets.connect(uri) as websocket:
            print("Connected to WS")
            config = {"mode": "random", "tests": 2, "judge": False}
            await websocket.send(json.dumps(config))
            print("Sent config")
            
            while True:
                response = await websocket.recv()
                data = json.loads(response)
                print(f"Received: {data['type']}")
                if data['type'] == 'complete':
                    break
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(test_ws())
