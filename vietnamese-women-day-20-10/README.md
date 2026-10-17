# 🌸 Trang Web Bày Tỏ Tình Cảm & Chúc Mừng 20/10 🌸
> **Dành tặng người con gái đặc biệt nhất nhân ngày Phụ Nữ Việt Nam 20/10**

Một trang web kỷ niệm và bày tỏ tình cảm được thiết kế hoành tráng, lãng mạn với hiệu ứng thị giác 3D sống động (Three.js), hoạt ảnh vector SVG và âm thanh du dương.

---

## ✨ Điểm Nổi Bật Của Trang Web

1. **Tone Màu Chủ Đạo**: Trắng tinh khôi & Hồng hoa anh đào (Sakura Pink), kết hợp ánh vàng Rose Gold và sắc tím Lavender mộng mơ theo phong cách Glassmorphism sang trọng.
2. **Đồ Họa 3D Three.js Chân Thực**:
   - **Trái tim hạt sáng 3D**: Hơn 3.800 hạt tinh tú pha lê đập theo nhịp tim, có thể tương tác xoay 360 độ bằng chuột hoặc cảm ứng trên điện thoại.
   - **Mưa cánh hoa hồng rơi**: Các cánh hoa hồng 3D uốn cong tự nhiên, chao liệng và xoay trong gió với hiệu ứng vật lý.
   - **Dải ngân hà lấp lánh**: Bầu trời sao mờ ảo tạo chiều sâu vô tận.
   - **Vụ nổ tình yêu**: Nhấp đúp hoặc bấm nút để bung tỏa sóng xung kích hạt sáng rực rỡ.
3. **Hiệu Ứng Vector SVG & Background Động**:
   - Nền cực quang (Aurora Glow) chuyển động mềm mại liên tục.
   - Đóa hồng nở và bướm dạ quang vỗ cánh bay lượn quanh màn hình.
   - Pháo hoa hình trái tim nổ bừng sáng khi bấm hoặc thả điều ước.
4. **Bức Thư Tình 3D Độc Đáo (Phong Bì Niêm Phong & Thiệp Gập 2 Cánh 3D)**:
   - **Giai đoạn 1**: Chiếc phong bì 3D niêm phong bằng con dấu sáp hình trái tim đập nhịp nhàng. Khi chạm vào con dấu sáp, nắp phong bì lật mở 3D, lá thư trượt lên cao và âm nhạc vang lên du dương.
   - **Giai đoạn 2**: Phong bì chuyển đổi sang **Thiệp Gập 2 Cánh 3D (3D Folding Book Card)** với cánh trái là khung ảnh nghệ thuật, câu quote ngọt ngào cùng các tag đáng yêu; cánh phải là nội dung tâm thư nhiều trang hỗ trợ nút gõ chữ máy (Typewriter), lật trang (`Trang tiếp theo ➔`) và nút gập/mở thiệp 3D (`📖 Gập thiệp`).
5. **Hiệu Ứng Kim Cương Pha Lê & Sóng Hào Quang (Không dùng Emoji)**:
   - Thay thế hoàn toàn các emoji mặc định bằng thuật toán vẽ vector: ngôi sao 4 cánh & 8 cánh lấp lánh (✦), mảnh tinh thể pha lê và vầng sóng hào quang vàng hồng bung tỏa rực rỡ.
6. **Bộ Font Chữ Tuyệt Đẹp Chuẩn Tiếng Việt**:
   - **Dancing Script**: Nét chữ viết tay mềm mại, lãng mạn và bay bổng.
   - **Cormorant Garamond**: Font có chân thanh lịch, quý phái chuẩn phong cách thiệp cưới cao cấp.
   - **Quicksand**: Font thân bài hiện đại, tròn trịa, dễ đọc và hiển thị chuẩn 100% dấu tiếng Việt.
7. **Âm Thanh Lãng Mạn (Web Audio API Synthesizer)**:
   - Tích hợp sẵn bộ tổng hợp giai điệu hộp nhạc / piano êm ái tự động phát (không lo lỗi link nhạc MP3 hỏng).
   - Có nút bật/tắt nhạc với visualizer sóng nhạc nhảy múa.
   - Hỗ trợ đổi file nhạc MP3 tùy chọn trong file cấu hình.

---

## 📁 Cấu Trúc Thư Mục

```
vietnamese-women-day-20-10/
├── index.html            # Giao diện chính hoàn chỉnh
├── assets/               # Thư mục lưu ảnh và nhạc riêng của bạn (photo1.jpg, photo2.jpg, photo3.jpg)
├── css/
│   └── style.css         # Toàn bộ hiệu ứng CSS, Glassmorphism, Responsive & Font
├── js/
│   ├── config.js         # ⭐ FILE CẤU HÌNH DUY NHẤT: Đổi tên, lời chúc, 3 ảnh, nhạc
│   ├── music.js          # Bộ phát âm thanh Web Audio API & hiệu ứng chuông ngân
│   ├── three-scene.js    # Không gian 3D Three.js (Trái tim hạt, Cánh hoa hồng, Sao)
│   ├── fireworks.js      # Hệ thống pháo hoa hình trái tim, đèn trời & confetti
│   └── main.js           # Điều khiển tương tác, mở thư, gõ chữ, hiệu ứng lấp lánh
└── README.md             # Hướng dẫn chi tiết & cách chia sẻ
```

