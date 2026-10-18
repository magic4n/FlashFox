<div align="center">

  <!-- Animated / Styled Header Badge -->
  <img src="https://img.shields.io/badge/🦊_FlashFox-WebUSB_Fastboot_Suite-FF4136?style=for-the-badge&labelColor=FF8008" alt="FlashFox Banner" height="38" />

  <h1>🦊 FlashFox</h1>
  <p>
    <strong>A modern, zero-dependency, 3-file WebUSB Fastboot client & interactive terminal directly in your browser.</strong>
  </p>

  <!-- Status & Tech Stack Badges -->
  <p>
    <a href="#-features"><img src="https://img.shields.io/badge/Framework-Vanilla_JS_(Zero_Deps)-FF7A00?style=flat-square&logo=javascript&logoColor=white" alt="Vanilla JS" /></a>
    <a href="#-architecture"><img src="https://img.shields.io/badge/Architecture-3_Files_SPA-FF4136?style=flat-square" alt="3 Files Architecture" /></a>
    <a href="#-browser-compatibility"><img src="https://img.shields.io/badge/API-WebUSB-E60039?style=flat-square&logo=googlechrome&logoColor=white" alt="WebUSB" /></a>
    <a href="#-localization"><img src="https://img.shields.io/badge/i18n-EN_%7C_RU-FF8008?style=flat-square" alt="Localization" /></a>
    <a href="#-license"><img src="https://img.shields.io/badge/License-MIT-1D1412?style=flat-square" alt="License" /></a>
  </p>

  <p>
    <a href="#-key-features">Features</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-console-commands">Console Guide</a> •
    <a href="#-usb-driver-setup">USB Setup</a> •
    <a href="#-project-structure">Structure</a>
  </p>
</div>

---

## 🔥 Overview

**FlashFox** is a lightweight, standalone Single-Page Application (SPA) that brings the full power of the Android `fastboot` protocol to your web browser using the **WebUSB API**. 

Built on a clean, pure JavaScript port of the `Fastboot.js-Next` core engine, FlashFox requires **no React, no Vue, no build step, and no `node_modules`**. The entire application—including the Android Sparse image splitter, WebUSB packet transport, custom SVG icon engine, and bilingual UI—lives inside just **3 static files** (`index.html`, `style.css`, `app.js`).

---

## ✨ Key Features

- ⚡ **Pure 3-File Architecture** — Zero frameworks, zero bundlers. Drop `index.html`, `style.css`, and `app.js` onto any static host (GitHub Pages, Cloudflare Pages, Vercel) or run locally out of the box.
- 💻 **Full Interactive Fastboot Console** — Real-time `INFO`, `TEXT`, `OKAY`, and `FAIL` bootloader output with smooth auto-scrolling, command history navigation (`↑` / `↓` arrow keys), one-click quick command chips, and automatic command normalization.
- 📦 **Smart Android Sparse Image Splitter** — Automatically detects and splits oversized `.img` files (such as `super.img`, `system.img`, or `vendor.img`) on the fly in memory to respect the device's `max-download-size` limit.
- 🔀 **A/B Slot & Userspace (`fastbootd`) Aware** — Automatically resolves slotted partitions (`_a` / `_b`), switches active boot slots, and resizes logical partitions when flashing in `fastbootd` mode.
- 🚀 **Live RAM Boot (`fastboot boot`)** — Download and boot custom kernels or recovery images (`twrp.img`, `magisk_patched.img`) directly into RAM without permanently overwriting partitions.
- 🌐 **Instant Localization (`EN` / `RU`)** — Full English and Russian translation with an animated globe switcher in the bottom dock and persistent `localStorage` state.
- 🎨 **Modern Signature UI** — Crafted with a custom White / Orange / Crimson gradient aesthetic, floating background orbs, custom JS-injected SVG icons, and a responsive bottom navigation dock.

---

## 🚀 Quick Start

Because the browser **WebUSB API** requires a [Secure Context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts), FlashFox must be served over **`https://`** or **`http://localhost`** (opening `index.html` via `file://` will block USB access).

### 1. Clone the repository
```bash
git clone https://github.com/your-username/FlashFox.git
cd FlashFox
```

### 2. Run with any local static server

