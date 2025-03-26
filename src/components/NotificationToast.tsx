// components/NotificationToast.js

import Swal from 'sweetalert2';

interface Notifications {
  color?: 'primary' | 'success' | 'danger' | 'warning';
  duration?: number;
  message?: string;
  position?: 'top-end' | 'top-start' | 'top' | 'bottom-end' | 'bottom-start' | 'bottom' | 'center';
}

/**
 * NotificationToast - Componente de notificação reutilizável
 *
 * Esse componente utiliza o SweetAlert2 para exibir notificações customizáveis de estilo "toast".
 * As notificações podem ser configuradas para diferentes cores, duração, mensagem e posição na tela.
 *
 * @param {Notifications} config - Objeto de configuração para a notificação
 * @param {string} [config.color='primary'] - Cor do toast; valores aceitos são 'primary', 'success', 'danger' ou 'warning'
 * @param {number} [config.duration=3000] - Duração da exibição do toast em milissegundos
 * @param {string} [config.message=''] - Mensagem de texto a ser exibida no toast
 * @param {string} [config.position='top-end'] - Posição do toast na tela; valores aceitos incluem 'top', 'bottom', 'center', etc.
 *
 * @example
 * NotificationToast({
 *   color: 'success',
 *   duration: 5000,
 *   message: 'Operação realizada com sucesso!',
 *   position: 'bottom-start'
 * });
 */

const NotificationToast = ({ color = 'primary', duration = 3000, message = '',position = 'top-end' }: Notifications) => {
  const toast = Swal.mixin({
    toast: true,
    position: position,
    showConfirmButton: false,
    timer: duration,
    background: '#000',
    showCloseButton: true,
    customClass: {
      popup: `custom-swal-popup custom-swal-${color}`,
    },
});
toast.fire({
    title: message,
});
};

export default NotificationToast;
