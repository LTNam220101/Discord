# Discord
## This project was bootstrapped with [Vite]
To run this project, follow the instructions:

1. ### `yarn`
2. ### `yarn run dev`

# Cài CI/CD với Jenkins

Hướng dẫn chi tiết có ở trong báo cáo, dưới đây là các bước cài đặt 

1. Cài môi trường JenKins
   https://www.jenkins.io/download/
   Hường dân cài: https://helpex.vn/article/cach-cai-dat-jenkins-tren-windows-60999689e271d3a4bc44f4d6
3. Cài ngrok để public server ra môi trường bên ngoài
   [ngrok - download](https://ngrok.com/download)https://ngrok.com/download
4. Kết nối Jenkin với github
   -	Vào repo git chon Setting -> Ưebhook => Create..
   -	Nhập link url thay thế vào mục URL (thêm '/github-webhook/' vào cuối link)
5. Đăng nhập vào Jenkin
   - Chọn New Item => điền tên project => freestyle project
   - Tại thư mục Source Code Management chọn git
   -	Điền link git hub 
   -	Chọn nhánh lấy code ở mục Branches to build
   -	Tại mục Build Triggers => Gitbub hook….
   -	Chọn lưu
6. Tích hợp Jenkins với github bằng Jenkinsfile
   - Thêm thư mục Jenkinsfile vào code
   - Mở Jenkin chọn New Item =>  Pipeline 
   - Tại mục Build Triggers => Gitbub hook….
   - Tại mục Pipeline chọn Definition => Pipeline script form SCM
		  + SCM => git
		  + Điền link git
   - Chọn lưu
   - lần đầu tiền build ta phải chạy bẳng tay Chọn Build Now
7. Tích hợp docker cho jenkins
   - Tại trang chủ chọn Manage Jenkins => Plugins
   - Chọn Avaliable plugins => search docker => chọn Docker pipeline => install
   - Cấu kình kết nối Jenkins với dockerHub
      +	Chọn Pipeline cần kết nối
      +	Chọn Pipeline Syntax dùng để render cú pháp cho file Jenkensfile
      +	Tại Step => Sample step => withDokerRegidtry….
      +	Tại Docker registry URL chọn biểu tượng dấu ? copy đường link paste vào
      +	Tại Registry credentials => add => điền username và password của dockerhub của bạn, Id và description và chọn add
      + Tại Registry credentials chọn ID mà mình vừa điền
      + Tại Registry credentials => add => điền username và password của dockerhub của bạn, Id và description và chọn add
      +	Tại Registry credentials chọn ID mà mình vừa điền
8. Kết nối jenkins cho server
   - Tại trang chủ chọn Manage Jenkins => Plugins
   - Chọn Avaliable plugins => search ssh => chọn Publish over ssh  => install
   - Tại trang chủ chọn Manage Jenkins => Systerm
      +	Tại Publish over SSH 
      +	Tạo public/private key cho máy chủ bạn chạy
      +	Gán private key vào ô key
      +	Tại SSH server
      	  Name: Đặt tuỳ theo ý thích
          HostName: địa chỉ ip của VPS
          Username: root
      +	Chọn Test configuration để kiển tra kết nối thành công hay chưa
      +	Chọn lưu lại
    - Cấu kình kết nối Jenkins với SSH
      +	Chọn Pipeline cần kết nối
      +	Chọn Pipeline Syntax dùng để render cú pháp cho file Jenkensfile
      +	Tại Step => Sample step => sshPublisher: Send build artifacts orve SSh
      +	Tại Transfers set =>source files nhập ’package.json’
      +	Tại Exec command => nhập ‘cd package.json package-demo.json’
      +	Chọn Generate Pipeline Script


  
