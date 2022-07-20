import requests
import sys

subdomains = open("subdomains.txt").read().splitlines()

for sub in subdomains:
    sub_domain = f"http://{sub}.{sys.argv[1]}"
    try:
        requests.get("sub_domain")
    except requests.ConnectionError:
        pass

    else:
        print("Valid Domain: ", sub_domain)
