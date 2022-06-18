import Swal from 'sweetalert2'

export const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary mr20',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})
