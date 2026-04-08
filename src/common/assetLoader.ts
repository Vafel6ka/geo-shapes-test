import { Assets, Texture, Spritesheet } from "pixi.js";
import type { ScenesName } from "./types";

export async function initAssets() {
  await Assets.init({
    manifest: "assets/manifest.json",
  });
}

export async function loadBundle(
  name: ScenesName,
  onProgress?: (progress: number) => void,
) {
  return Assets.loadBundle(name, (progress) => {
    onProgress?.(progress);
  });
}

export function getTexture(key: string): Texture {
  return Assets.get(key);
}

export function getSpritesheet(key: string): Spritesheet {
  return Assets.get(key);
}
