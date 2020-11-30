import * as React from "react";
import { client } from "../utils/api-client";

let queue = [];

setInterval(sendProfileQueue, 5000);

function sendProfileQueue() {
  if (!queue.length) {
    return Promise.resolve({ success: true });
  }
  const queueToSend = [...queue];
  queue = [];
  return client("profile", { data: queueToSend });
}

// By wrapping the Profile like this, we can set the onRender to whatever
// we want and we get the additional benefit of being able to include
// additional data and filter phases
function Profiler({ metadata, phases, ...props }) {
  function reportProfile(
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
  ) {
    if (!phases || phases.includes(phase)) {
      queue.push({
        metadata,
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
      });
    }
  }

  return <React.Profiler onRender={reportProfile} {...props} />;
}

export { Profiler };
