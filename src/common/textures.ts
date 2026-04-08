export const allHomeTextureKeys = {
  desktopBackground: "home.background",
  play: "home.play",
  boom: "home.boom",
} as const;

export const allLoadingTextureKeys = {
  desktopBackground: "loading.background",
  click: "loading.click",
} as const;

export const allGameTextureKeys = {
  desktopBackground: "game.background",
  exit: "game.exit",
  shapes: "game.shapes",
} as const;

export const allTextureKeys = {
  ...allHomeTextureKeys,
  ...allGameTextureKeys,
  ...allLoadingTextureKeys,
} as const;
