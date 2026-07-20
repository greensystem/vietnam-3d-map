# inVietnam — Chạm vào một dải non sông 
Ứng dụng cho phép người dùng khám phá dải non sông đất nước qua giao diện 3D trực quan, tương tác mượt mà, cùng hành trình khám phá văn hóa, ẩm thực, và biển đảo quê hương.

---

## 🌟 Các tính năng nổi bật

### 1. Bản đồ 3D tương tác sinh động
- Sử dụng **Three.js** để dựng ranh giới 3D (extruded map) từ dữ liệu địa lý đã được tối ưu hóa.
- Mỗi tỉnh, thành đều đi kèm một **địa danh biểu tượng 3D dạng low-poly dựng thủ công** (Khuê Văn Các, Cầu Vàng, Vịnh Hạ Long, Thác Bản Giốc, Tháp Bà Ponagar, Đất Mũi Cà Mau...). Các địa danh này sẽ mọc lên sống động cùng với hiệu ứng chuyển động (animation) tinh tế khi người dùng rê chuột qua hoặc chọn tỉnh.

### 2. Giao diện Song ngữ (VI / EN) triệt để
Hỗ trợ chuyển đổi ngôn ngữ linh hoạt qua nút chọn ngôn ngữ trên màn hình:
- Tự động dịch toàn bộ thông tin thẻ (tiêu đề, mô tả, trải nghiệm nên thử, ẩm thực địa phương).
- Dịch chuẩn xác danh sách các tỉnh bị hợp nhất hành chính (ví dụ: "Merged from: An Giang, Kien Giang").
- Hỗ trợ đổi định dạng số liệu theo chuẩn quốc tế khi chọn tiếng Anh (ví dụ: dấu phẩy phân cách hàng nghìn cho diện tích, dấu chấm thập phân cho dân số).
- Hiển thị nhãn bản đồ tiếng Anh không dấu cho hai quần đảo thiêng liêng: **Hoang Sa** và **Truong Sa**.

### 3. Chuyến tàu Thống Nhất & Hải trình biển đảo 🚂⚓
Chế độ mô phỏng hành trình trải dài dọc đất nước:
- **Đoàn tàu hỏa Thống Nhất** chạy dọc đường ray Bắc - Nam đi qua các nhà ga chính. Đến mỗi ga, camera sẽ tự động hướng tiêu điểm vào khu vực để người dùng xem thông tin tỉnh lân cận.
- **Hành trình biển đảo**: Từ ga Đà Nẵng và ga Khánh Hòa, người dùng sẽ xuống tàu thủy để thực hiện hải trình tiến ra hai quần đảo **Hoang Sa** và **Truong Sa**. Camera động sẽ di chuyển bám theo tàu trên nền biển xanh.
- Toàn bộ card thông tin của quần đảo được dịch hoàn toàn sang tiếng Anh khi chuyển đổi ngôn ngữ.

### 4. Chế độ Demo tự động
Kích hoạt qua tham số URL `?demo=1` giúp camera chạy tự động tour toàn cảnh từ Bắc vào Nam, thích hợp cho việc trình chiếu hoặc quay video demo sản phẩm.

---

## 🛠️ Cấu trúc thư mục dự án

- [index.html](index.html): Giao diện HTML tĩnh của ứng dụng.
- [main.js](main.js): Logic xử lý trung tâm (khởi tạo Three.js, camera, tương tác raycast, cập nhật UI card, quản lý ngôn ngữ và hành trình tour).
- [landmarks.js](landmarks.js): Định nghĩa mô hình 3D low-poly và hiệu ứng chuyển động cho 34 địa danh biểu tượng.
- [train.js](train.js): Dựng mô hình đoàn tàu hỏa, tàu thủy, đường ray và cấu trúc hải trình biển đảo.
- [province-shapes.js](province-shapes.js): Dữ liệu tọa độ 3D của các tỉnh thành Việt Nam tích hợp cùng thông tin địa lý và du lịch cơ bản.
- [province-details.js](province-details.js) & [province-details-en.js](province-details-en.js): Chi tiết giới thiệu, trải nghiệm đặc trưng và món ngon đặc sản bằng tiếng Việt và tiếng Anh.
- [style.css](style.css): Thiết lập CSS, font chữ và phong cách hiển thị hiện đại cho thẻ thông tin và các nút điều khiển.
- [serve.mjs](serve.mjs): Máy chủ static siêu nhẹ bằng Node.js để chạy ứng dụng local.

---

## 🚀 Hướng dẫn khởi chạy nhanh

Ứng dụng chạy trực tiếp bằng HTML/JS thuần, không yêu cầu cài đặt thư viện nặng hay trình biên dịch phức tạp.

1. **Khởi chạy Local Server**:
   ```bash
   node serve.mjs
   ```
2. **Truy cập ứng dụng**:
   Mở trình duyệt và truy cập: [http://localhost:4173](http://localhost:4173)

---

## 🌐 Triển khai lên GitHub Pages

Ứng dụng này đã được cấu hình và tối ưu hóa để có thể chạy trực tuyến miễn phí thông qua **GitHub Pages**.

Xem chi tiết hướng dẫn từng bước cấu hình tại đây: [Tài liệu hướng dẫn triển khai GitHub Pages (DEPLOYMENT.md)](DEPLOYMENT.md).

---

## 🎮 Hướng dẫn điều khiển

| Thao tác | Hiệu ứng trên giao diện |
|---|---|
| **Rê chuột lên tỉnh** | Tỉnh nổi lên + địa danh 3D xuất hiện + thẻ thông tin cập nhật bên cạnh |
| **Kéo chuột trái** | Xoay bản đồ 3D |
| **Lăn nút cuộn chuột** | Thu phóng (Zoom in / Zoom out) |
| **Nhấp chuột vào tỉnh** | Camera bay tới gần và ghim góc nhìn vào tỉnh đó |
| **Nhấp ra biển / Phím Esc** | Đưa camera quay trở lại góc nhìn toàn cảnh |
| **Nút 🚂 Chuyến tàu Thống Nhất** | Kích hoạt chuyến đi xuyên Việt và tour biển đảo |
| **Nút 🇬🇧 EN / 🇻🇳 VI** | Thay đổi ngôn ngữ hiển thị lập tức |

---

## 🎥 Hướng dẫn quay video Demo tự động

Ứng dụng đi kèm script tự động hóa dùng Playwright để ghi màn hình demo chất lượng cao:

```bash
# Cài đặt công cụ quay
npm i playwright && npx playwright install chromium

# Khởi chạy script quay video (xuất ra WebM độ phân giải 2K 2560×1440, thời lượng ~60s)
node record-demo.mjs

# Chuyển đổi định dạng sang MP4 bằng FFmpeg
ffmpeg -i video-out/*.webm -c:v libx264 -crf 18 -pix_fmt yuv420p -movflags +faststart demo.mp4
```
