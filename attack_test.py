from prompt_generator import generate_single_attack, generate_multi_turn_attack
from llm_client import get_llm_response

# -------- SINGLE ADVANCED PROMPT --------
attack = generate_single_attack()
print("\nATTACK CATEGORY :", attack['category'])
print("STYLE           :", attack['style'])
print("PROMPT          :", attack['prompt'])

response = get_llm_response([
    {"role": "system", "content": "You are a secure MCP assistant."},
    {"role": "user", "content": attack['prompt']}
])

print("\nMODEL RESPONSE:\n", response)

# -------- MULTI‑TURN CONVERSATION TEST --------
conversation = generate_multi_turn_attack()

messages = [{"role": "system", "content": "You are a secure MCP assistant."}]
for msg in conversation:
    messages.append({"role": "user", "content": msg})

response = get_llm_response(messages)

print("\nMULTI‑TURN FINAL RESPONSE:\n", response)
