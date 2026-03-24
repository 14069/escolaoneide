"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";

type FontScale = "default" | "large" | "xlarge";
type ToggleMode = "default" | "enabled";

type AccessibilitySettings = {
  contrast: ToggleMode;
  focus: ToggleMode;
  fontScale: FontScale;
  motion: ToggleMode;
};

const STORAGE_KEY = "oneide-accessibility-settings";
const STORE_EVENT = "oneide-accessibility-settings-change";

const DEFAULT_SETTINGS: AccessibilitySettings = {
  contrast: "default",
  focus: "default",
  fontScale: "default",
  motion: "default",
};
let cachedSettingsSnapshot = DEFAULT_SETTINGS;
let cachedSettingsRaw = "";

const FONT_OPTIONS: Array<{ description: string; label: string; value: FontScale }> = [
  { description: "Tamanho padrão do site.", label: "A", value: "default" },
  { description: "Texto um pouco maior para facilitar a leitura.", label: "A+", value: "large" },
  { description: "Texto ainda maior para reforçar a legibilidade.", label: "A++", value: "xlarge" },
];

function readSettings(): AccessibilitySettings {
  if (typeof window === "undefined") {
    return DEFAULT_SETTINGS;
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      cachedSettingsRaw = "";
      cachedSettingsSnapshot = DEFAULT_SETTINGS;
      return DEFAULT_SETTINGS;
    }

    if (rawValue === cachedSettingsRaw) {
      return cachedSettingsSnapshot;
    }

    const parsedValue = JSON.parse(rawValue) as Partial<AccessibilitySettings>;

    const normalizedSettings: AccessibilitySettings = {
      contrast: parsedValue.contrast === "enabled" ? "enabled" : "default",
      focus: parsedValue.focus === "enabled" ? "enabled" : "default",
      fontScale:
        parsedValue.fontScale === "large" || parsedValue.fontScale === "xlarge" ? parsedValue.fontScale : "default",
      motion: parsedValue.motion === "enabled" ? "enabled" : "default",
    };

    cachedSettingsRaw = rawValue;
    cachedSettingsSnapshot = normalizedSettings;

    return normalizedSettings;
  } catch {
    cachedSettingsRaw = "";
    cachedSettingsSnapshot = DEFAULT_SETTINGS;
    return DEFAULT_SETTINGS;
  }
}

function getServerSnapshot() {
  return DEFAULT_SETTINGS;
}

function getSnapshot() {
  return readSettings();
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleChange = () => onStoreChange();

  window.addEventListener("storage", handleChange);
  window.addEventListener(STORE_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(STORE_EVENT, handleChange);
  };
}

function writeSettings(nextSettings: AccessibilitySettings) {
  if (typeof window === "undefined") {
    return;
  }

  const rawValue = JSON.stringify(nextSettings);

  cachedSettingsRaw = rawValue;
  cachedSettingsSnapshot = nextSettings;
  window.localStorage.setItem(STORAGE_KEY, rawValue);
  window.dispatchEvent(new Event(STORE_EVENT));
}

function updateSettings(
  updater: AccessibilitySettings | ((currentSettings: AccessibilitySettings) => AccessibilitySettings),
) {
  const currentSettings = readSettings();
  const nextSettings = typeof updater === "function" ? updater(currentSettings) : updater;

  writeSettings(nextSettings);
}

function toggleMode(currentMode: ToggleMode) {
  return currentMode === "enabled" ? "default" : "enabled";
}

