import requests
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

# Add aiwithomi.com
resp1 = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/aiwithomi-site/domains", 
    headers=headers,
    json={"name": "aiwithomi.com"}
)
print("Add aiwithomi.com:", resp1.status_code, resp1.text)

# Add www.aiwithomi.com
resp2 = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/aiwithomi-site/domains", 
    headers=headers,
    json={"name": "www.aiwithomi.com"}
)
print("Add www.aiwithomi.com:", resp2.status_code, resp2.text)

