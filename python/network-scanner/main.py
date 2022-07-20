from scapy.all import *

interface = "eth0"
ip_range = "10.10.100.17/24"
broadcastMac = "ff:ff:ff:ff:ff:ff"

packet = Ether(dst=broadcastMac)/ARP(pdst=ip_range)

ans, unans = srp(packet, timeout=2, iface=interface, inter=0.1)

for send, recieve in ans:
    print(recieve.sprintf(r"%Ether.src% - %ARP.psrc%"))
