import requests
from pathlib import Path

env_file = Path("/Users/OmisPersonal/aiwithomi-site/.env")
token = None
for line in env_file.read_text().splitlines():
    if line.startswith("CLOUDFLARE_API_TOKEN="):
        token = line.split("=", 1)[1].strip()

headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}

resp = requests.get("https://api.cloudflare.com/client/v4/zones", headers=headers)
zones = resp.json().get("result", [])
if not zones:
    print("No zones found for this token.")
else:
    for z in zones:
        print(f"Zone: {z['name']} (ID: {z['id']})")
        # List DNS records for this zone
        dns_resp = requests.get(f"https://api.cloudflare.com/client/v4/zones/{z['id']}/dns_records", headers=headers)
        for r in dns_resp.json().get("result", []):
            print(f"  {r['type']} {r['name']} -> {r['content']} (Proxied: {r.get('proxied', False)})")
