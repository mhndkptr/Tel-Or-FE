import ToastContent from "@/components/_shared/toast/ToastContent";
import { useAuth } from "@/contexts/authContext";
import { decryptIt } from "@/utils/helper";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Bounce, toast } from "react-toastify";

export function useLoginMutation() {
  const router = useRouter();
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const loginMutation = useMutation({
    mutationFn: (data) => login(data.payload.email, data.payload.password),
    onSuccess: (data) => {
      if (data.success) {
        const prev = searchParams.get("prev");
        if (prev) {
          router.push(decryptIt(prev));
        } else {
          router.push(data.redirectPath);
        }
        toast.success(<ToastContent title={"Login berhasil!"} />, {
          position: "top-right",
          autoClose: 3000,
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
          autoClose: 3000,
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
      toast.error(<ToastContent title={"Terjadi kesalahan!"} description={error?.message} />, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    },
  });

  return { loginMutation };
}
