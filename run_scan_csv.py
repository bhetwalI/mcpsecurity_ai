import os
from scanner import run_security_scan

# 1. Get the path to the 'prompts' folder
base_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(base_dir, 'prompts', 'adversarial.csv')

# 2. Check if the file actually exists before running
if not os.path.exists(csv_path):
    print(f"Error: The file was not found at {csv_path}")
else:
    # 3. Run the scan with the CSV path
    results_df = run_security_scan(target_csv=csv_path)

    print("\n--- SCAN RESULTS ---")
    if not results_df.empty:
        # Use 'category' which is normalized in scanner.py
        print(results_df[['category', 'status']])

    # Save to a report
    output_file = 'reports/security_report.csv'
    os.makedirs('reports', exist_ok=True)
    results_df.to_csv(output_file, index=False)
    print(f"\nReport saved to {output_file}")