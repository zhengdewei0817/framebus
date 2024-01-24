import { subscribeReplier, prefix } from "./";

import type {
  FramebusPayload,
  FramebusSubscriberArg,
  FramebusSubscribeHandler,
  FramebusSubscriberOptions,
} from "./types";

export function packagePayload(
  event: string,
  origin: string,
  data?: FramebusSubscriberArg,
  reply?: FramebusSubscribeHandler,
  options?: FramebusSubscriberOptions
): string | object {
  let packaged;
  const payload: FramebusPayload = {
    event: event,
    origin: origin,
  };

  if (typeof reply === "function") {
    payload.reply = subscribeReplier(reply, origin);
  }

  payload.eventData = data;

  try {
    if (options?.ignoreString) {
      packaged = {
        prefix,
        payload,
        ignoreString: options?.ignoreString,
      };
    } else {
      packaged = prefix + JSON.stringify(payload);
    }
  } catch (e) {
    throw new Error(`Could not stringify event: ${(e as Error).message}`);
  }

  return packaged;
}
