# Interactive 3D Map Guide & Data Architecture

This guide explains the data integration and front-end architecture of the **inVietnam** Interactive 3D Map.

## Overview
The application showcases a 3D extruded map of Vietnam's provinces. Users can hover and click on provinces to display rich local travel guidelines on a dynamic info card (sidebar).

---

## Data Integration & Architecture

To optimize performance and simplify state management, the travel guide details (originally in `province-details.js`) have been merged directly into the geographical shapes data structure (`province-shapes.js`).

### `PROVINCE_SHAPES` Structure
Each item in the exported `PROVINCE_SHAPES` array now represents a unified province object with the following fields:

```javascript
{
  "name": "An Giang",                       // Name of the province
  "type": "Tỉnh" | "Thành phố",             // Administrative type
  "merged": "An Giang, Kiên Giang",         // Historical merger details
  "pop": 4995214,                           // Population
  "area": 9987,                             // Area in km2
  "polys": [[ [lon, lat], ... ], ...],     // Coordinates array for 3D extrusion
  
  // --- Integrated Travel Details ---
  "image": "images/an-giang.jpg",           // Representative local image path
  "detailDesc": "Miếu Bà Chúa Xứ Núi Sam...",// Detailed local description
  "experiences": [                          // Bullet list of signature local experiences
    "Đi xuồng máy xuyên rừng tràm Trà Sư...",
    ...
  ],
  "foods": ["Lẩu mắm Châu Đốc", ...]        // List of famous local cuisines
}
```

---

## UI Components & Rendering

The Card sidebar (`#card`) updates dynamically on province hover (desktop) or click (desktop/mobile).

### HTML Structure (`index.html`)
The Card utilizes standard HTML5 semantic tags:
- `.card-image`: Displays the cover photo of the province.
- `.card-landmark`: Displays the 3D landmark title (from `landmarks.js`) if present.
- `.card-desc`: Renders the detailed description (`detailDesc`).
- `.card-experiences-list`: An unordered list listing the `experiences`.
- `.card-foods-tags`: Flexbox container styling cuisines as tags.
- `.card-facts`: Bottom section displaying area, population, and historical mergers.

### Javascript Logic (`main.js`)
The `showCard(p)` function handles dynamic DOM updates:
- Resolves landmarks matching the province name via `LANDMARKS[p.name]`.
- Resets and populates the experiences list (`#card-experiences`) and food tags (`#card-foods`).
- Controls visibility of sections dynamically if data is missing or empty.
- Automatically adjusts layout to hide image containers and lists when displaying islands (e.g., Hoàng Sa & Trường Sa) in `showIslandCard(trip)`.

---

## Localization & Translation System

The application supports bilingual switching (Vietnamese/English) dynamically via the `#lang-toggle` button.

### Localization Resources
- **UI Strings**: Main statically compiled layout strings (such as page title, descriptions, headings) are defined in `UI_STRINGS` inside [main.js](file:///Users/admin/Documents/Sources/www/wwwroot/invietnam/main.js).
- **Province Details (English)**: English translations for each province's `detailDesc`, `experiences`, and `foods` are configured in [province-details-en.js](file:///Users/admin/Documents/Sources/www/wwwroot/invietnam/province-details-en.js).
- **Province Names (`PROVINCE_NAME_EN`)**: An internal map translating all province names (including sub-provinces or merged territories) from Vietnamese to English.
- **Landmark Names (`LANDMARK_NAME_EN`)**: An internal map translating 3D landmark titles (e.g., "Khuê Văn Các" to "Khue Van Cac Pavilion") from Vietnamese to English.

### Formatting Adaptations
When English is selected, the application adjusts numeric formats dynamically:
- **Population**: Formatted as standard English decimal notation (`X.XX million people` instead of the Vietnamese `X,XX triệu dân`).
- **Area**: Formatted with standard comma digit grouping (`XX,XXX km²` via `en-US` locale instead of dot grouping `XX.XXX km²` via `vi-VN` locale).
- **Island Excursion Cards**: Translates the labels ("Hoàng Sa" / "Trường Sa" to "Hoang Sa" / "Truong Sa") and jurisdiction status dynamically.

---

## Performance Optimizations
- **Static Extrude Proxy**: Raycasting uses a flat, hidden mesh proxy at $y=0$ to prevent cursor flickering when hovering near borders where the extruded bevels overlap.
- **Unified Payload**: Integrating travel details directly into `province-shapes.js` reduces script imports and resolves discrepancies between geographical keys and localized metadata.
