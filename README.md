# 🎮 Website Game Dân Gian Việt Nam

Website chứa 10 trò chơi dân gian và mini-game với trang quản trị để quản lý quảng cáo.

## 📁 Cấu trúc dự án

```
Web_G/
├── index.html              # Trang chủ
├── admin.html              # Trang quản trị
├── assets/
│   ├── css/
│   │   └── style.css      # CSS tùy chỉnh
│   └── js/
│       ├── main.js        # JavaScript cho trang chủ
│       └── admin.js       # JavaScript cho trang admin
├── games/
│   ├── oan-quan.html      # Ô Ăn Quan
│   ├── co-vua.html        # Cờ Vua
│   ├── co-tuong.html      # Cờ Tướng
│   ├── tic-tac-toe.html   # Tic Tac Toe
│   ├── ran-san-moi.html   # Rắn Săn Mồi
│   ├── ping-pong.html     # Ping Pong
│   ├── 2048.html          # 2048
│   ├── flappy-bird.html   # Flappy Bird
│   ├── do-min.html        # Dò Mìn
│   └── brick-breaker.html # Brick Breaker
└── README.md
```

## 🚀 Cách sử dụng

### Mở website

1. Mở file `index.html` bằng trình duyệt web (Chrome, Firefox, Edge...)
2. Website sẽ tự động load danh sách 10 game
3. Click vào game bất kỳ để chơi trong iframe

### Quản lý quảng cáo

1. Click vào link "🔧 Trang Admin" ở header
2. Nhập nội dung quảng cáo vào 2 ô:
   - **Quảng cáo bên trái**: Nội dung hiển thị ở cột trái
   - **Quảng cáo bên phải**: Nội dung hiển thị ở cột phải
3. Có thể nhập:
   - Văn bản thuần
   - HTML (ví dụ: `<img src="...">`, `<a href="...">...</a>`)
   - Link hình ảnh
4. Click "💾 Lưu Quảng Cáo"
5. Quay lại trang chủ để xem quảng cáo đã cập nhật

## 🎯 Tính năng

### Trang chủ (index.html)
- ✅ Layout 3 cột: Quảng cáo trái - Danh sách game + iframe - Quảng cáo phải
- ✅ Danh sách 10 game có thể click
- ✅ Load game vào iframe khi click
- ✅ Tự động load quảng cáo từ localStorage
- ✅ Responsive design (mobile-friendly)
- ✅ UI hiện đại với TailwindCSS

### Trang Admin (admin.html)
- ✅ Form nhập quảng cáo cho 2 vị trí
- ✅ Preview quảng cáo trước khi lưu
- ✅ Lưu vào localStorage
- ✅ Reset về mặc định
- ✅ Thông báo khi lưu thành công

### Games
- ✅ 10 game hoàn chỉnh, có thể chơi ngay
- ✅ Mỗi game là file HTML độc lập
- ✅ Tự chứa CSS và JavaScript
- ✅ Giao diện đẹp, dễ chơi

## 🎮 Danh sách game

1. **Ô Ăn Quan** - Trò chơi dân gian Việt Nam
2. **Cờ Vua** - Trò chơi cờ vua cổ điển
3. **Cờ Tướng** - Trò chơi cờ tướng
4. **Tic Tac Toe** - Cờ ca rô
5. **Rắn Săn Mồi** - Game rắn săn mồi
6. **Ping Pong** - Game bóng bàn
7. **2048** - Game số 2048
8. **Flappy Bird** - Game chim bay
9. **Dò Mìn** - Game dò mìn
10. **Brick Breaker** - Game phá gạch

## 💾 Lưu trữ dữ liệu

Website sử dụng **localStorage** của trình duyệt để lưu:
- `adLeft`: Nội dung quảng cáo bên trái
- `adRight`: Nội dung quảng cáo bên phải

Dữ liệu sẽ được lưu tự động và tồn tại ngay cả khi đóng trình duyệt.

## 🎨 Công nghệ sử dụng

- **HTML5** - Cấu trúc website
- **CSS3** - Styling
- **JavaScript (Vanilla)** - Logic và tương tác
- **TailwindCSS** (CDN) - Framework CSS utility-first
- **localStorage API** - Lưu trữ quảng cáo

## 📱 Responsive Design

Website tự động điều chỉnh layout trên các thiết bị:
- **Desktop**: 3 cột đầy đủ
- **Tablet**: Quảng cáo thu nhỏ, game vẫn hiển thị tốt
- **Mobile**: Layout xếp chồng, tối ưu cho màn hình nhỏ

## 🔧 Tùy chỉnh

### Thêm game mới

1. Tạo file HTML mới trong thư mục `games/`
2. Thêm entry vào mảng `games` trong `assets/js/main.js`:
```javascript
{ id: 'game-id', name: 'Tên Game', file: 'games/game-file.html' }
```

### Thay đổi style

Chỉnh sửa file `assets/css/style.css` hoặc thêm class TailwindCSS trực tiếp trong HTML.

## 📝 Lưu ý

- Website chạy hoàn toàn offline (không cần server)
- Cần mở bằng trình duyệt web (không mở trực tiếp file HTML bằng file explorer)
- Quảng cáo hỗ trợ HTML, có thể nhúng hình ảnh, link, video iframe...
- Mỗi game độc lập, có thể mở riêng lẻ nếu cần

## 🎉 Hoàn thành!

Website đã sẵn sàng sử dụng. Chỉ cần mở `index.html` và bắt đầu chơi game!

