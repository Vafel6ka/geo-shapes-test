import { initAssets } from "../common/assetLoader";
import { loadFonts } from "../common/fontAssets";
import { Game } from "./game";

let game: Game | null = null;

export const initGame = async () => {
  await loadFonts((p) => console.log("Fonts:", p));
  await initAssets();

  game = new Game();
  await game.start();

  // auto destroy при закритті вкладки
  window.addEventListener("beforeunload", () => {
    game?.destroy();
  });

  return game;
};

export const destroyGame = () => {
  game?.destroy();
  game = null;
};
