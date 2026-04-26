import { useMusicStore } from "@/stores/musicStore";

export function useMusic() {
  const store = useMusicStore();
  return store;
}
