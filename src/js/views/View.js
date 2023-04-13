import Swal from 'sweetalert2';

export default class View {
  renderError(message) {
    Swal.fire({
      title: '오류',
      text: message,
      icon: 'error',
    });
  }
  renderSuccessMessage(message) {
    Swal.fire({
      title: '완료',
      text: message,
      icon: 'success',
      timer: 2000,
    });
  }
}
