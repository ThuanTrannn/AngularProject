#Module 3
## ================== Bài 1 ======================
Dependency Injection (DI): Là một mô hình quan trọng trong lập trình Angular.
 - Giúp quản lý cung cấp các đối tượng (dependencies) mà một component và service cần để hoạt động. 
 - Làm giảm sự phụ thuộc trực tiếp vào các component và tạo ra các ứng dụng linh hoạt, dễ bảo trì.

 1. Provider: Đối tượng định nghĩa dependency được tạo ra và cung cấp. Có nhiều provider.
    - Ví dụ: useClass, useValue, useFactory

 2. Injector: Là một hệ thống quản lý các dependency và cung cấp chúng khi cần. Injector được sử dụng để inject các dependency vào các component, service hoặc module. Có trách nhiệm tạo đối tượng cung cấp service và inject chúng vào Consumer(Component, service...)
 
 3. NgModule: Là một cách tổ chức ứng dụng thành các module. Mỗi NgModule có thể có một injector riêng. Quản lý các dependency của module đó.

 4. Dependency Tree: Angular xây dựng một cây phụ thuộc (dependency tree) cho ứng dụng, nơi mà mỗi thành phần chỉ định các dependency của nó. Khi một component cần một dependency Angular sẽ tìm trong cây và cung cấp nó.

 5. Dependency là một đối tượng được inject vào component (object có thế là service, function, ... nào đó). 

## Trong ví dụ bên dưới. DataService là một dependency được inject vào ExamComponent thông qua constructor. Angular sẽ tự động xác định để tạo và cung cấp một instance (yêu cầu) của DataService khi ExamComponent được khởi tạo.
// Định nghĩa một service
class DataService {
  getData() {
    return 'Data from the service';
  }
}

// Sử dụng DI để inject service vào component
@Component({
  selector: 'app-example',
  template: 'Data: {{ data }}',
})
class ExampleComponent {
  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.data = this.dataService.getData();
  }
}


RxJS (Reactive Extensions for Javascript) là một thư viện lập trình của reactive programming (lập trình ứng dụng) cho Javascript, và nó được sử dụng rộng dãi trong Angular để xử lý các tác vụ không đồng bộ và quản lý luồng dữ liệu. RxJS thường được sử dụng để làm việc với các sự kiện HTTP requests, và các tác vụ không đồng bộ khác trong ứng dụng Angular.
Có khá nhiều concept trong Angular sử dụng đến RxJS như là Forms, HttpClient, hay như là QueryList, EventEmitter, etc.
- Một số khái niệm cơ bản của RxJS và cách nó sử dụng trong Angular.

 1. Observable: Là một loại đối tượng mà bạn có thể subscribe để theo dõi và xử lý các sự kiện hoặc giá trị được phát ra theo thời gian. Observable có thể phát ra nhiều giá trị, hoặc chỉ có một giá trị, hoặc không có giá trị nào.
 2. Observer: Là một đối tượng có các phương thức để xử lý các sự kiện được phát ra từ một Observable. Các phương thức chính là next() để xử lý giá trị mới. error() để xử lý lỗi, và complete() để xử lý khi Observable hoàn thành.
 3. Operator: Là các hàm được xử dụng để xử lý và biến đổi dữ liệu trong các Observable. RxJS cung cấp nhiều operators như map, filter, merge, concat và nhiều operators khác để thực hiện các thao tác như lọc, biến đổi, kết hợp và chuyển đổi dữ liệu.
 4. Subscription: Là quá trình kết nối một Observer với một Observable. Subcription có thể quản lý để hủy đăng ký (unsubcribe) khi không cần theo dõi nữa. giúp tránh rò rỉ bộ nhớ.
 5. Schedulers: Một scheduler sẽ điều khiển khi nào một subscription bắt đầu thực thi, và khi nào sẽ gửi tín hiệu đi.