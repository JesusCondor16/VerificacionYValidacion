import Swal from "sweetalert2";

export const Toast = ({
  toast,
  position,
  showConfirmButton,
  timer,
  timerProgressBar,
  icon,
  title,
}) => {
  const Toast = Swal.mixin({
    toast,
    position,
    showConfirmButton,
    timer,
    timerProgressBar,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  Toast.fire({
    icon,
    title,
  });
};
