import { useSyncExternalStore } from "react";

export interface ShapeMeta {
  selected: boolean;
  hovered: boolean;
  locked?: boolean;
  visible?: boolean;
}

const defaultMeta: ShapeMeta = {
  selected: false,
  hovered: false,
};

type MetaListener = () => void;

class ShapeMetaStore {
  private meta = new Map<string, ShapeMeta>();
  private listeners = new Map<string, Set<MetaListener>>();

  get(id: string): ShapeMeta {
    return this.meta.get(id) ?? defaultMeta;
  }

  set(id: string, patch: Partial<ShapeMeta>) {
    const prev = this.get(id);
    const next = { ...prev, ...patch };

    if (
      prev.selected === next.selected &&
      prev.hovered === next.hovered &&
      prev.locked === next.locked &&
      prev.visible === next.visible
    ) {
      return;
    }

    this.meta.set(id, next);
    this.listeners.get(id)?.forEach(l => l());
  }

  remove(id: string) {
    const existed = this.meta.delete(id);
    if (!existed) return;

    this.listeners.get(id)?.forEach(l => l());
    this.listeners.delete(id);
  }

  subscribe(id: string, cb: MetaListener): () => void {
    let set = this.listeners.get(id);
    if (!set) {
      set = new Set();
      this.listeners.set(id, set);
    }

    set.add(cb);

    return () => {
      set!.delete(cb);
      if (set!.size === 0) {
        this.listeners.delete(id);
      }
    };
  }
}

export const shapeMetaStore = new ShapeMetaStore();

export function useShapeMeta(id: string): ShapeMeta {
  return useSyncExternalStore(
    (cb) => shapeMetaStore.subscribe(id, cb),
    () => shapeMetaStore.get(id)
  );
}