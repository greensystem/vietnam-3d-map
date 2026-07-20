# Hướng dẫn triển khai dự án lên GitHub Pages

Tài liệu này hướng dẫn chi tiết cách đưa dự án bản đồ 3D **inVietnam** lên **GitHub Pages** để chạy trực tuyến và chia sẻ với mọi người.

Vì dự án sử dụng HTML/CSS/JS tĩnh thuần túy (không qua bước build phức tạp), việc triển khai rất nhanh chóng.

---

## Mục lục
1. [Bước 1: Đẩy mã nguồn lên GitHub](#bước-1-đẩy-mã-nguồn-lên-github)
2. [Bước 2: Cấu hình GitHub Pages](#bước-2-cấu-hình-github-pages)
   * [Cách 1: Triển khai trực tiếp từ Nhánh (Khuyên dùng - Đơn giản nhất)](#cách-1-triển-khai-trực-tiếp-từ-nhánh-khuyên-dùng---đơn-giản-nhất)
   * [Cách 2: Triển khai bằng GitHub Actions (Tự động & Chuyên nghiệp)](#cách-2-triển-khai-bằng-github-actions-tự-động--chuyên-nghiệp)
3. [Bước 3: Cấu hình Tên miền riêng (Custom Domain - Tùy chọn)](#bước-3-cấu-hình-tên-miền-riêng-custom-domain---tùy-chọn)
4. [Lưu ý kỹ thuật quan trọng](#lưu-ý-kỹ-thuật-quan-trọng)

---

## Bước 1: Đẩy mã nguồn lên GitHub

Nếu dự án của bạn chưa có trên GitHub, hãy làm theo các bước sau để đẩy code lên:

1. **Tạo một Repository mới trên GitHub**:
   * Truy cập [GitHub](https://github.com/) và đăng nhập.
   * Nhấn nút **New** (hoặc dấu `+` ở góc trên cùng bên phải -> **New repository**).
   * Đặt tên repository (ví dụ: `invietnam`).
   * Chọn chế độ hiển thị là **Public** (bắt buộc đối với tài khoản GitHub miễn phí để dùng GitHub Pages).
   * **Không** tích chọn "Add a README file", "Add .gitignore" hay "Choose a license" (vì dự án của bạn đã có sẵn các file này).
   * Nhấn **Create repository**.

2. **Đẩy code từ máy tính lên GitHub**:
   * Mở Terminal tại thư mục dự án (`invietnam`).
   * Chạy các lệnh sau:
     ```bash
     # Khởi tạo git (nếu chưa khởi tạo)
     git init

     # Thêm tất cả các file vào git track
     git add .

     # Commit code lần đầu
     git commit -m "Initial commit"

     # Đổi tên nhánh chính thành main
     git branch -M main

     # Liên kết với repository trên GitHub (Thay <username> và <repository-name> bằng tài khoản của bạn)
     git remote add origin https://github.com/<username>/<repository-name>.git

     # Đẩy code lên GitHub
     git push -u origin main
     ```

---

## Bước 2: Cấu hình GitHub Pages

Bạn có thể chọn 1 trong 2 cách sau để triển khai trang web.

### Cách 1: Triển khai trực tiếp từ Nhánh (Khuyên dùng - Đơn giản nhất)

Đây là cách mặc định và dễ nhất dành cho dự án web tĩnh.

1. Trên giao diện Repository của bạn trên GitHub, nhấn vào tab **Settings** (Cài đặt) ở thanh menu trên cùng.
2. Ở thanh menu bên trái, tìm và chọn mục **Pages**.
3. Tại phần **Build and deployment**:
   * **Source**: Chọn `Deploy from a branch`.
   * **Branch**: Chọn nhánh `main` (hoặc nhánh chứa code của bạn) và chọn thư mục `/ (root)`.
4. Nhấn nút **Save**.
5. Đợi khoảng 1-2 phút, GitHub sẽ tạo link trang web của bạn (ví dụ: `https://<username>.github.io/<repository-name>/`). Bạn có thể F5 lại trang Settings để thấy đường link này xuất hiện ở trên cùng.

---

### Cách 2: Triển khai bằng GitHub Actions (Tự động & Chuyên nghiệp)

Cách này sẽ cấu hình một quy trình tự động (Workflow). Mỗi khi bạn đẩy code mới lên nhánh `main`, hệ thống sẽ tự động đóng gói và deploy giúp bạn.

1. Dự án đã được cấu hình sẵn file workflow tại đường dẫn `.github/workflows/deploy.yml`.
2. Trên giao diện Repository của bạn trên GitHub, vào tab **Settings** -> **Pages**.
3. Tại phần **Build and deployment**:
   * **Source**: Chọn `GitHub Actions`.
4. Kể từ lúc này, mỗi khi bạn chạy lệnh `git push origin main`, GitHub Actions sẽ tự chạy tiến trình deploy. Bạn có thể theo dõi tiến trình này ở tab **Actions** trên GitHub.

---

## Bước 3: Cấu hình Tên miền riêng (Custom Domain - Tùy chọn)

Nếu bạn có tên miền riêng (ví dụ: `invietnam.vn` hoặc `map.invietnam.vn`) và muốn sử dụng nó thay vì tên miền mặc định của GitHub:

1. **Cấu hình DNS tại nhà cung cấp tên miền của bạn**:
   * Thêm các bản ghi **A** trỏ về địa chỉ IP của GitHub Pages:
     * `185.199.108.153`
     * `185.199.109.153`
     * `185.199.110.153`
     * `185.199.111.153`
   * (Hoặc nếu dùng subdomain như `map.invietnam.vn`) Thêm bản ghi **CNAME** trỏ về `<username>.github.io`.

2. **Cấu hình trên GitHub**:
   * Vào **Settings** -> **Pages**.
   * Tại mục **Custom domain**, nhập tên miền của bạn (ví dụ: `invietnam.vn` hoặc `map.invietnam.vn`).
   * Nhấn **Save**. Một file `CNAME` sẽ tự động được tạo ra ở thư mục gốc của repository của bạn (nếu dùng Cách 1) hoặc bạn có thể tự tạo file `CNAME` trong project chứa tên miền của mình để tránh bị ghi đè khi push code.
   * Tích chọn **Enforce HTTPS** để trang web chạy dưới giao thức bảo mật `https://`.

---

## Lưu ý kỹ thuật quan trọng

* **Đường dẫn tương đối (Relative paths)**: 
  GitHub Pages chạy dự án của bạn dưới một thư mục con (`https://<username>.github.io/<repository-name>/`).
  Dự án này đã được kiểm tra và cấu hình sẵn toàn bộ đường dẫn tương đối (ví dụ: `./vendor/...`, `main.js`, `style.css` thay vì bắt đầu bằng `/vendor/...` hay `/main.js`). Điều này đảm bảo trang web của bạn không bị lỗi 404 khi load tài nguyên trên GitHub Pages.
* **Tên tệp tin viết hoa/thường**:
  GitHub Pages phân biệt chữ hoa và chữ thường trong đường dẫn (Case-sensitive). Hãy đảm bảo tên các tệp tin trong code (như `province-shapes.js`, `images/ha-noi.jpg`,...) trùng khớp hoàn toàn với tên tệp vật lý trên đĩa để tránh lỗi không tìm thấy file.
