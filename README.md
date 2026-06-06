# 5t4t1cV01d — HTB Portfolio

Portafolio personal tipo cyberpunk/hacker, enfocado en Hack The Box.

## 🚀 Deploy en GitHub Pages (5 minutos)

### 1. Crea el repositorio

```bash
# En GitHub: crea un repo llamado "5t4t1cV01d.github.io" (o cualquier nombre)
# Opción A: tu sitio principal
# Repo name: 5t4t1cV01d.github.io → url: https://5t4t1cV01d.github.io

# Opción B: subdirectorio
# Repo name: portfolio → url: https://5t4t1cV01d.github.io/portfolio
```

### 2. Sube los archivos

```bash
git init
git add .
git commit -m "feat: initial portfolio deploy"
git branch -M main
git remote add origin https://github.com/5t4t1cV01d/5t4t1cV01d.github.io.git
git push -u origin main
```

### 3. Activa GitHub Pages

- Ve a **Settings → Pages**
- Source: **Deploy from a branch**
- Branch: **main** / `/ (root)`
- Guarda y espera ~2 minutos
- Tu sitio estará en `https://5t4t1cV01d.github.io`

---

## 📁 Estructura del proyecto

```
portfolio/
├── index.html                  # Página principal
├── pages/
│   ├── writeups.html           # Baúl de writeups con filtros
│   ├── about.html              # Sobre mí, CV, certs, timeline
│   ├── projects.html           # Dashboard de proyectos, laboratorios y certs
│   └── writeup.html            # Visor único de writeups dinámico
├── components/
│   ├── navbar.html             # Componente de navegación
│   └── footer.html             # Componente de pie de página
├── assets/
│   ├── css/style.css           # Todos los estilos
│   ├── icon/                   # Iconos oficiales (HTB, THM, Docker, favicon)
│   ├── img/                    # Imagen del avatar (5t4t1cV01d.jpeg) y logos Cisco
│   └── js/
│       ├── writeups-data.js    # ← EDITA AQUÍ para registrar máquinas
│       ├── main.js             # Lógica de filtros y animaciones
│       ├── components.js       # Cargador de navbar, footer y efectos
│       └── writeup-renderer.js # Cargador y renderizador de Markdown
└── _writeups/                  # Los archivos MD de tus writeups (¡edita aquí!)
    ├── htb-cicada.md
    ├── htb-lame.md
    └── htb-bounty.md
```

---

## ➕ Añadir una nueva máquina

### Paso 1: Registra la máquina en `assets/js/writeups-data.js`

```javascript
const WRITEUPS = [
  // ... máquinas existentes ...
  {
    id: "htb-miMaquina",
    title: "MiMaquina",
    platform: "HTB",        // HTB | THM | DockerLabs
    difficulty: "easy",     // easy | medium | hard
    os: "linux",            // linux | windows
    date: "2025-12-01",
    tags: ["Tag1", "Tag2", "Tag3"],
    desc: "Descripción breve de la máquina y vector de ataque."
  }
];
```

### Paso 2: Crea el writeup en Markdown en `_writeups/htb-miMaquina.md`

Crea un archivo markdown con una cabecera YAML (front matter) al inicio. Ejemplo:

```markdown
---
title: "MiMaquina"
platform: HTB
difficulty: easy
so: Linux
fecha: 2025-12-01
tags: [Tag1, Tag2]
desc: "Descripción breve."
---

# MiMaquina — HackTheBox

## Reconocimiento
... contenido de tu writeup en markdown normal ...
```

### Paso 3: Haz push

```bash
git add .
git commit -m "writeup: añadir MiMaquina (HTB/Fácil/Linux)"
git push
```

---

## 🎨 Personalización

| Archivo | Qué cambiar |
|---------|-------------|
| `assets/css/style.css` | Colores (variables CSS en `:root`) |
| `assets/js/writeups-data.js` | Máquinas, plataformas, fechas |
| `pages/about.html` | Bio, skills, certs, timeline |
| `pages/projects.html` | Stats de plataformas (HTB, THM, DockerLabs), certificaciones y metas |

### Cambiar colores principales

En `style.css`, líneas 5-25:

```css
:root {
  --green: #00ff41;    /* Verde neón principal */
  --green-dim: #00cc33;/* Verde atenuado */
  /* cambia el verde y el tema entero cambia */
}
```

---

