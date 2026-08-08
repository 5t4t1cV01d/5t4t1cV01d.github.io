// ============================================================
//  WRITEUPS DATA — Edit here to add new machines
//  Each object = one solved machine
// ============================================================
const WRITEUPS = [
  {
    id: "htb-armsrace",
    title: "ARMs Race",
    platform: "HTB",
    type: "challenge",
    locked: true,
    difficulty: "easy",
    os: null,
    date: "2026-07-23",
    release_date: "2024-02-16",
    completed_date: "2026-07-23",
    avatar: "/assets/icon/HTB-Reversing.svg",
    tags: ["Reversing", "ARM", "Unicorn Engine"],
    desc: "Automated solve of a 50-level timed ARM opcode challenge using Unicorn Engine emulation to compute register r0 within a strict server-imposed timeout."
  },
  /*this is a test in tha block machine or challenge*/
  {
    id: "htb-lame",
    title: "Lame",
    platform: "HTB",
    type: "machine",
    locked: true,
    difficulty: "easy",
    os: "linux",
    date: "2025-05-15",
    release_date: "2007-05-15",
    completed_date: "2025-05-15",
    avatar: "https://htb-mp-prod-public-storage.s3.eu-central-1.amazonaws.com/avatars/fb2d9f98400e3c802a0d7145e125c4ff.png",
    tags: ["Samba", "CVE-2007-2447", "Metasploit"],
    desc: "Exploitation of the famous CVE-2007-2447 bug in Samba 3.0.20 to obtain a root shell directly."
  },
  {
    id: "htb-wingdata",
    title: "WingData",
    platform: "HTB",
    type: "machine",
    difficulty: "easy",
    os: "linux",
    date: "2026-04-23",
    release_date: "2026-02-14",
    completed_date: "2026-04-23",
    avatar: "https://htb-mp-prod-public-storage.s3.eu-central-1.amazonaws.com/avatars/d419202507a3bbf06e764c1c4a524f66.png",
    tags: ["CVE-2025-47812", "Lua", "CVE-2025-4517"],
    desc: "Unauthenticated RCE in Wing FTP Server v7.4.3 (CVE-2025-47812) and privilege escalation abusing python tar extraction (CVE-2025-4517)."
  },
];

// Helpers
const OS_ICONS = {
  linux: '<i class="fa-brands fa-linux"></i>',
  windows: '<i class="fa-brands fa-windows"></i>'
};
const DIFF_MAP = { easy: "Easy", medium: "Medium", hard: "Hard" };
const PLAT_CLASS = { HTB: "plat-htb", THM: "plat-thm", DockerLabs: "plat-docker" };
const PLAT_LOGOS = {
  HTB: "Hackthebox-Logo.svg",
  THM: "Tryhackme-Logo.svg",
  DockerLabs: "Docker-Logo.svg"
};