---

## 💖 Cách Tùy Biến Lời Chúc & Thêm Ảnh Vào 3 Cột (Rất Dễ)

Tất cả mọi thông tin cá nhân của bạn và người ấy được tập trung hoàn toàn trong file **`js/config.js`**. Bạn chỉ cần mở file này bằng Notepad hoặc bất kỳ trình soạn thảo code nào và chỉnh sửa:

### 1. Đổi tên và nội dung thư tình:
Mở `js/config.js`:
```javascript
const CONFIG = {
  // Tên người ấy
  recipientName: 'Cô Gái Tuyệt Vời Của Anh',

  // Tên của bạn
  senderName: 'Người Luôn Yêu & Che Chở Cho Em',

  // Dòng chữ gõ máy ở đầu trang
  heroSubtitle: 'Giữa hàng tỷ vì sao trong dải ngân hà, nụ cười của em là ánh sáng rực rỡ và ấm áp nhất...',

  // Tiêu đề bức thư
  letterTitle: 'Gửi Thiên Thần Nhỏ Của Anh,',

  // Toàn bộ nội dung tâm thư
  letterBody: `Nhân ngày Phụ Nữ Việt Nam 20/10, anh muốn gửi trọn đến em tất cả những tình cảm chân thành...`,

  letterClosing: 'Yêu và thương em thật nhiều ❤️',
...
```

### 2. Thêm ảnh vào 3 khung Polaroid:
- **Bước 1**: Copy 3 bức ảnh của bạn và người ấy vào thư mục `assets/` với tên lần lượt là `photo1.jpg`, `photo2.jpg`, `photo3.jpg` (hoặc `.png`).
- **Bước 2**: Trong `js/config.js`, điền đường dẫn ảnh:
```javascript
  photos: {
    photo1: 'assets/photo1.jpg',
    photo2: 'assets/photo2.jpg',
    photo3: 'assets/photo3.jpg'
  },
  captions: {
    caption1: 'Đóa hoa ngát hương cho em',
    caption2: 'Hoàng hôn dịu ngọt cùng nhau',
    caption3: 'Vạn vì sao thắp sáng ước mơ'
  }
```
*(Nếu để trống `''`, hệ thống sẽ tự động hiển thị 3 bức tranh minh họa hoa hồng và hoàng hôn cực kỳ lãng mạn).*

### 3. Đổi nhạc nền MP3 riêng (Tùy chọn):
Nếu bạn muốn dùng một bài hát kỷ niệm riêng, chỉ cần chép file MP3 vào thư mục `assets/music.mp3` rồi điền vào `js/config.js`:
```javascript
  customMusicUrl: 'assets/music.mp3'
```
*(Nếu để trống `''`, trang web sẽ tự động sử dụng bản nhạc piano hộp nhạc du dương tích hợp sẵn).*

---

## 🚀 Cách Chạy & Trải Nghiệm Trên Máy Tính

1. Nhấp đúp chuột trực tiếp vào file `index.html` để mở trong trình duyệt bất kỳ (Chrome, Edge, Cốc Cốc, Safari, Firefox).
2. Khi mở hoặc tải lại trang, trang web sẽ luôn tự động cuộn lên đầu trang.
3. Khi cuộn tới bức thư và bấm con dấu sáp vàng son **💌 MỞ THƯ**, âm nhạc du dương sẽ vang lên và các hiệu ứng bung nở.

---

## 🌐 Hướng Dẫn Public & Đưa Lên Mạng Để Gửi

Để gửi link web này cho người ấy , bạn có thể sử dụng các cách hoàn toàn **miễn phí 100%** sau:

### Cách 1: Tải lên Netlify Drop (Cực nhanh - Không cần biết lập trình, 30 giây là có link)
1. Truy cập trang web: [app.netlify.com/drop](https://app.netlify.com/drop) (hoặc đăng ký tài khoản miễn phí tại [netlify.com](https://www.netlify.com)).
2. Kéo thả nguyên thư mục `vietnamese-women-day-20-10` vào ô chữ nhật trên màn hình.
3. Chờ 5-10 giây, Netlify sẽ tạo cho bạn một đường link web online (ví dụ: `https://tang-em-yeu-20-10.netlify.app`).
4. Bạn có thể bấm **Site settings** -> **Change site name** để đổi tên link theo ý muốn (ví dụ: `tang-lan-anh-20-10.netlify.app`) rồi gửi link cho người ấy!

### Cách 2: Tải lên Vercel (Rất mượt và bảo mật cao)
1. Đăng ký tài khoản tại [vercel.com](https://vercel.com).
2. Kéo thả thư mục dự án lên hoặc kết nối với GitHub.
3. Bấm **Deploy**. Sau 10 giây bạn sẽ nhận được đường link dạng `https://tang-em-20-10.vercel.app`.

---

*Chúc hai bạn có một ngày 20/10 ngập tràn niềm vui, ngọt ngào và hạnh phúc trọn vẹn! 🌹*
