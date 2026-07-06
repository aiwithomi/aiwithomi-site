import os
import requests
import json
from pathlib import Path

env_file = Path("/Users/OmisPersonal/aiwithomi-site/.env")
token = None
account_id = None
for line in env_file.read_text().splitlines():
    if line.startswith("CLOUDFLARE_API_TOKEN="):
        token = line.split("=", 1)[1].strip()
    if line.startswith("CLOUDFLARE_ACCOUNT_ID="):
        account_id = line.split("=", 1)[1].strip()

headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}

# Try getting zones for the specific account
zones_resp = requests.get(f"https://api.cloudflare.com/client/v4/zones?account.id={account_id}", headers=headers)
print("Zones:")
for z in zones_resp.json().get("result", []):
    print(f"  {z['name']}")