Choose whichever tool you already have installed:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve .

# Using PHP
php -S localhost:8000
```

Open **`http://localhost:8000`** in a Chromium-based browser (Chrome, Edge, Brave, or Opera) and click **Connect Device**.

---

## 🖥️ Console Commands

FlashFox's interactive terminal accepts both standard CLI-style syntax and raw Fastboot wire commands. Adding a leading `fastboot ` prefix is optional (it is stripped automatically).

| Command | Description |
| :--- | :--- |
| `help` / `?` | Print the built-in command reference in the terminal |
| `clear` / `cls` | Clear the terminal viewport |
| `getvar all` | Read and display all bootloader variables |
| `getvar <name>` | Read a specific variable (e.g., `getvar product`, `getvar current-slot`) |
| `oem <command>` | Run an OEM-specific command (e.g., `oem device-info`, `oem unlock`) |
| `flashing get_unlock_ability` | Check if the bootloader allows unlocking |
| `flashing unlock` / `lock` | Unlock or lock the device bootloader |
| `erase <partition>` | Erase a partition (e.g., `erase userdata`, `erase metadata`) |
| `set_active <a\|b>` | Set the active A/B boot slot (`set_active a` or `set_active b`) |
| `reboot` | Reboot normally into the Android OS |
| `reboot bootloader` | Reboot back into the bootloader |
| `reboot fastboot` | Reboot into userspace `fastbootd` |
| `reboot recovery` | Reboot into Recovery mode |

---

## 🔌 USB Driver Setup

### 🪟 Windows
Make sure the **Google USB Driver** (or WinUSB via [Zadig](https://zadig.akeo.ie/)) is installed when your phone is in Fastboot mode. Also ensure no background `fastboot.exe` / `adb.exe` process is holding the USB interface exclusively.

### 🐧 Linux
On Linux, `udev` rules are required so your browser can access the USB device without `root` privileges. Create `/etc/udev/rules.d/51-android.rules`:
```ini
SUBSYSTEM=="usb", ENV{DEVTYPE}=="usb_device", ATTR{idVendor}=="18d1", MODE="0666", GROUP="plugdev"
```
*(Replace `18d1` with your device vendor ID if needed, then run `sudo udevadm control --reload-rules && sudo udevadm trigger`).*

### 🍎 macOS & 🤖 Android (OTG)
Works out of the box—no additional drivers required!

---

## 📂 Project Structure

FlashFox is intentionally engineered to stay within **3 clean, readable files**:

```text
FlashFox/
├── index.html   # Semantic SPA layout, Bottom Dock, Console, Flash & Info views
├── style.css    # White/Orange/Crimson gradient theme, animations & custom scrollbars
└── app.js       # Fastboot WebUSB engine + Sparse splitter + SVG icons + i18n (RU/EN)
```

### Core Modules Inside `app.js`
1. **`SVG_ICONS` & `FOX_LOGO_SVG`** — Zero-external-asset vector icon registry injected on DOM load.
2. **`I18N` Dictionary** — Full reactive string localization for English (`en`) and Russian (`ru`).
3. **WebUSB Transport (`WebUsbTransport`)** — Bulk endpoint discovery, packet reading/writing, and ADB-mode detection (`FastbootAdbModeError`).
4. **Sparse Image Engine (`WindowedReader`, `splitImage`)** — Parses `0xed26ff3a` Android Sparse headers and dynamically chunks raw or sparse blobs to fit bootloader memory limits.
5. **Protocol Controller (`FastbootDevice`)** — Exclusive command queue, variable parsing, partition slot resolution, and download/flash state machine.

---

## 🌐 Browser Compatibility

| Browser | Supported | Notes |
| :--- | :---: | :--- |
| **Google Chrome / Chromium** | ✅ Yes | v61+ (Desktop & Android OTG) |
| **Microsoft Edge** | ✅ Yes | v79+ (Chromium-based) |
| **Brave / Opera / Vivaldi** | ✅ Yes | Full WebUSB support |
| **Firefox / Safari** | ❌ No | Does not implement the WebUSB standard |

---

## 📜 Credits & License

- Core Fastboot protocol & sparse logic ported from **Fastboot.js-Next**.
- Released under the **MIT License**. Feel free to fork, customize, and deploy!