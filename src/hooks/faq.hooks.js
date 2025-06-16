import { fetch } from "@/utils/baseFetch";
import ToastContent from "@/components/_shared/toast/ToastContent";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Bounce, toast } from "react-toastify";
import { useMemo } from "react";

// GET ALL FAQ
export function useGetAllFaq() {
  const { data, isLoading, isPending, refetch } = useQuery({
    queryKey: ["getAllFaq"],
    queryFn: () =>
      fetch({
        method: "get",
        url: `/faqs`,
      }),
    retry: false,
    staleTime: 300000,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onError: (error) => {
      toast.error(
        <ToastContent
          title="Terjadi kesalahan!"
          description={error?.message}
        />,
        {
          position: "top-right",
          autoClose: 3000,
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

  const faqs = useMemo(() => {
    return data?.status === 200 ? data.data : [];
  }, [data]);

  return {
    faqs,
    isLoading,
    isPending,
    refetch,
  };
}

// ADD FAQ
export function useAddFaqMutation({ successAction }) {
  const addFaqMutation = useMutation({
    mutationFn: (data) =>
      fetch({
        method: "post",
        url: `/faqs`,
        payload: data.payload,
      }),
    onSuccess: (data) => {
      if (data?.status === 200 || data?.status === 201) {
        toast.success(<ToastContent title="FAQ berhasil ditambahkan!" />, {
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
        successAction && successAction();
      } else {
        toast.warn(
          <ToastContent
            title="FAQ gagal ditambahkan!"
            description={data?.message ? data.message : "Terjadi kesalahan"}
          />,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
      }
    },
    onError: (error) => {
      toast.error(
        <ToastContent
          title="Terjadi kesalahan!"
          description={error?.message}
        />,
        {
          position: "top-right",
          autoClose: 3000,
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

  return { addFaqMutation };
}

// EDIT FAQ
export function useEditFaqMutation({ successAction }) {
  const editFaqMutation = useMutation({
    mutationFn: (data) =>
      fetch({
        method: "put",
        url: `/faqs/${data.faqId}`,
        payload: data.payload,
      }),
    onSuccess: (data) => {
      if (data?.status === 200 || data?.status === 201) {
        toast.success(<ToastContent title="FAQ berhasil diperbarui!" />, {
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
        successAction && successAction();
      } else {
        toast.warn(
          <ToastContent
            title="FAQ gagal diperbarui!"
            description={data?.message ? data.message : "Terjadi kesalahan"}
          />,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
      }
    },
    onError: (error) => {
      toast.error(
        <ToastContent
          title="Terjadi kesalahan!"
          description={error?.message}
        />,
        {
          position: "top-right",
          autoClose: 3000,
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

  return { editFaqMutation };
}

// DELETE FAQ
export function useDeleteFaqMutation({ successAction }) {
  const deleteFaqMutation = useMutation({
    mutationFn: (data) =>
      fetch({
        method: "delete",
        url: `/faqs/${data.faqId}`,
      }),
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast.success(<ToastContent title="FAQ berhasil dihapus!" />, {
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
        successAction && successAction();
      } else {
        toast.warn(
          <ToastContent
            title="FAQ gagal dihapus!"
            description={data?.message ? data.message : "Terjadi kesalahan"}
          />,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
      }
    },
    onError: (error) => {
      toast.error(
        <ToastContent
          title="Terjadi kesalahan!"
          description={error?.message}
        />,
        {
          position: "top-right",
          autoClose: 3000,
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

  return { deleteFaqMutation };
}
