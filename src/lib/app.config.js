// Tattoo Try-On — see a tattoo on your body before the session: your own design or one described in words.
// Model: nano-banana-2-1-edit (photo edit with up to 14 input photos, keeps the person).

export const MODEL = "nano-banana-2-1-edit";

export const PLACEMENTS = [
  { id: "forearm", label: { en: "Forearm", ru: "Предплечье" }, prompt: "forearm" },
  { id: "shoulder", label: { en: "Shoulder", ru: "Плечо" }, prompt: "shoulder" },
  { id: "upper-arm", label: { en: "Upper arm / sleeve", ru: "Плечо и рукав" }, prompt: "upper arm, as a half sleeve" },
  { id: "chest", label: { en: "Chest", ru: "Грудь" }, prompt: "chest" },
  { id: "back", label: { en: "Back", ru: "Спина" }, prompt: "upper back" },
  { id: "wrist", label: { en: "Wrist", ru: "Запястье" }, prompt: "inner wrist" },
  { id: "hand", label: { en: "Hand", ru: "Кисть" }, prompt: "back of the hand" },
  { id: "thigh", label: { en: "Thigh", ru: "Бедро" }, prompt: "thigh" },
  { id: "calf", label: { en: "Calf", ru: "Икра" }, prompt: "calf" },
  { id: "ankle", label: { en: "Ankle", ru: "Лодыжка" }, prompt: "ankle" },
  { id: "neck", label: { en: "Side of the neck", ru: "Шея сбоку" }, prompt: "side of the neck" },
  { id: "ribs", label: { en: "Ribs", ru: "Рёбра" }, prompt: "side ribs" },
];

export const STYLES = [
  { id: "fine-line", label: { en: "Fine line", ru: "Тонкие линии" }, prompt: "fine-line" },
  { id: "minimal", label: { en: "Minimalist", ru: "Минимализм" }, prompt: "minimalist single-needle" },
  { id: "traditional", label: { en: "Old school", ru: "Олд скул" }, prompt: "American traditional with bold outlines and solid color" },
  { id: "blackwork", label: { en: "Blackwork", ru: "Блэкворк" }, prompt: "blackwork with solid black fills" },
  { id: "realism", label: { en: "Black & grey realism", ru: "Реализм" }, prompt: "black and grey realism with smooth shading" },
  { id: "watercolor", label: { en: "Watercolor", ru: "Акварель" }, prompt: "watercolor with soft color splashes" },
  { id: "japanese", label: { en: "Japanese", ru: "Японский" }, prompt: "Japanese irezumi" },
  { id: "geometric", label: { en: "Geometric", ru: "Геометрия" }, prompt: "geometric dotwork" },
  { id: "tribal", label: { en: "Tribal", ru: "Трайбл" }, prompt: "tribal" },
  { id: "lettering", label: { en: "Lettering", ru: "Надпись" }, prompt: "script lettering" },
];

export const SIZES = [
  { id: "small", label: { en: "Small", ru: "Маленькая" }, prompt: "small, about 5 cm" },
  { id: "medium", label: { en: "Medium", ru: "Средняя" }, prompt: "medium-sized, about 10–15 cm" },
  { id: "large", label: { en: "Large", ru: "Большая" }, prompt: "large, covering most of the area" },
];

export const RESOLUTIONS = ["1k", "2k"];

export const APP = {
  id: "tattoo-try-on",
  name: "Tattoo Try-On",
  theme: "midnight",
  tagline: { en: "See the tattoo before the needle", ru: "Посмотрите тату до сеанса" },
  kicker: { en: "Virtual tattoo preview", ru: "Примерка тату" },
  headline: { en: "Try a tattoo on your body before you commit", ru: "Примерьте татуировку, прежде чем решиться" },
  description: {
    en: "Add a photo of the body area and your design — or describe the tattoo in words. It follows skin, curves and light like real ink.",
    ru: "Добавьте фото места на теле и свой эскиз — или опишите татуировку словами. Она ляжет по коже, изгибам и свету, как настоящая.",
  },
  cta: { en: "Try the tattoo", ru: "Примерить тату" },
  models: [MODEL],
  upload: { types: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"], maxBytes: 20 * 1024 * 1024 },
  modes: [
    { id: "design", label: { en: "I have a design", ru: "У меня есть эскиз" },
      desc: { en: "Add a picture of the tattoo design.", ru: "Добавьте картинку эскиза." } },
    { id: "describe", label: { en: "Describe it in words", ru: "Описать словами" },
      desc: { en: "No sketch yet — pick a style and describe the idea.", ru: "Эскиза нет — выберите стиль и опишите идею." } },
  ],
  slots: [
    { key: "body", kind: "image", min: 1, max: 1,
      label: { en: "Photo of the body area", ru: "Фото места на теле" },
      hint: { en: "The area is well lit and fully in the frame.", ru: "Место хорошо освещено и целиком в кадре." } },
    { key: "design", kind: "image", min: 1, max: 1, modes: ["design"],
      label: { en: "Tattoo design", ru: "Эскиз татуировки" },
      hint: { en: "Best on a plain white background.", ru: "Лучше на однотонном белом фоне." } },
  ],
  counts: [1, 2, 4],
  compare: true,
  initialState: () => ({ mode: "design", placement: "forearm", style: "fine-line", size: "medium", idea: "", healed: false, resolution: "1k", count: 1, note: "" }),
  check: (s) => (s.mode === "describe" && !s.idea.trim()
    ? { en: "Describe the tattoo first.", ru: "Сначала опишите татуировку." } : null),
  priceModel: () => MODEL,
  label: (s, tx) => [tx(PLACEMENTS.find((p) => p.id === s.placement)?.label), s.mode === "describe" ? tx(STYLES.find((x) => x.id === s.style)?.label) : ""].filter(Boolean).join(" · "),
};
