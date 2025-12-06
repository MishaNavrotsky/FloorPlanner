import { useCallback, useMemo, useRef } from "react";
import { ControlEventsContext, EVENT_NAMES } from "./ControlEventsContext";
import type { Stage } from "konva/lib/Stage";
import ControlEventBus from "./ControlEventBus";
import type { KonvaEventListener } from "konva/lib/Node";

export const ControlEventsProvider = ({ children }: { children: React.ReactNode }) => {
  const stageRef = useRef<Stage>(null);
  const events = useMemo(() => new ControlEventBus(), [])
  const mappedEvents = useRef<KonvaEventListener<Stage, any>[]>([]);

  const onStageReady = useCallback((stage: Stage) => {
    if (stageRef.current === stage) return;
    stageRef.current = stage;

    Object.values(EVENT_NAMES).forEach(name => {
      const e: KonvaEventListener<Stage, any> = (ev) => { events.emit(name, ev) };
      stage.on(name, e);
      mappedEvents.current.push(e);
    })
  }, [])

  return (
    <ControlEventsContext.Provider value={{
      stageRef,
      onStageReady,
      onClick(handler) {
        return events.on(EVENT_NAMES.ON_CLICK, handler);
      },
      onMouseDown(handler) {
        return events.on(EVENT_NAMES.ON_MOUSE_DOWN, handler);
      },
      onMouseUp(handler) {
        return events.on(EVENT_NAMES.ON_MOUSE_UP, handler);
      },
      onDbClick(handler) {
        return events.on(EVENT_NAMES.ON_DB_CLICK, handler);
      },
      onMouseMove(handler) {
        return events.on(EVENT_NAMES.ON_MOUSE_MOVE, handler);
      },
      onWheel(handler) {
        return events.on(EVENT_NAMES.ON_WHEEL, handler);
      },
    }}>
      {children}
    </ControlEventsContext.Provider>
  );
};