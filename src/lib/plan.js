import "server-only";
import { MODEL, PLACEMENTS, STYLES, SIZES, RESOLUTIONS } from "@/lib/app.config";
import { pick, urls, text, PlanError } from "@/lib/plan-helpers";

const REAL = "The tattoo must wrap naturally around the body shape, follow skin contours, muscles and pores, match the scene lighting and shadows, and look like real ink in the skin (not a sticker, not floating on top). " +
  "Keep the person, the skin tone, the rest of the body, clothing and background otherwise unchanged; photorealistic.";

export function plan(body) {
  const [area] = urls(body.inputs, "body", { name: "photo of the body area" });
  const place = PLACEMENTS.find((p) => p.id === body.placement) || PLACEMENTS[0];
  const size = SIZES.find((s) => s.id === body.size) || SIZES[1];
  const note = text(body.note, 200);
  const count = pick(Number(body.count), [1, 2, 4], 1);
  const look = body.healed ? " Make it look healed for a year: slightly softened lines, settled ink." : " Make it look fresh but fully healed: crisp lines, rich ink.";
  const params = { aspect_ratio: "Auto", resolution: pick(body.resolution, RESOLUTIONS, "1k") };
  let job;
  if (body.mode === "describe") {
    const idea = text(body.idea, 300);
    if (!idea) throw new PlanError("Describe the tattoo", "missing_input");
    const style = STYLES.find((s) => s.id === body.style) || STYLES[0];
    job = {
      model: MODEL,
      prompt: `Add a ${size.prompt} ${style.prompt} style tattoo to the person's ${place.prompt} in the photo. The tattoo design: ${idea}. ` +
        REAL + look + (note ? ` Extra wishes: ${note}.` : ""),
      params,
      inputs: { image_urls: [area] },
    };
  } else {
    const [design] = urls(body.inputs, "design", { name: "tattoo design" });
    job = {
      model: MODEL,
      prompt: `Tattoo try-on. Image 1 is the person, image 2 is the tattoo design. Apply the tattoo design from image 2 onto the person's ${place.prompt} in image 1, ${size.prompt}; reproduce the design's lines, shapes and colors faithfully, without the paper background. ` +
        REAL + look + (note ? ` Extra wishes: ${note}.` : ""),
      params,
      inputs: { image_urls: [area, design] },
    };
  }
  return Array.from({ length: count }, () => job);
}
