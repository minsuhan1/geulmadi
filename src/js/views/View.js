import Swal from 'sweetalert2';

export default class View {
  /* 오류 메시지 표시 */
  renderError(message) {
    Swal.fire({
      title: '오류',
      text: message,
      icon: 'error',
    });
  }
  /* 성공 메시지 표시 */
  renderSuccessMessage(message) {
    Swal.fire({
      title: '완료',
      text: message,
      icon: 'success',
      timer: 2000,
    });
  }

  /* 버튼 로딩 스피너 표시 및 제거 */
  toggleButtonSpinner() {}
}
