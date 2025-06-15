import ToastContent from "@/components/_shared/toast/ToastContent";
import { fetch } from "@/utils/baseFetch";
import { useMutation } from "@tanstack/react-query";
import { Bounce, toast } from "react-toastify";

export function useLoginMutation({ successAction }) {
  const loginMutation = useMutation({
    mutationFn: (data) =>
      fetch({
        method: "post",
        url: `/auth/login`,
        payload: data.payload,
        options: {
          excludeShowErrorStatusCode: [404],
        },
      }),
    onSuccess: (data) => {
      if (data?.status === 200 || data?.status === 201) {
        successAction();
        toast.success(<ToastContent title={"Login berhasil!"} />, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.warn(<ToastContent title={"Login gagal!"} description={`${data?.code}: ${data?.message}`} />, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    },
    onError: (error) => {
      toast.error(
        <ToastContent
          title={"Terjadi kesalahan!"}
          description={`${error?.error?.name || error?.code}: ${error?.error?.message || error?.message}`}
        />,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
    },
  });

  return { loginMutation };
}
