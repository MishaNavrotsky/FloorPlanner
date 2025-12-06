import type { NodeConfig, KonvaEventObject, Node } from "konva/lib/Node";
import type { Stage } from "konva/lib/Stage";
import { createContext, useContext } from "react";

export interface ControlEvents {
  onClick: (handler: (event: KonvaEventObject<MouseEvent, Node<NodeConfig>>) => void) => () => void;
  onDbClick: (handler: (event: KonvaEventObject<MouseEvent, Node<NodeConfig>>) => void) => () => void;
  onMouseDown: (handler: (event: KonvaEventObject<MouseEvent, Node<NodeConfig>>) => void) => () => void;
  onMouseUp: (handler: (event: KonvaEventObject<MouseEvent, Node<NodeConfig>>) => void) => () => void;
  onMouseMove: (handler: (event: KonvaEventObject<MouseEvent, Node<NodeConfig>>) => void) => () => void;

  onWheel: (handler: (event: KonvaEventObject<WheelEvent, Node<NodeConfig>>) => void) => () => void;
}

export interface ControlEventsContextValue extends ControlEvents {
  stageRef: React.RefObject<Stage | null>;

  onStageReady?: (stage: Stage) => void;
}

export const controlEventsContextDefaults: ControlEventsContextValue = {
  stageRef: { current: null },

  onStageReady(_) {
  },

  onClick(_) {
    return () => { };
  },
  onDbClick(_) {
    return () => { };
  },
  onMouseDown(_) {
    return () => { };
  },
  onMouseUp(_) {
    return () => { };
  },
  onMouseMove(_) {
    return () => { };
  },
  onWheel(_) {
    return () => { };
  },
}

export const EVENT_NAMES = {
  ON_CLICK: 'click',
  ON_DB_CLICK: 'dblclick',
  ON_MOUSE_DOWN: 'mousedown',
  ON_MOUSE_UP: 'mouseup',
  ON_MOUSE_MOVE: 'mousemove',
  ON_WHEEL: 'wheel',
} as const;

export const ControlEventsContext = createContext<ControlEventsContextValue>(controlEventsContextDefaults);

export const useControlEvents = () => useContext(ControlEventsContext);