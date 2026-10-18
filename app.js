/**
 * ============================================================================
 * FlashFox — Standalone Vanilla JS WebUSB Fastboot Application
 * Включает полный порт ядра Fastboot.js-Next (errors, transport, usb, sparse, device)
 * + Кастомные SVG-иконки на JS + RU/EN локализацию + Интерактивную консоль
 * ============================================================================
 */

/* ============================================================================
   1. КАСТОМНЫЕ SVG-ИКОНКИ (Генерируются и внедряются через JS)
   ============================================================================ */
const FOX_LOGO_SVG = `
<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
  <path d="M5 6L12.5 14.5L18 11L23.5 14.5L31 6L28.5 22.5L18 31L7.5 22.5L5 6Z" fill="white" fill-opacity="0.95"/>
  <path d="M18 11L12.5 14.5L10.5 22L18 31L25.5 22L23.5 14.5L18 11Z" fill="#FFE3D3"/>
  <path d="M16 25.5L18 28L20 25.5H16Z" fill="#1D1412"/>
  <circle cx="13.5" cy="19.5" r="1.6" fill="#1D1412"/>
  <circle cx="22.5" cy="19.5" r="1.6" fill="#1D1412"/>
</svg>`;

const SVG_ICONS = {
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>`,
  terminal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="4 17 10 11 4 5"/>
    <line x1="12" y1="19" x2="20" y2="19"/>
  </svg>`,
  bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>`,
  usb: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="10" cy="7" r="1"/>
    <circle cx="4" cy="20" r="1"/>
    <path d="M4.7 19.3 19 5"/>
    <path d="m21 3-3 1 2 2Z"/>
    <path d="M9.26 7.68 5 12l2 5"/>
    <path d="m10 14 5 2 3.5-3.5"/>
    <path d="m18 12 1-1 1 1-1 1Z"/>
  </svg>`,
  send: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>`,
  copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>`,
  upload: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>`,
  play: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>`,
  power: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
    <line x1="12" y1="2" x2="12" y2="12"/>
  </svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>`,
  cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
    <rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
    <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
    <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
    <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
  </svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>`,
  refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="23 4 23 10 17 10"/>
    <polyline points="1 20 1 14 7 14"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
  </svg>`
};

function renderAllIcons() {
  const logoEl = document.getElementById("fox-logo");
  if (logoEl) logoEl.innerHTML = FOX_LOGO_SVG;

  document.querySelectorAll(".icon-slot[data-icon]").forEach((slot) => {
    const name = slot.getAttribute("data-icon");
    if (SVG_ICONS[name]) {
      slot.innerHTML = SVG_ICONS[name];
    }
  });
}

/* ============================================================================
   2. ПОЛНАЯ ДВУЯЗЫЧНАЯ ЛОКАЛИЗАЦИЯ (RU / EN)
   ============================================================================ */
const I18N = {
  ru: {
    "app.subtitle": "WebUSB Fastboot Инструментарий",
    "status.disconnected": "Не подключено",
    "status.connected": "Подключено",
    "status.busy": "Выполняется...",
    "btn.connect": "Подключить",
    "btn.disconnect": "Отключить",
    "nav.console": "Консоль",
    "nav.flash": "Прошивка",
    "nav.info": "Устройство",
    "tabs.console": "Интерактивная Fastboot Консоль",
    "console.copy": "Копировать",
    "console.clear": "Очистить",
    "console.run": "Выполнить",
    "console.quick": "Быстрые команды:",
    "console.placeholder": "Введите команду (например: getvar all, oem device-info, reboot, help)...",
    "console.welcome": "Добро пожаловать в FlashFox! Подключите смартфон в режиме Fastboot (Bootloader) по USB или введите 'help' для списка команд.",
    "console.helpText": [
      "Доступные консольные команды FlashFox:",
      "  • getvar <имя | all>         — чтение переменной (можно писать 'getvar all' или 'getvar:all')",
      "  • oem <команда>              — выполнение OEM-команды (например: oem device-info)",
      "  • flashing <unlock | lock>   — управление блокировкой загрузчика",
      "  • erase <раздел>             — очистка раздела (например: erase userdata)",
      "  • set_active <a | b>         — смена активного слота",
      "  • reboot [bootloader|fastboot|recovery] — перезагрузка устройства",
      "  • clear                      — очистить экран терминала",
      "  * Также можно вводить команды с префиксом 'fastboot ' (он убирается автоматически)."
    ].join("\n"),
    "flash.title": "Прошивка и загрузка (.img)",
    "flash.partitionLabel": "Целевой раздел (Partition)",
    "flash.slotCurrent": "Текущий слот",
    "flash.slotOther": "Другой слот",
    "flash.fileLabel": "Образ прошивки (.img / Sparse)",
    "flash.dropzone": "Выберите .img файл или перетащите его сюда",
    "flash.dropzoneSub": "Поддерживается автоматическая нарезка больших образов (Android Sparse)",
    "flash.btnFlash": "Прошить раздел",
    "flash.btnBoot": "Загрузить (Boot в RAM)",
    "flash.btnErase": "Стереть раздел",
    "power.title": "Управление питанием и слотами",
    "power.rebootDesc": "Мгновенная перезагрузка устройства в нужный режим:",
    "power.rebootSystem": "Система (System)",
    "power.rebootBootloader": "Загрузчик (Bootloader)",
    "power.rebootFastbootd": "Fastbootd (Userspace)",
    "power.rebootRecovery": "Рекавери (Recovery)",
    "power.slotDesc": "Переключение активного слота A/B:",
    "power.setSlotA": "Активировать Slot A",
    "power.setSlotB": "Активировать Slot B",
    "info.title": "Параметры загрузчика (GetVar)",
    "info.refresh": "Обновить всё",
    "info.product": "Продукт (Product)",
    "info.serial": "Серийный номер",
    "info.slot": "Текущий слот",
    "info.unlocked": "Разблокирован",
    "info.mode": "Режим",
    "info.maxDownload": "Макс. буфер",
    "info.searchPlaceholder": "Поиск переменной (например: partition-size, battery, version)...",
    "info.colVar": "Переменная",
    "info.colVal": "Значение",
    "info.empty": "Подключите устройство и нажмите «Обновить всё», чтобы загрузить таблицу переменных.",
    "msg.noWebUsb": "Ваш браузер не поддерживает WebUSB! Используйте Chrome, Edge или Opera по HTTPS / localhost.",
    "msg.needConnect": "Сначала подключите устройство по USB.",
    "msg.needFile": "Сначала выберите .img файл для прошивки или загрузки.",
    "msg.needPartition": "Укажите имя раздела.",
    "msg.copied": "Логи консоли скопированы в буфер обмена."
  },
  en: {
    "app.subtitle": "WebUSB Fastboot Suite",
    "status.disconnected": "Disconnected",
    "status.connected": "Connected",
    "status.busy": "Busy...",
    "btn.connect": "Connect Device",
    "btn.disconnect": "Disconnect",
    "nav.console": "Console",
    "nav.flash": "Flash & Tools",
    "nav.info": "Device Info",
    "tabs.console": "Interactive Fastboot Console",
    "console.copy": "Copy Log",
    "console.clear": "Clear",
    "console.run": "Execute",
    "console.quick": "Quick Commands:",
    "console.placeholder": "Enter fastboot command (e.g., getvar all, oem device-info, reboot, help)...",
    "console.welcome": "Welcome to FlashFox! Connect your phone in Fastboot (Bootloader) mode via USB or type 'help' to see available commands.",
    "console.helpText": [
      "Available FlashFox Console Commands:",
      "  • getvar <name | all>        — read bootloader variable ('getvar all' or 'getvar:all')",
      "  • oem <command>              — run OEM command (e.g., oem device-info)",
      "  • flashing <unlock | lock>   — bootloader lock management",
      "  • erase <partition>          — erase a partition (e.g., erase userdata)",
      "  • set_active <a | b>         — switch active A/B slot",
      "  • reboot [bootloader|fastboot|recovery] — reboot device",
      "  • clear                      — clear terminal output",
      "  * Leading 'fastboot ' prefix is automatically stripped if typed."
    ].join("\n"),
    "flash.title": "Flash & Boot Image (.img)",
    "flash.partitionLabel": "Target Partition",
    "flash.slotCurrent": "Current Slot",
    "flash.slotOther": "Other Slot",
    "flash.fileLabel": "Firmware Image (.img / Sparse)",
    "flash.dropzone": "Choose an .img file or drag & drop it here",
    "flash.dropzoneSub": "Automatic splitting for large images (Android Sparse format)",
    "flash.btnFlash": "Flash Partition",
    "flash.btnBoot": "Boot Image (RAM)",
    "flash.btnErase": "Erase Partition",
    "power.title": "Power & A/B Slots",
    "power.rebootDesc": "Reboot connected device into target mode:",
    "power.rebootSystem": "System (Android)",
    "power.rebootBootloader": "Bootloader",
    "power.rebootFastbootd": "Fastbootd (Userspace)",
    "power.rebootRecovery": "Recovery",
    "power.slotDesc": "Switch active A/B boot slot:",
    "power.setSlotA": "Set Active: Slot A",
    "power.setSlotB": "Set Active: Slot B",
    "info.title": "Bootloader Variables (GetVar)",
    "info.refresh": "Refresh All",
    "info.product": "Product",
    "info.serial": "Serial Number",
    "info.slot": "Active Slot",
    "info.unlocked": "Unlocked",
    "info.mode": "Fastboot Mode",
    "info.maxDownload": "Max Download",
    "info.searchPlaceholder": "Filter variables (e.g., partition-size, battery, version)...",
    "info.colVar": "Variable",
    "info.colVal": "Value",
    "info.empty": "Connect a device and click 'Refresh All' to read bootloader variables.",
    "msg.noWebUsb": "WebUSB is not supported in this browser! Please use Chromium/Chrome/Edge over HTTPS or localhost.",
    "msg.needConnect": "Please connect a Fastboot device first.",
    "msg.needFile": "Please select an .img file first.",
    "msg.needPartition": "Please specify a partition name.",
    "msg.copied": "Console logs copied to clipboard."
  }
};

let currentLang = localStorage.getItem("flashfox_lang") || "ru";

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || key;
}

function applyLocalization() {
  document.documentElement.lang = currentLang;
  const langLabel = document.getElementById("lang-label");
  if (langLabel) langLabel.textContent = currentLang.toUpperCase();

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    // Не перезаписываем имя файла в дропзоне, если файл уже выбран
    if (el.id === "dropzone-title" && selectedImageFile) return;
    el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", t(key));
  });

  updateConnectionUI();
  updateDockIndicator();
}

/* ============================================================================
   3. ЯДРО FASTBOOT.JS-NEXT (Полный порт src/fastboot -> Чистый JS)
   ============================================================================ */

// --- errors.ts ---
class FastbootError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = new.target.name;
  }
}

class FastbootCommandError extends FastbootError {
  constructor(command, reason) {
    super(`"${command}" failed: ${reason || "(no reason given)"}`);
    this.command = command;
    this.reason = reason;
  }
}

class FastbootProtocolError extends FastbootError {}
class FastbootUsbError extends FastbootError {}

class FastbootAdbModeError extends FastbootUsbError {
  constructor() {
    super("The device is booted into Android (ADB mode), not fastboot. Reboot it into the bootloader first.");
  }
}

class FastbootImageError extends FastbootError {}

class FastbootAbortError extends FastbootError {
  constructor() {
    super("Operation cancelled");
  }
}

function throwIfAborted(signal) {
  if (signal && signal.aborted) throw new FastbootAbortError();
}

// --- transport.ts ---
const FASTBOOT_USB_FILTER = {
  classCode: 0xff,
  subclassCode: 0x42,
  protocolCode: 0x03
};

const ADB_USB_FILTER = {
  classCode: 0xff,
  subclassCode: 0x42,
  protocolCode: 0x01
};

function hasInterface(device, filter) {
  return device.configurations.some((configuration) =>
    configuration.interfaces.some((iface) =>
      iface.alternates.some(
        (alternate) =>
          alternate.interfaceClass === filter.classCode &&
          alternate.interfaceSubclass === filter.subclassCode &&
          alternate.interfaceProtocol === filter.protocolCode
      )
    )
  );
}

function isAdbDevice(device) {
  return hasInterface(device, ADB_USB_FILTER);
}

function findFastbootInterface(device) {
  for (const configuration of device.configurations) {
    for (const iface of configuration.interfaces) {
      for (const alternate of iface.alternates) {
        if (
          alternate.interfaceClass !== FASTBOOT_USB_FILTER.classCode ||
          alternate.interfaceSubclass !== FASTBOOT_USB_FILTER.subclassCode ||
          alternate.interfaceProtocol !== FASTBOOT_USB_FILTER.protocolCode
        ) {
          continue;
        }
        const bulk = alternate.endpoints.filter((e) => e.type === "bulk");
        const endpointIn = bulk.find((e) => e.direction === "in");
        const endpointOut = bulk.find((e) => e.direction === "out");
        if (endpointIn && endpointOut) {
          return { configuration, iface, alternate, endpointIn, endpointOut };
        }
      }
    }
  }
  return null;
}

function isFastbootDevice(device) {
  return findFastbootInterface(device) !== null;
}

function isWebUsbSupported() {
  return typeof navigator !== "undefined" && "usb" in navigator;
}

function describeError(error) {
  return error instanceof Error ? error.message : String(error);
}

class WebUsbTransport {
  constructor(device, interfaceNumber, endpointIn, endpointOut, readLength) {
    this.device = device;
    this.interfaceNumber = interfaceNumber;
    this.endpointIn = endpointIn;
    this.endpointOut = endpointOut;
    this.readLength = readLength;
  }

  static async open(device) {
    const target = findFastbootInterface(device);
    if (!target) {
      throw new FastbootUsbError("The selected USB device does not expose a fastboot interface");
    }

    try {
      if (!device.opened) await device.open();
      if (!device.configuration || device.configuration.configurationValue !== target.configuration.configurationValue) {
        await device.selectConfiguration(target.configuration.configurationValue);
      }
      await device.claimInterface(target.iface.interfaceNumber);
      if (target.alternate.alternateSetting !== 0) {
        await device.selectAlternateInterface(target.iface.interfaceNumber, target.alternate.alternateSetting);
      }
    } catch (error) {
      await device.close().catch(() => {});
      throw new FastbootUsbError(`Unable to open the fastboot interface: ${describeError(error)}`, { cause: error });
    }

    return new WebUsbTransport(
      device,
      target.iface.interfaceNumber,
      target.endpointIn.endpointNumber,
      target.endpointOut.endpointNumber,
      Math.max(512, target.endpointIn.packetSize)
    );
  }

  async write(data) {
    const expected = data.byteLength;
    let result;
    try {
      result = await this.device.transferOut(this.endpointOut, data);
    } catch (error) {
      throw new FastbootUsbError(`USB write failed: ${describeError(error)}`, { cause: error });
    }
    if (result.status !== "ok" || result.bytesWritten !== expected) {
      if (result.status === "stall") await this.device.clearHalt("out", this.endpointOut).catch(() => {});
      throw new FastbootUsbError(`USB write failed: status=${result.status}, wrote ${result.bytesWritten}/${expected} bytes`);
    }
  }

  async read() {
    let result;
    try {
      result = await this.device.transferIn(this.endpointIn, this.readLength);
    } catch (error) {
      throw new FastbootUsbError(`USB read failed: ${describeError(error)}`, { cause: error });
    }
    if (result.status !== "ok" || !result.data) {
      if (result.status === "stall") await this.device.clearHalt("in", this.endpointIn).catch(() => {});
      throw new FastbootUsbError(`USB read failed: status=${result.status}`);
    }
    const { buffer, byteOffset, byteLength } = result.data;
    return new Uint8Array(buffer, byteOffset, byteLength);
  }

  async close() {
    if (!this.device.opened) return;
    await this.device.releaseInterface(this.interfaceNumber).catch(() => {});
    await this.device.close().catch(() => {});
  }
}

// --- usb.ts ---
function requestUsbDevice() {
  return navigator.usb.requestDevice({ filters: [FASTBOOT_USB_FILTER, ADB_USB_FILTER] });
}

async function openFastboot(usb) {
  if (!isFastbootDevice(usb) && isAdbDevice(usb)) throw new FastbootAdbModeError();
  return new FastbootDevice(await WebUsbTransport.open(usb));
}

// --- sparse.ts ---
const SPARSE_MAGIC = 0xed26ff3a;
const FILE_HEADER_SIZE = 28;
const CHUNK_HEADER_SIZE = 12;
const DEFAULT_BLOCK_SIZE = 4096;

const ChunkType = {
  Raw: 0xcac1,
  Fill: 0xcac2,
  DontCare: 0xcac3,
  Crc32: 0xcac4
};

class WindowedReader {
  constructor(blob, windowSize = 64 * 1024) {
    this.blob = blob;
    this.windowSize = windowSize;
    this.windowStart = 0;
    this.window = new Uint8Array(0);
  }

  async read(offset, length) {
    const end = offset + length;
    if (end > this.blob.size) {
      throw new FastbootImageError("Sparse image is truncated");
    }
    if (offset < this.windowStart || end > this.windowStart + this.window.byteLength) {
      const size = Math.max(length, this.windowSize);
      this.window = new Uint8Array(await this.blob.slice(offset, offset + size).arrayBuffer());
      this.windowStart = offset;
    }
    return new DataView(this.window.buffer, offset - this.windowStart, length);
  }
}

async function parseSparseHeader(blob) {
  if (blob.size < FILE_HEADER_SIZE) return null;
  const view = new DataView(await blob.slice(0, FILE_HEADER_SIZE).arrayBuffer());
  if (view.getUint32(0, true) !== SPARSE_MAGIC) return null;

  const major = view.getUint16(4, true);
  if (major !== 1) {
    throw new FastbootImageError(`Unsupported sparse image version ${major}`);
  }
  const header = {
    fileHeaderSize: view.getUint16(8, true),
    chunkHeaderSize: view.getUint16(10, true),
    blockSize: view.getUint32(12, true),
    totalBlocks: view.getUint32(16, true),
    totalChunks: view.getUint32(20, true)
  };
  if (header.fileHeaderSize < FILE_HEADER_SIZE || header.chunkHeaderSize < CHUNK_HEADER_SIZE) {
    throw new FastbootImageError("Sparse image has invalid header sizes");
  }
  if (header.blockSize === 0 || header.blockSize % 4 !== 0) {
    throw new FastbootImageError(`Sparse image has invalid block size ${header.blockSize}`);
  }
  return header;
}

async function readSparseChunks(blob, header) {
  const reader = new WindowedReader(blob);
  const chunks = [];
  let offset = header.fileHeaderSize;

  for (let i = 0; i < header.totalChunks; i++) {
    const view = await reader.read(offset, CHUNK_HEADER_SIZE);
    const type = view.getUint16(0, true);
    const blocks = view.getUint32(4, true);
    const totalSize = view.getUint32(8, true);
    const dataStart = offset + header.chunkHeaderSize;
    const dataSize = totalSize - header.chunkHeaderSize;

    if (dataSize < 0 || dataStart + dataSize > blob.size) {
      throw new FastbootImageError(`Sparse chunk ${i} is truncated`);
    }

    switch (type) {
      case ChunkType.Raw:
        if (dataSize !== blocks * header.blockSize) {
          throw new FastbootImageError(`Sparse raw chunk ${i} has size ${dataSize}, expected ${blocks * header.blockSize}`);
        }
        chunks.push({ type, blocks, data: blob.slice(dataStart, dataStart + dataSize) });
        break;
      case ChunkType.Fill:
        if (dataSize !== 4) throw new FastbootImageError(`Sparse fill chunk ${i} is malformed`);
        chunks.push({ type, blocks, data: blob.slice(dataStart, dataStart + 4) });
        break;
      case ChunkType.DontCare:
        chunks.push({ type, blocks, data: null });
        break;
      case ChunkType.Crc32:
        break;
      default:
        throw new FastbootImageError(`Sparse chunk ${i} has unknown type 0x${type.toString(16)}`);
    }
    offset += totalSize;
  }

  const blocks = chunks.reduce((sum, c) => sum + c.blocks, 0);
  if (blocks !== header.totalBlocks) {
    throw new FastbootImageError(`Sparse image covers ${blocks} blocks but its header declares ${header.totalBlocks}`);
  }
  return chunks;
}

async function imageSize(blob) {
  const header = await parseSparseHeader(blob);
  return header ? header.totalBlocks * header.blockSize : blob.size;
}

function getChunkDataSize(chunk) {
  return chunk.data ? chunk.data.size : 0;
}

function takeBlocks(chunk, from, count, blockSize) {
  if (chunk.type !== ChunkType.Raw || !chunk.data) return { ...chunk, blocks: count };
  return { type: chunk.type, blocks: count, data: chunk.data.slice(from * blockSize, (from + count) * blockSize) };
}

function encodeHeader(blockSize, totalBlocks, totalChunks) {
  const bytes = new Uint8Array(FILE_HEADER_SIZE);
  const view = new DataView(bytes.buffer);
  view.setUint32(0, SPARSE_MAGIC, true);
  view.setUint16(4, 1, true);
  view.setUint16(6, 0, true);
  view.setUint16(8, FILE_HEADER_SIZE, true);
  view.setUint16(10, CHUNK_HEADER_SIZE, true);
  view.setUint32(12, blockSize, true);
  view.setUint32(16, totalBlocks, true);
  view.setUint32(20, totalChunks, true);
  view.setUint32(24, 0, true);
  return bytes;
}

function encodeChunkHeader(type, blocks, payload) {
  const bytes = new Uint8Array(CHUNK_HEADER_SIZE);
  const view = new DataView(bytes.buffer);
  view.setUint16(0, type, true);
  view.setUint32(4, blocks, true);
  view.setUint32(8, CHUNK_HEADER_SIZE + payload, true);
  return bytes;
}

function encodeSparse(extents, totalBlocks, blockSize) {
  const parts = [];
  let position = 0;
  let count = 0;

  const skip = (blocks) => {
    parts.push(encodeChunkHeader(ChunkType.DontCare, blocks, 0));
    count++;
  };

  for (const { start, chunk } of extents) {
    if (start > position) skip(start - position);
    parts.push(encodeChunkHeader(chunk.type, chunk.blocks, getChunkDataSize(chunk)));
    if (chunk.data) parts.push(chunk.data);
    count++;
    position = start + chunk.blocks;
  }
  if (position < totalBlocks) skip(totalBlocks - position);

  return new Blob([encodeHeader(blockSize, totalBlocks, count), ...parts]);
}

function splitExtents(extents, totalBlocks, blockSize, maxSize) {
  const budget = maxSize - FILE_HEADER_SIZE - 2 * CHUNK_HEADER_SIZE;
  if (budget < CHUNK_HEADER_SIZE + blockSize) {
    throw new FastbootImageError(`Download size ${maxSize} is too small to split a sparse image`);
  }

  const files = [];
  let group = [];
  let used = 0;
  let end = 0;

  const flush = () => {
    files.push(encodeSparse(group, totalBlocks, blockSize));
    group = [];
    used = 0;
  };

  for (const extent of extents) {
    let { start, chunk } = extent;
    for (;;) {
      const gap = group.length > 0 && start > end ? CHUNK_HEADER_SIZE : 0;
      const cost = gap + CHUNK_HEADER_SIZE + getChunkDataSize(chunk);
      if (used + cost <= budget) {
        group.push({ start, chunk });
        used += cost;
        end = start + chunk.blocks;
        break;
      }
      if (chunk.type === ChunkType.Raw) {
        const fit = Math.floor((budget - used - gap - CHUNK_HEADER_SIZE) / blockSize);
        if (fit > 0) {
          group.push({ start, chunk: takeBlocks(chunk, 0, fit, blockSize) });
          flush();
          chunk = takeBlocks(chunk, fit, chunk.blocks - fit, blockSize);
          start += fit;
          continue;
        }
      }
      if (group.length === 0) throw new FastbootImageError("Sparse chunk does not fit in a single download");
      flush();
    }
  }
  if (group.length > 0 || files.length === 0) flush();
  return files;
}

function extentsOf(chunks) {
  const extents = [];
  let position = 0;
  for (const chunk of chunks) {
    if (chunk.type !== ChunkType.DontCare) extents.push({ start: position, chunk });
    position += chunk.blocks;
  }
  return extents;
}

async function splitImage(blob, maxDownloadSize) {
  if (blob.size <= maxDownloadSize) return [blob];

  const header = await parseSparseHeader(blob);
  if (header) {
    const chunks = await readSparseChunks(blob, header);
    return splitExtents(extentsOf(chunks), header.totalBlocks, header.blockSize, maxDownloadSize);
  }

  const blockSize = DEFAULT_BLOCK_SIZE;
  const totalBlocks = Math.ceil(blob.size / blockSize);
  const padding = totalBlocks * blockSize - blob.size;
  const data = padding > 0 ? new Blob([blob, new Uint8Array(padding)]) : blob;
  const raw = { type: ChunkType.Raw, blocks: totalBlocks, data };
  return splitExtents([{ start: 0, chunk: raw }], totalBlocks, blockSize, maxDownloadSize);
}

// --- device.ts ---
const MAX_COMMAND_LENGTH = 4096;
const FALLBACK_MAX_DOWNLOAD_SIZE = 256 * 1024 * 1024;
const WRITE_CHUNK_SIZE = 1024 * 1024;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const PARTITION_VARIABLES = /^(partition-size|partition-type|has-slot|is-logical|slot-successful|slot-unbootable|slot-retry-count):[^:]+/;

function parseVariableLine(line) {
  const prefix = PARTITION_VARIABLES.exec(line);
  const split = prefix ? prefix[0].length : line.indexOf(":");
  if (split <= 0 || line[split] !== ":") return null;
  return [line.slice(0, split).trim(), line.slice(split + 1).trim()];
}

class FastbootDevice {
  constructor(transport) {
    this.transport = transport;
    this.onMessage = null;
    this.queue = Promise.resolve();
    this.maxDownloadSize = null;
  }

  exclusive(task) {
    const run = this.queue.then(task, task);
    this.queue = run.catch(() => undefined);
    return run;
  }

  async send(command) {
    const bytes = encoder.encode(command);
    if (bytes.byteLength > MAX_COMMAND_LENGTH) {
      throw new FastbootError(`Command is longer than ${MAX_COMMAND_LENGTH} bytes`);
    }
    await this.transport.write(bytes);
  }

  async receive(command) {
    const info = [];
    for (;;) {
      const packet = decoder.decode(await this.transport.read());
      const status = packet.slice(0, 4);
      const payload = packet.slice(4);
      switch (status) {
        case "INFO":
        case "TEXT":
          info.push(payload);
          if (this.onMessage) this.onMessage(payload);
          break;
        case "OKAY":
        case "DATA":
          return { status, value: payload, info };
        case "FAIL":
          throw new FastbootCommandError(command, payload);
        default:
          throw new FastbootProtocolError(`Unexpected response to "${command}": ${JSON.stringify(packet)}`);
      }
    }
  }

  async execute(command) {
    await this.send(command);
    const response = await this.receive(command);
    if (response.status !== "OKAY") {
      throw new FastbootProtocolError(`Unexpected DATA response to "${command}"`);
    }
    return { value: response.value, info: response.info };
  }

  command(command) {
    return this.exclusive(() => this.execute(command));
  }

  async getVariable(name) {
    return (await this.command(`getvar:${name}`)).value;
  }

  async getAllVariables() {
    let result;
    try {
      result = await this.command("getvar:all");
    } catch (error) {
      if (error instanceof FastbootCommandError) return null;
      throw error;
    }
    const variables = new Map();
    for (const line of result.info) {
      const entry = parseVariableLine(line);
      if (entry) variables.set(entry[0], entry[1]);
    }
    return variables;
  }

  getMaxDownloadSize() {
    return this.exclusive(() => this.maxDownloadSizeUnlocked());
  }

  async isUserspace() {
    return this.getOptionalVariable("is-userspace").then((value) => value === "yes");
  }

  async getCurrentSlot() {
    const raw = await this.getOptionalVariable("current-slot");
    const slot = raw ? raw.replace(/^_/, "") : null;
    return slot === "a" || slot === "b" ? slot : null;
  }

  async hasSlot(partition) {
    return (await this.getOptionalVariable(`has-slot:${partition}`)) === "yes";
  }

  async isLogical(partition) {
    return (await this.getOptionalVariable(`is-logical:${partition}`)) === "yes";
  }

  async getOptionalVariable(name) {
    try {
      return await this.getVariable(name);
    } catch (error) {
      if (error instanceof FastbootCommandError) return null;
      throw error;
    }
  }

  async resolvePartition(partition, slot = "current") {
    if (/_[ab]$/.test(partition) || !(await this.hasSlot(partition))) return partition;
    const current = await this.getCurrentSlot();
    if (!current) return partition;
    const other = current === "a" ? "b" : "a";
    const suffix = slot === "current" ? current : slot === "other" ? other : slot;
    return `${partition}_${suffix}`;
  }

  download(data, options = {}) {
    return this.exclusive(() => this.downloadUnlocked(data, options));
  }

  async downloadUnlocked(data, { onProgress, signal } = {}) {
    throwIfAborted(signal);
    const size = data.size;
    const command = `download:${size.toString(16).padStart(8, "0")}`;
    await this.send(command);
    const response = await this.receive(command);
    if (response.status !== "DATA") {
      throw new FastbootProtocolError(`Device answered "${command}" without DATA`);
    }
    const accepted = parseInt(response.value, 16);
    if (accepted !== size) {
      throw new FastbootProtocolError(`Device accepted ${accepted} bytes, expected ${size}`);
    }

    if (onProgress) onProgress(0);
    let offset = 0;
    let next = size > 0 ? data.slice(0, WRITE_CHUNK_SIZE).arrayBuffer() : null;
    while (next) {
      const chunk = await next;
      const end = offset + chunk.byteLength;
      next = end < size ? data.slice(end, end + WRITE_CHUNK_SIZE).arrayBuffer() : null;
      await this.transport.write(chunk);
      offset = end;
      if (onProgress) onProgress(offset / size);
    }

    const done = await this.receive(command);
    if (done.status !== "OKAY") {
      throw new FastbootProtocolError(`Unexpected response after download: ${done.status}`);
    }
  }

  flash(partition, image, options = {}) {
    return this.exclusive(async () => {
      const payloads = await splitImage(image, await this.maxDownloadSizeUnlocked());
      const total = payloads.reduce((sum, payload) => sum + payload.size, 0);
      let sent = 0;
      for (const payload of payloads) {
        throwIfAborted(options.signal);
        await this.downloadUnlocked(payload, {
          signal: options.signal,
          onProgress: (fraction) => {
            if (options.onProgress) {
              options.onProgress((sent + fraction * payload.size) / total);
            }
          }
        });
        sent += payload.size;
        await this.execute(`flash:${partition}`);
      }
      if (options.onProgress) options.onProgress(1);
    });
  }

  async maxDownloadSizeUnlocked() {
    if (this.maxDownloadSize !== null) return this.maxDownloadSize;
    let size = NaN;
    try {
      size = Number((await this.execute("getvar:max-download-size")).value);
    } catch (error) {
      if (!(error instanceof FastbootCommandError)) throw error;
    }
    this.maxDownloadSize = Number.isFinite(size) && size > 0 ? size : FALLBACK_MAX_DOWNLOAD_SIZE;
    return this.maxDownloadSize;
  }

  async flashLogical(partition, image, options = {}) {
    await this.command(`resize-logical-partition:${partition}:${await imageSize(image)}`);
    await this.flash(partition, image, options);
  }

  boot(image, options = {}) {
    return this.exclusive(async () => {
      await this.downloadUnlocked(image, options);
      await this.execute("boot");
    });
  }

  async erase(partition) {
    await this.command(`erase:${partition}`);
  }

  async setActiveSlot(slot) {
    await this.command(`set_active:${slot}`);
  }

  async reboot(target = "system") {
    try {
      await this.command(target === "system" ? "reboot" : `reboot-${target}`);
    } catch (error) {
      if (!(error instanceof FastbootUsbError)) throw error;
    }
  }

  async close() {
    await this.transport.close();
  }
}

/* ============================================================================
   4. ЛОГИКА ПРИЛОЖЕНИЯ, СЕССИИ И ИНТЕРФЕЙСА FLASHFOX
   ============================================================================ */

const QUICK_COMMANDS = [
  "getvar all",
  "getvar product",
  "getvar current-slot",
  "getvar unlocked",
  "oem device-info",
  "flashing get_unlock_ability",
  "flashing unlock",
  "flashing lock"
];

let activeDevice = null;
let isBusy = false;
let selectedImageFile = null;
let cachedVariables = new Map();

// История команд консоли (стрелки Вверх / Вниз как в ConsoleTab.vue)
const cmdHistory = [];
let historyCursor = -1;

// --- Плавное логирование в консоль ---
function appendLog(type, text) {
  const logsContainer = document.getElementById("terminal-logs");
  const viewport = document.getElementById("terminal-viewport");
  if (!logsContainer || !viewport) return;

  const entry = document.createElement("div");
  entry.className = `log-entry type-${type}`;

  const now = new Date();
  const timeStr = now.toTimeString().split(" ")[0];

  const timeSpan = document.createElement("span");
  timeSpan.className = "log-time";
  timeSpan.textContent = timeStr;

  const tagSpan = document.createElement("span");
  tagSpan.className = `log-tag tag-${type}`;
  tagSpan.textContent = type.toUpperCase();

  const textSpan = document.createElement("span");
  textSpan.className = "log-text";
  textSpan.textContent = text;

  entry.appendChild(timeSpan);
  entry.appendChild(tagSpan);
  entry.appendChild(textSpan);
  logsContainer.appendChild(entry);

  // Плавный скроллинг вниз
  requestAnimationFrame(() => {
    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth"
    });
  });
}

function setProgress(label, fraction) {
  const banner = document.getElementById("progress-banner");
  const labelEl = document.getElementById("progress-label");
  const pctEl = document.getElementById("progress-percent");
  const fillEl = document.getElementById("progress-fill");

  if (fraction === null || fraction === undefined) {
    banner.classList.add("hidden");
    return;
  }

  banner.classList.remove("hidden");
  const pct = Math.round(Math.max(0, Math.min(1, fraction)) * 100);
  labelEl.textContent = label;
  pctEl.textContent = `${pct}%`;
  fillEl.style.width = `${pct}%`;
}

function setBusyState(busy, progressLabel = null) {
  isBusy = busy;
  updateConnectionUI();
  if (!busy) {
    setTimeout(() => setProgress(null, null), 400);
  } else if (progressLabel) {
    setProgress(progressLabel, 0);
  }
}

function updateConnectionUI() {
  const badge = document.getElementById("status-badge");
  const statusText = document.getElementById("status-text");
  const connectBtnText = document.getElementById("btn-connect-text");

  if (isBusy) {
    badge.setAttribute("data-state", "busy");
    statusText.textContent = t("status.busy");
  } else if (activeDevice) {
    badge.setAttribute("data-state", "connected");
    const prod = cachedVariables.get("product") || activeDevice.transport.device.productName || "Fastboot";
    statusText.textContent = `${t("status.connected")}: ${prod}`;
  } else {
    badge.setAttribute("data-state", "disconnected");
    statusText.textContent = t("status.disconnected");
  }

  if (connectBtnText) {
    connectBtnText.textContent = activeDevice ? t("btn.disconnect") : t("btn.connect");
  }
}

// Форматирование нормализованной команды (позволяет писать как `getvar all`, так и `getvar:all`)
function normalizeFastbootCommand(rawInput) {
  let cmd = rawInput.trim();
  if (/^fastboot\s+/i.test(cmd)) {
    cmd = cmd.replace(/^fastboot\s+/i, "").trim();
  }
  const parts = cmd.split(/\s+/);
  const head = parts[0].toLowerCase();
  const rest = parts.slice(1).join(" ");

  if ((head === "getvar" || head === "erase" || head === "set_active" || head === "flash") && rest && !cmd.includes(":")) {
    return `${head}:${rest}`;
  }
  if (head === "reboot" && rest && !cmd.includes("-")) {
    return `reboot-${rest}`;
  }
  return cmd;
}

// Выполнение консольной команды
async function runConsoleCommand(rawInput) {
  const trimmed = rawInput.trim();
  if (!trimmed) return;

  if (trimmed.toLowerCase() === "clear" || trimmed.toLowerCase() === "cls") {
    document.getElementById("terminal-logs").innerHTML = "";
    return;
  }

  if (trimmed.toLowerCase() === "help" || trimmed === "?") {
    appendLog("cmd", `> ${trimmed}`);
    appendLog("sys", t("console.helpText"));
    return;
  }

  if (!activeDevice) {
    appendLog("fail", t("msg.needConnect"));
    return;
  }

  const wireCommand = normalizeFastbootCommand(trimmed);
  appendLog("cmd", `> ${wireCommand}`);

  setBusyState(true);
  try {
    const res = await activeDevice.command(wireCommand);
    const suffix = res.value ? ` (${res.value})` : "";
    appendLog("okay", `OKAY${suffix}`);
  } catch (err) {
    appendLog("fail", err.message || String(err));
  } finally {
    setBusyState(false);
  }
}

// Чтение информации об устройстве и заполнение вкладки Info
async function refreshDeviceInfo() {
  if (!activeDevice) return;
  setBusyState(true);
  try {
    const vars = await activeDevice.getAllVariables();
    if (vars && vars.size > 0) {
      cachedVariables = vars;
    } else {
      // Фоллбэк, если загрузчик не поддерживает getvar:all
      cachedVariables = new Map();
      for (const key of ["product", "serialno", "current-slot", "unlocked", "is-userspace", "max-download-size", "version-bootloader"]) {
        const val = await activeDevice.getOptionalVariable(key);
        if (val !== null) cachedVariables.set(key, val);
      }
    }

    const product = cachedVariables.get("product") || (await activeDevice.getOptionalVariable("product")) || "—";
    const serial = cachedVariables.get("serialno") || activeDevice.transport.device.serialNumber || "—";
    const slot = cachedVariables.get("current-slot") || (await activeDevice.getCurrentSlot()) || "—";
    const unlocked = cachedVariables.get("unlocked") || (await activeDevice.getOptionalVariable("unlocked")) || "—";
    const userspace = cachedVariables.get("is-userspace") === "yes" ? "fastbootd" : "bootloader";
    const maxDlRaw = cachedVariables.get("max-download-size");
    let maxDlFormatted = "—";
    if (maxDlRaw) {
      const num = Number(maxDlRaw);
      maxDlFormatted = Number.isFinite(num) && num > 0 ? `${(num / (1024 * 1024)).toFixed(0)} MB` : maxDlRaw;
    }

    document.getElementById("stat-product").textContent = product;
    document.getElementById("stat-serial").textContent = serial;
    document.getElementById("stat-slot").textContent = slot.toUpperCase();
    document.getElementById("stat-unlocked").textContent = unlocked;
    document.getElementById("stat-mode").textContent = userspace;
    document.getElementById("stat-maxdl").textContent = maxDlFormatted;

    renderVariablesTable();
    updateConnectionUI();
  } catch (err) {
    appendLog("fail", err.message || String(err));
  } finally {
    setBusyState(false);
  }
}

function renderVariablesTable() {
  const tbody = document.getElementById("vars-tbody");
  const filterText = (document.getElementById("var-search")?.value || "").trim().toLowerCase();
  if (!tbody) return;

  if (cachedVariables.size === 0) {
    tbody.innerHTML = `<tr><td colspan="2" class="empty-cell">${t("info.empty")}</td></tr>`;
    return;
  }

  const entries = Array.from(cachedVariables.entries()).filter(([k, v]) => {
    if (!filterText) return true;
    return k.toLowerCase().includes(filterText) || v.toLowerCase().includes(filterText);
  });

  tbody.innerHTML = entries
    .map(([k, v]) => `<tr><td>${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`)
    .join("");
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Подключение / Отключение по WebUSB
async function toggleConnection() {
  if (!isWebUsbSupported()) {
    appendLog("fail", t("msg.noWebUsb"));
    return;
  }

  if (activeDevice) {
    await activeDevice.close();
    activeDevice = null;
    cachedVariables.clear();
    renderVariablesTable();
    updateConnectionUI();
    appendLog("sys", "USB session closed.");
    return;
  }

  try {
    const usbDevice = await requestUsbDevice();
    const fbDevice = await openFastboot(usbDevice);
    fbDevice.onMessage = (msg) => appendLog("info", msg);
    activeDevice = fbDevice;
    appendLog("sys", `USB Connected: ${usbDevice.productName || "Fastboot Device"} (${usbDevice.serialNumber || "no-serial"})`);
    updateConnectionUI();
    await refreshDeviceInfo();
  } catch (err) {
    if (err && err.name === "NotFoundError") return; // Пользователь закрыл окно выбора USB
    appendLog("fail", err.message || String(err));
  }
}

// Индикатор нижней панели вкладок
function updateDockIndicator() {
  const activeTabBtn = document.querySelector(".dock-tab.active");
  const indicator = document.getElementById("dock-indicator");
  if (!activeTabBtn || !indicator) return;

  indicator.style.width = `${activeTabBtn.offsetWidth}px`;
  indicator.style.transform = `translateX(${activeTabBtn.offsetLeft}px)`;
}

/* ============================================================================
   5. ИНИЦИАЛИЗАЦИЯ СОБЫТИЙ DOM
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderAllIcons();

  // Генерация быстрых команд из ConsoleTab.vue
  const quickChipsContainer = document.getElementById("quick-chips");
  QUICK_COMMANDS.forEach((cmd) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip-btn";
    btn.textContent = cmd;
    btn.addEventListener("click", () => runConsoleCommand(cmd));
    quickChipsContainer.appendChild(btn);
  });

  // Переключение вкладок снизу
  const dockTabs = document.querySelectorAll(".dock-tab");
  dockTabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      dockTabs.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll(".tab-pane").forEach((pane) => {
        pane.classList.toggle("active", pane.id === targetId);
      });

      updateDockIndicator();
    });
  });

  window.addEventListener("resize", updateDockIndicator);

  // Переключение языка с иконкой глобуса
  document.getElementById("btn-lang-toggle").addEventListener("click", () => {
    currentLang = currentLang === "ru" ? "en" : "ru";
    localStorage.setItem("flashfox_lang", currentLang);
    applyLocalization();
  });

  // Кнопка подключения USB
  document.getElementById("btn-connect").addEventListener("click", toggleConnection);

  // Автоматическая реакция на физическое отключение USB-кабеля
  if (isWebUsbSupported()) {
    navigator.usb.addEventListener("disconnect", (event) => {
      if (activeDevice && activeDevice.transport.device === event.device) {
        activeDevice = null;
        cachedVariables.clear();
        updateConnectionUI();
        appendLog("sys", "USB device disconnected.");
      }
    });
  }

  // Форма ввода консоли + история команд (стрелки Up/Down)
  const consoleForm = document.getElementById("console-form");
  const consoleInput = document.getElementById("console-input");

  consoleForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const command = consoleInput.value.trim();
    if (!command || isBusy) return;
    if (cmdHistory[0] !== command) cmdHistory.unshift(command);
    historyCursor = -1;
    consoleInput.value = "";
    await runConsoleCommand(command);
  });

  consoleInput.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyCursor + 1 < cmdHistory.length) {
        historyCursor++;
        consoleInput.value = cmdHistory[historyCursor];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyCursor - 1 >= -1) {
        historyCursor--;
        consoleInput.value = historyCursor === -1 ? "" : cmdHistory[historyCursor];
      }
    }
  });

  // Очистка и копирование логов консоли
  document.getElementById("btn-clear-log").addEventListener("click", () => {
    document.getElementById("terminal-logs").innerHTML = "";
  });

  document.getElementById("btn-copy-log").addEventListener("click", async () => {
    const lines = Array.from(document.querySelectorAll(".log-entry")).map((el) => el.innerText.replace(/\n+/g, " "));
    await navigator.clipboard.writeText(lines.join("\n")).catch(() => {});
    appendLog("sys", t("msg.copied"));
  });

  // Быстрый выбор популярных разделов во вкладке Прошивки
  document.querySelectorAll("#preset-partitions .chip-btn").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.getElementById("flash-partition").value = chip.getAttribute("data-part");
    });
  });

  // Выбор и Drag & Drop файла образа .img
  const fileInput = document.getElementById("flash-file-input");
  const dropzone = document.getElementById("file-dropzone");
  const dropzoneTitle = document.getElementById("dropzone-title");
  const dropzoneMeta = document.getElementById("dropzone-meta");

  function handleSelectedFile(file) {
    if (!file) return;
    selectedImageFile = file;
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    dropzoneTitle.textContent = file.name;
    dropzoneMeta.textContent = `${sizeMb} MB`;
  }

  fileInput.addEventListener("change", () => {
    if (fileInput.files && fileInput.files[0]) {
      handleSelectedFile(fileInput.files[0]);
    }
  });

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("dragover");
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("dragover");
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("dragover");
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleSelectedFile(e.dataTransfer.files[0]);
    }
  });

  // Кнопка: Прошить раздел (с автоматической проверкой слота, Logical Partition и Sparse)
  document.getElementById("btn-flash-image").addEventListener("click", async () => {
    if (!activeDevice) return appendLog("fail", t("msg.needConnect"));
    if (!selectedImageFile) return appendLog("fail", t("msg.needFile"));
    const rawPart = document.getElementById("flash-partition").value.trim();
    const slotSel = document.getElementById("flash-slot").value;
    if (!rawPart) return appendLog("fail", t("msg.needPartition"));

    setBusyState(true, `Flashing ${rawPart}...`);
    try {
      const targetPartition = await activeDevice.resolvePartition(rawPart, slotSel);
      appendLog("cmd", `> flash ${targetPartition} (${selectedImageFile.name})`);

      const progressOpts = {
        onProgress: (fraction) => setProgress(`Flashing ${targetPartition}...`, fraction)
      };

      if ((await activeDevice.isUserspace()) && (await activeDevice.isLogical(targetPartition))) {
        await activeDevice.flashLogical(targetPartition, selectedImageFile, progressOpts);
      } else {
        await activeDevice.flash(targetPartition, selectedImageFile, progressOpts);
      }
      appendLog("okay", `Flashed ${targetPartition} successfully.`);
    } catch (err) {
      appendLog("fail", err.message || String(err));
    } finally {
      setBusyState(false);
    }
  });

  // Кнопка: Загрузить образ в RAM (fastboot boot)
  document.getElementById("btn-boot-image").addEventListener("click", async () => {
    if (!activeDevice) return appendLog("fail", t("msg.needConnect"));
    if (!selectedImageFile) return appendLog("fail", t("msg.needFile"));

    setBusyState(true, `Booting ${selectedImageFile.name}...`);
    try {
      appendLog("cmd", `> boot (${selectedImageFile.name})`);
      await activeDevice.boot(selectedImageFile, {
        onProgress: (fraction) => setProgress(`Downloading ${selectedImageFile.name}...`, fraction)
      });
      appendLog("okay", "Boot command completed.");
    } catch (err) {
      appendLog("fail", err.message || String(err));
    } finally {
      setBusyState(false);
    }
  });

  // Кнопка: Стереть раздел (fastboot erase)
  document.getElementById("btn-erase-partition").addEventListener("click", async () => {
    if (!activeDevice) return appendLog("fail", t("msg.needConnect"));
    const rawPart = document.getElementById("flash-partition").value.trim();
    const slotSel = document.getElementById("flash-slot").value;
    if (!rawPart) return appendLog("fail", t("msg.needPartition"));

    setBusyState(true);
    try {
      const targetPartition = await activeDevice.resolvePartition(rawPart, slotSel);
      appendLog("cmd", `> erase:${targetPartition}`);
      await activeDevice.erase(targetPartition);
      appendLog("okay", `Erased ${targetPartition}.`);
    } catch (err) {
      appendLog("fail", err.message || String(err));
    } finally {
      setBusyState(false);
    }
  });

  // Кнопки перезагрузки (System / Bootloader / Fastbootd / Recovery)
  document.querySelectorAll("[data-reboot]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!activeDevice) return appendLog("fail", t("msg.needConnect"));
      const target = btn.getAttribute("data-reboot");
      setBusyState(true);
      try {
        appendLog("cmd", `> reboot (${target})`);
        await activeDevice.reboot(target);
        appendLog("okay", `Rebooting into ${target}...`);
      } catch (err) {
        appendLog("fail", err.message || String(err));
      } finally {
        setBusyState(false);
      }
    });
  });

  // Смена слота A / B
  document.getElementById("btn-slot-a").addEventListener("click", () => runConsoleCommand("set_active:a"));
  document.getElementById("btn-slot-b").addEventListener("click", () => runConsoleCommand("set_active:b"));

  // Обновление и фильтрация таблицы переменных (вкладка Устройство)
  document.getElementById("btn-refresh-info").addEventListener("click", () => {
    if (!activeDevice) return appendLog("fail", t("msg.needConnect"));
    refreshDeviceInfo();
  });

  document.getElementById("var-search").addEventListener("input", renderVariablesTable);

  // Применяем локализацию и выводим приветственное сообщение
  applyLocalization();
  appendLog("sys", t("console.welcome"));
});
