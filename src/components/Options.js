"use client";

import { PLACEMENTS, STYLES, SIZES, RESOLUTIONS } from "@/lib/app.config";
import { useLang } from "@/lib/i18n";
import { LabeledChips, TextField, Toggle } from "./Presets";

export default function Options({ state, set, Chips }) {
  const { t } = useLang();
  return (
    <>
      {state.mode === "describe" && (
        <>
          <TextField id="idea" required rows={3} label={{ en: "Tattoo idea", ru: "Идея татуировки" }} value={state.idea} max={300}
            onChange={(v) => set({ idea: v })} placeholder={{ en: "e.g. a small swallow carrying a sprig of lavender", ru: "например: маленькая ласточка с веточкой лаванды" }} />
          <LabeledChips label={{ en: "Style", ru: "Стиль" }} items={STYLES} value={state.style} onChange={(v) => set({ style: v })} />
        </>
      )}
      <LabeledChips label={{ en: "Placement", ru: "Место" }} items={PLACEMENTS} value={state.placement} onChange={(v) => set({ placement: v })} />
      <LabeledChips label={{ en: "Size", ru: "Размер" }} items={SIZES} value={state.size} onChange={(v) => set({ size: v })} />
      <Toggle label={{ en: "Show it aged a year", ru: "Показать через год" }} hint={{ en: "Slightly softened lines, as a healed tattoo looks.", ru: "Чуть смягчённые линии, как у зажившей тату." }}
        value={state.healed} onChange={(v) => set({ healed: v })} />
      <Chips label={t("resolution")} options={RESOLUTIONS} value={state.resolution} onChange={(v) => set({ resolution: v })} render={(v) => v.toUpperCase()} />
      <TextField id="note" label={{ en: "Extra wishes (optional)", ru: "Пожелания (необязательно)" }} value={state.note} max={200}
        onChange={(v) => set({ note: v })} placeholder={{ en: "e.g. slightly tilted, only black ink", ru: "например: чуть под наклоном, только чёрным" }} />
    </>
  );
}
