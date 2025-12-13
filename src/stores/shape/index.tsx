import { useSyncExternalStore } from "react";

export interface ShapeData {
  id: string;
  points: number[];
}

export type ShapeEvent =
  | { type: "update"; shape: ShapeData }
  | { type: "remove"; id: string };

export type IdsEvent =
  | { type: "add"; id: string }
  | { type: "remove"; id: string };

type ShapeListener = (e: ShapeEvent) => void;
type IdsListener = (e: IdsEvent) => void;

class ShapeStore {
  private shapes = new Map<string, ShapeData>();
  private shapeListeners = new Map<string, Set<ShapeListener>>();
  private idsListeners = new Set<IdsListener>();

  private idsSnapshot: string[] = [];

  get(id: string): ShapeData | undefined {
    return this.shapes.get(id);
  }

  getIdsSnapshot(): string[] {
    return this.idsSnapshot;
  }

  rebuildIdsSnapshot() {
    this.idsSnapshot = Array.from(this.shapes.keys());
  }

  set(shape: ShapeData) {
    const isNew = !this.shapes.has(shape.id);

    this.shapes.set(shape.id, shape);
    this.shapeListeners.get(shape.id)?.forEach(l => l({ type: "update", shape }));

    if (isNew) {
      this.rebuildIdsSnapshot();
      this.emitIds({ type: "add", id: shape.id });
    }
  }

  remove(id: string) {
    const existed = this.shapes.delete(id);
    if (!existed) return;

    this.shapeListeners.get(id)?.forEach(l => l({ type: "remove", id }));
    this.shapeListeners.delete(id);

    this.rebuildIdsSnapshot();
    this.emitIds({ type: "remove", id });
  }

  subscribeShape(id: string, cb: ShapeListener): () => void {
    let set = this.shapeListeners.get(id);
    if (!set) {
      set = new Set();
      this.shapeListeners.set(id, set);
    }

    set.add(cb);

    return () => {
      set!.delete(cb);
      if (set!.size === 0) {
        this.shapeListeners.delete(id);
      }
    };
  }

  subscribeIds(cb: IdsListener): () => void {
    this.idsListeners.add(cb);
    return () => {
      this.idsListeners.delete(cb);
    };
  }

  private emitIds(event: IdsEvent) {
    this.idsListeners.forEach(l => l(event));
  }
}

export const shapeStore = new ShapeStore();

export const useShape = (id: string) => {
  return useSyncExternalStore(
    (cb) =>
      shapeStore.subscribeShape(id, () => {
        cb();
      }),
    () => shapeStore.get(id)
  );
};

export function useShapeIds() {
  return useSyncExternalStore(
    (cb) =>
      shapeStore.subscribeIds(() => {
        cb();
      }),
    () => shapeStore.getIdsSnapshot()
  );
}