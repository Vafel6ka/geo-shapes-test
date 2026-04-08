import { allFontKeys, appFonts } from "./fonts";

// --- Map для кешу шрифтів ---
const loadedFonts = new Map<string, boolean>();

// --- отримати статус шрифту ---
export const getFont = (key: string) => loadedFonts.get(key) ?? false;

// --- loader шрифтів ---
export const loadFonts = async (onProgress?: (p: number | string) => void) => {
  const keys = Object.values(allFontKeys);
  const total = keys.length;
  let loaded = 0;

  for (const key of keys) {
    // якщо вже завантажений — пропускаємо
    if (loadedFonts.has(key)) {
      loaded++;
      continue;
    }

    const font = new FontFace(
      key,
      `url("${appFonts[key]}") format("truetype")`,
    );

    // завантаження
    const loadedFace = await font.load();

    // додаємо в документ
    document.fonts.add(loadedFace);

    // кешуємо
    loadedFonts.set(key, true);

    // прогрес
    loaded++;
    onProgress?.((loaded / total).toFixed(2));
  }

  onProgress?.("all");

  return loadedFonts;
};