## 🖥️ Desarrollo local — Ver y editar en tiempo real

El proyecto es HTML/CSS/JS puro, así que no necesitas instalar compiladores ni herramientas complejas. Para correrlo localmente:

---

### Opción A — Python 3 y Git Bash (Recomendada para Windows y Linux)

Si utilizas **Windows**, descarga e instala [Git Bash](https://gitforwindows.org/) y [Python 3](https://www.python.org/downloads/). En Linux/Kali Linux, estas herramientas ya vienen preinstaladas por defecto.

1. Abre una terminal de **Git Bash** (o tu consola de comandos habitual) en la raíz del proyecto.
2. Ejecuta el siguiente comando para levantar el servidor web local en el puerto 8080:
   ```bash
   python -m http.server 8080
   ```
   *(Nota: Dependiendo de tu sistema operativo y de tu alias de instalación, el comando puede ser `python` o `python3`).*
3. Abre tu navegador de preferencia e ingresa a: **http://localhost:8080**
4. Para detener el servidor, simplemente presiona `Ctrl + C` en la terminal.

> **Flujo de trabajo:** Deja el servidor corriendo en la terminal, edita los archivos en tu editor preferido (como VS Code) y recarga la página en tu navegador (`F5` o `Ctrl+R`) para ver los cambios en tiempo real.

---

### Opción B — Node.js con recarga automática (la más cómoda)

Si tienes Node.js instalado, puedes usar `browser-sync` que recarga el navegador automáticamente cada vez que guardas un archivo — sin tocar `F5`.

```bash
# Instala browser-sync una sola vez (global)
npm install -g browser-sync

# Entra a la carpeta y lanza
browser-sync start --server --files "**/*.html, assets/css/*.css, assets/js/*.js"
```

Se abre solo en: **http://localhost:3000**

> ✨ Cada vez que guardes un `.html`, `.css` o `.js`, el navegador se recarga solo. Ideal para editar estilos o writeups en tiempo real.

**¿No tienes Node.js?** Instálalo en Kali con:

```bash
sudo apt update && sudo apt install nodejs npm -y
node --version   # verifica instalación
```

---

### Opción C — VS Code con Live Server (si usas VS Code)

1. Abre VS Code con la carpeta del proyecto.
2. Instala la extensión **Live Server** (busca `ritwickdey.liveserver` en el panel de extensiones).
3. Haz clic en **"Go Live"** en la barra inferior derecha de VS Code.
4. Se abre en: **http://localhost:5500**

> Al igual que browser-sync, recarga automáticamente al guardar. Perfecto si ya usas VS Code como editor principal.

---

### Flujo de trabajo recomendado (terminal dividida)

El setup ideal mientras editas writeups o modificas el diseño:

```
┌─────────────────────────┬──────────────────────────────┐
│  Terminal 1             │  Terminal 2                  │
│  (servidor corriendo)   │  (tu editor / comandos git)  │
│                         │                              │
│  $ python -m http.      │  $ nano pages/about.html     │
│    server 8080          │  $ git add . && git commit   │
│                         │  $ git push                  │
└─────────────────────────┴──────────────────────────────┘
          ↕ Navegador abierto en http://localhost:8080
```

O con `tmux` (que ya tienes en Kali):

```bash
# Abre tmux
tmux

# Panel izquierdo: servidor
python -m http.server 8080

# Divide la pantalla (Ctrl+B, luego %)
# Panel derecho: edición
nano assets/js/writeups-data.js
```

---

### ⚡ Cheatsheet rápido

| Comando | Para qué sirve |
|---------|---------------|
| `python -m http.server 8080` | Servidor simple en puerto 8080 |
| `python -m http.server 8080 &` | Servidor en background (libera la terminal en Linux) |
| `kill %1` | Mata el servidor que corre en background (en Linux) |
| `browser-sync start --server --files "**/*"` | Servidor con auto-recarga |
| `Ctrl+C` | Detener cualquier servidor |

---

## 📝 Notas

- El proyecto es HTML/CSS/JS puro — sin frameworks, sin build step.
- Los archivos `.md` en `_writeups/` son de referencia para tus notas.
- Los writeups en producción son archivos `.html` en `pages/`.
- Para GitHub Pages NO necesitas Jekyll ni ningún generador de sitios estáticos.

---

*5t4t1cV01d · Mérida, Yucatán · 2026*
