
import { Temporal } from "@js-temporal/polyfill";
import { randomInt } from "crypto";

export function generateProcessID() {
    const randomIntString = randomInt(10000000).toString();
    const currentTime = Temporal.Now.instant().toString();
    return randomIntString + ":" + ":" + currentTime;
}
