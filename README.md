# Việt Nam 3D — Chạm vào một dải non sông

Bản đồ 3D tương tác **34 tỉnh, thành Việt Nam sau sáp nhập 01/07/2025**.
Rê chuột qua từng tỉnh, một **địa danh biểu tượng dạng 3D low-poly mọc lên** —
Khuê Văn Các, Cầu Vàng, Vịnh Hạ Long, thác Bản Giốc, chợ nổi Cái Răng,
sen Tháp Mười, Đất Mũi Cà Mau… đủ 34 địa danh, kèm thông tin sáp nhập,
dân số, diện tích. Có đầy đủ **Quần đảo Hoàng Sa và Quần đảo Trường Sa**.

Một sản phẩm demo của [holetex.com](https://holetex.com).

> Video demo 2K không nằm trong repo (Cloudflare Pages giới hạn 25 MiB/file).
> Có thể tự dựng lại bằng script ở mục [Quay video demo](#quay-video-demo) bên dưới.

## Chạy

```bash
node serve.mjs
# mở http://localhost:4173
```

Không cần build, không cần dependency — Three.js đã bundle sẵn trong `vendor/`.

## Điều khiển

| Thao tác | Hiệu ứng |
|---|---|
| Rê chuột lên tỉnh | Tỉnh nổi lên + địa danh 3D mọc lên + thẻ thông tin |
| Kéo chuột | Xoay bản đồ |
| Lăn chuột | Thu phóng |
| Nhấp vào tỉnh | Camera bay tới gần |
| Nhấp ra biển / Esc | Bay về toàn cảnh |
| `?demo=1` | Tour tự động Bắc → Nam (dùng để quay video) |

## Quay video demo

```bash
npm i playwright && npx playwright install chromium
node record-demo.mjs   # xuất WebM 2560×1440, ~60s
ffmpeg -i video-out/*.webm -c:v libx264 -crf 18 -pix_fmt yuv420p -movflags +faststart demo.mp4
```

## Kỹ thuật

- **Three.js** (vendored): ExtrudeGeometry từ ranh giới GeoJSON, đổ bóng mềm,
  tone mapping ACES, sương mù, biển sóng vertex-animation, hạt sáng.
- **34 địa danh** dựng thủ công từ khối cơ bản (box/cone/cylinder/sphere)
  trong [landmarks.js](landmarks.js) — mỗi tỉnh một diorama.
- **Dữ liệu ranh giới**: [Free-GIS-Data](https://github.com/nguyenduy1133/Free-GIS-Data)
  (34 tỉnh sau 2025), đơn giản hóa Douglas-Peucker xuống ~5.000 điểm (87KB).
  Đã vá một lỗi dữ liệu gốc (Đồng Tháp bị gán nhầm thuộc tính Lạng Sơn).
- Phiên bản đầu tiên (v1) — quốc kỳ dệt từ tên 34 tỉnh thành với vật lý
  con lắc — nằm trong [v1/](v1/), cảm hứng từ
  [world-cup-letter-flags](https://github.com/amirmushichge/world-cup-letter-flags).
