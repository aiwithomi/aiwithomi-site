import os
import requests
import json
from pathlib import Path

env_file = Path("/Users/OmisPersonal/aiwithomi-site/.env")
token = None
for line in env_file.read_text().splitlines():
    if line.startswith("CLOUDFLARE_API_TOKEN="):
        token = line.split("=", 1)[1].strip()

if not token:
    print("Token not found")
    exit(1)

headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}

# 1. Get zones to find aiwithomi.com
zones_resp = requests.get("https://api.cloudflare.com/client/v4/zones", headers=headers)
if zones_resp.status_code != 200:
    print(f"Failed to get zones: {zones_resp.text}")
    exit(1)

zones = zones_resp.json().get("result", [])
zone_id = None
for z in zones:
    if z["name"] == "aiwithomi.com":
        zone_id = z["id"]
        break

if not zone_id:
    print("aiwithomi.com zone not found in account")
    exit(1)

print(f"Found Zone ID: {zone_id}")

# 2. Check DNS records for aiwithomi.com
dns_resp = requests.get(f"https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records", headers=headers)
print("\nDNS Records:")
for record in dns_resp.json().get("result", []):
    print(f"  {record['type']} {record['name']} -> {record['content']} (proxied: {record.get('proxied')})")

