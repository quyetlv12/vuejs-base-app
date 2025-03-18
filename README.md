================= KHỞI CHẠY PROJECT =================

1. Clone project

```bash
git clone https://github.com/quyetlv12/vuejs-base-app
```

2. Install dependencies

```bash
npm install
```

3. Run project

```bash
npm run dev
```


================= CẤU HÌNH API =================

1. Cấu hình API trong file `.env`

```bash
API_URL=https://apidemo.toolsdigitel.io.vn/api
```



================= CẤU TRÚC THƯ MỤC =================

```bash
src/
├── auth/ # config httpclient của app ví dụ cấu hình api, token gắn vào header, check token , check lỗi 401 với 403 ...
├── components/ # Thư mục chứa các component chung
├── views/ # chứa các trang của app , ví dụ như phần user, role
├── router/ # Thư mục chứa các file liên quan đến router , ví dụ khi click vào các nút sẽ chuyển hướng đến trang nào thì phải được định nghĩa ở đây
├── service/ # Thư mục chứa các file liên quan đến service dùng để xứ lý thao tác với API ví dụ như get, post, put, delete
├── utils/ # dùng để viết các hàm dùng chung , tái sử dụng hàm thay vì phải viết lại nhiều lần
├── App.vue # file chính của app
├── main.js # dùng để sử dụng các plugin, middleware, router, store, component, ...
├── router/ # chứa các route của project
├── store/ # các state của app sử dụng vuex làm base cho các component
├── layout/ # chứa các phần chung của app ví dụ như header, footer, sidebar





================= THƯ VIỆN SỬ DỤNG =================

- PrimeVue # Thư viện UI
- Vue Router # Quản lý route của app
- Vuex # Quản lý state data dùng chung cho app 
- Axios # Thao tác với API
- Vue Query # Quản lý data và state của app
- Vue Toast # Hiển thị toast message
- Usequery # dùng để sync data giữa client và server (khi lấy dữ liệu dùng useQuery ,  Khi thêm, sửa, xóa dùng useMutation)