export function AccessibilityControls() {
  const panelId = useId();
  const settings = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    root.dataset.fontScale = settings.fontScale;
    root.dataset.contrast = settings.contrast;
    root.dataset.focus = settings.focus;
    root.dataset.motion = settings.motion;
  }, [settings]);

  function setFontScale(fontScale: FontScale) {
    updateSettings((currentSettings) => ({ ...currentSettings, fontScale }));
  }

  function handleReset() {
    updateSettings(DEFAULT_SETTINGS);
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <section
          aria-label="Preferências de acessibilidade"
          className="w-[min(24rem,calc(100vw-2rem))] rounded-[1.75rem] border border-[rgba(0,17,58,0.1)] bg-[rgba(255,255,255,0.96)] p-4 text-primary shadow-[0_28px_70px_rgba(0,17,58,0.16)] backdrop-blur sm:p-5"
          id={panelId}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Acessibilidade</p>
              <h2 className="mt-2 font-headline text-xl font-extrabold text-primary">Ajustar visualização</h2>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                Escolha opções para deixar a leitura e a navegação mais confortáveis.
              </p>
            </div>
            <button
              aria-label="Fechar painel de acessibilidade"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(0,17,58,0.08)] bg-surface-container-lowest text-lg font-bold text-primary"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              ×
            </button>
          </div>

          <div className="mt-5 space-y-5">
            <div>
              <p className="text-sm font-bold text-primary">Tamanho do texto</p>
              <div className="mt-3 grid grid-cols-3 gap-2" role="group" aria-label="Tamanho do texto">
                {FONT_OPTIONS.map((option) => {
                  const isActive = settings.fontScale === option.value;

                  return (
                    <button
                      aria-pressed={isActive}
                      className={[
                        "rounded-[1rem] border px-3 py-3 text-center text-sm font-bold transition",
                        isActive
                          ? "border-primary bg-primary text-white"
                          : "border-[rgba(0,17,58,0.1)] bg-surface-container-lowest text-primary",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      key={option.value}
                      onClick={() => setFontScale(option.value)}
                      type="button"
                    >
                      <span className="block">{option.label}</span>
                      <span className="mt-1 block text-[11px] font-medium leading-4 opacity-80">{option.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-3">
              <button
                aria-pressed={settings.contrast === "enabled"}
                className="flex items-center justify-between rounded-[1.15rem] border border-[rgba(0,17,58,0.1)] bg-surface-container-lowest px-4 py-3 text-left"
                onClick={() =>
                  updateSettings((currentSettings) => ({
                    ...currentSettings,
                    contrast: toggleMode(currentSettings.contrast),
                  }))
                }
                type="button"
              >
                <span>
                  <span className="block text-sm font-bold text-primary">Alto contraste</span>
                  <span className="mt-1 block text-sm leading-6 text-on-surface-variant">
                    Reforca a diferença entre textos, fundos e links.
                  </span>
                </span>
                <span
                  aria-hidden
                  className={[
                    "inline-flex min-w-20 justify-center rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.16em]",
                    settings.contrast === "enabled"
                      ? "bg-primary text-white"
                      : "bg-[rgba(0,17,58,0.08)] text-on-surface-variant",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {settings.contrast === "enabled" ? "Ativo" : "Padrão"}
                </span>
              </button>

              <button
                aria-pressed={settings.focus === "enabled"}
                className="flex items-center justify-between rounded-[1.15rem] border border-[rgba(0,17,58,0.1)] bg-surface-container-lowest px-4 py-3 text-left"
                onClick={() =>
                  updateSettings((currentSettings) => ({
                    ...currentSettings,
                    focus: toggleMode(currentSettings.focus),
                  }))
                }
                type="button"
              >
                <span>
                  <span className="block text-sm font-bold text-primary">Foco reforçado</span>
                  <span className="mt-1 block text-sm leading-6 text-on-surface-variant">
                    Deixa o destaque do teclado ainda mais visível.
                  </span>
                </span>
                <span
                  aria-hidden
                  className={[
                    "inline-flex min-w-20 justify-center rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.16em]",
                    settings.focus === "enabled"
                      ? "bg-primary text-white"
                      : "bg-[rgba(0,17,58,0.08)] text-on-surface-variant",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {settings.focus === "enabled" ? "Ativo" : "Padrão"}
                </span>
              </button>

              <button
                aria-pressed={settings.motion === "enabled"}
                className="flex items-center justify-between rounded-[1.15rem] border border-[rgba(0,17,58,0.1)] bg-surface-container-lowest px-4 py-3 text-left"
                onClick={() =>
                  updateSettings((currentSettings) => ({
                    ...currentSettings,
                    motion: toggleMode(currentSettings.motion),
                  }))
                }
                type="button"
              >
                <span>
                  <span className="block text-sm font-bold text-primary">Reduzir movimento</span>
                  <span className="mt-1 block text-sm leading-6 text-on-surface-variant">
                    Diminui animações e transições visuais do site.
                  </span>
                </span>
                <span
                  aria-hidden
                  className={[
                    "inline-flex min-w-20 justify-center rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.16em]",
                    settings.motion === "enabled"
                      ? "bg-primary text-white"
                      : "bg-[rgba(0,17,58,0.08)] text-on-surface-variant",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {settings.motion === "enabled" ? "Ativo" : "Padrão"}
                </span>
              </button>
            </div>

            <button
              className="btn-secondary w-full"
              onClick={handleReset}
              type="button"
            >
              Restaurar preferências padrão
            </button>
          </div>
        </section>
      ) : null}

      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Fechar opções de acessibilidade" : "Abrir opções de acessibilidade"}
        className="inline-flex items-center gap-3 rounded-full bg-primary px-4 py-3 font-headline text-sm font-bold text-white shadow-[0_18px_36px_rgba(0,17,58,0.22)]"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        type="button"
      >
        <span
          aria-hidden
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/14"
        >
          <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="5" fill="currentColor" r="2.5" />
            <path
              d="M12 8.5V21M8 11.5L12 8.5L16 11.5M7.5 21L9 14.5M16.5 21L15 14.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </svg>
        </span>
        <span>{isOpen ? "Fechar acessibilidade" : "Acessibilidade"}</span>
      </button>
    </div>
  );
}
