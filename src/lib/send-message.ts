/**
 * A basic function for wrapping the sending of postMessages to frames.
 */
export function sendMessage(frame: Window, payload: any, origin: string): void {
  try {
    frame.postMessage(payload, origin);
  } catch (error) {
    /* ignored */
  }
}
