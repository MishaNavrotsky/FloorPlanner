export default class ControlEventBus {
  private target = new EventTarget();

  on<T>(type: string, listener: (event: T) => void) {
    const handler = (e: Event) => listener((e as CustomEvent).detail);
    this.target.addEventListener(type, handler);
    return () => this.target.removeEventListener(type, handler);
  }

  emit<T>(type: string, detail: T) {
    this.target.dispatchEvent(new CustomEvent(type, { detail }));
  }
}