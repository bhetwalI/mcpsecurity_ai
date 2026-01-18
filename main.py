import argparse
import os
import pandas as pd
from scanner import run_security_scan, run_multi_turn_scan

def main():
    parser = argparse.ArgumentParser(description="MCP Security Tool - Automated Vulnerability Scanner")
    parser.add_argument("--mode", choices=["random", "csv", "multi", "mock"], default="random", 
                        help="Scan mode: random, csv, multi, or mock")
    parser.add_argument("--tests", type=int, default=10, help="Number of tests to run")
    parser.add_argument("--csv", type=str, default="prompts/adversarial.csv", help="Path to input CSV")
    parser.add_argument("--output", type=str, default="reports/security_report.csv", help="Path to save the report")
    parser.add_argument("--judge", action="store_true", help="Use AI-driven reasoning analysis (Reasoning Judge)")

    args = parser.parse_args()

    # Ensure reports directory exists
    os.makedirs(os.path.dirname(args.output), exist_ok=True)

    if args.mode == "mock":
        # Special mode to test against mock_mcp.py logic
        from mock_mcp import mock_mcp_response
        from analyzer import analyze_response, analyze_response_ai
        from prompt_generator import generate_single_attack
        
        print(f"\n--- Running MOCK Internal Scan (Judge={'ON' if args.judge else 'OFF'}) ---")
        results = []
        for i in range(args.tests):
            attack = generate_single_attack()
            print(f"[{i+1}/{args.tests}] Testing: {attack['category']}")
            response = mock_mcp_response(attack['prompt'])
            
            reasoning = "Static Keyword Analysis"
            if args.judge:
                # History is just system + user for single turn mock
                history = [{"role": "system", "content": "You are a secure MCP assistant."},
                           {"role": "user", "content": attack['prompt']}]
                status, reasoning = analyze_response_ai(history, response)
            else:
                status = analyze_response(attack['category'], response)

            results.append({
                "category": attack['category'],
                "prompt": attack['prompt'],
                "response": response,
                "status": status,
                "reasoning": reasoning
            })
        results_df = pd.DataFrame(results)
    
    elif args.mode == "multi":
        results_df = run_multi_turn_scan(num_tests=args.tests, use_judge=args.judge)
    
    elif args.mode == "csv":
        results_df = run_security_scan(target_csv=args.csv, use_judge=args.judge)
    
    else: # random
        results_df = run_security_scan(num_tests=args.tests, use_judge=args.judge)

    # Print summary
    print("\n" + "="*30)
    print("      SCAN SUMMARY")
    print("="*30)
    if not results_df.empty:
        summary = results_df['status'].value_counts()
        print(summary)
        
        # Save report
        results_df.to_csv(args.output, index=False)
        print(f"\nDetailed report saved to: {args.output}")
    else:
        print("No results generated.")

if __name__ == "__main__":
    main()
