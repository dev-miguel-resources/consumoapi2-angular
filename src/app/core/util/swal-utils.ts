import swal from 'sweetalert2';

export class SwalUtils {

    public static showSuccess(message: string): void {
        swal.fire('Operación Realizada con Éxito', message, 'success');
    }

    public static showCustomError(message: string): void {
        swal.fire('Ha Ocurrido un error', message, 'error');
    }



}