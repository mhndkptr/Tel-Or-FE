import ToastContent from "@/components/_shared/toast/ToastContent";
import { fetch } from "@/utils/baseFetch";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "react-toastify";

export function useGetAllEvent() {
  const { data, isLoading, isPending, refetch } = useQuery({
    queryKey: ["getAllEvent"],
    queryFn: () =>
      fetch({
        method: "get",
        url: `/events`,
        options: {
          excludeShowErrorStatusCode: [404],
          returnDataWhenError: [404],
        },
      }),
    retry: false,
    staleTime: 300000, // 5 menit
    cacheTime: Infinity, // Cache tidak akan dihapus
    refetchOnMount: false, // Tidak refetch saat komponen di-mount ulang
    refetchOnWindowFocus: false, // Tidak refetch saat fokus kembali ke tab
    onError: (error) => {
      toast.error(
        <ToastContent
          title={"Terjadi kesalahan!"}
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

  const eventsData = useMemo(() => {
    return data?.status == 200 ? data.data : [];
  }, [data]);

  return {
    eventsData,
    isLoading,
    isPending,
    refetch,
  };
}

export function useGetEventById(eventId) {
  const { data, isLoading, isPending, refetch } = useQuery({
    enabled: !!eventId,
    queryKey: ["getEventById", eventId],
    queryFn: () =>
      fetch({
        method: "get",
        url: `/events/${eventId}`,
        options: {
          excludeShowErrorStatusCode: [404],
          returnDataWhenError: [404],
        },
      }),
    retry: false,
    staleTime: 300000, // 5 menit
    cacheTime: Infinity, // Cache tidak akan dihapus
    refetchOnMount: false, // Tidak refetch saat komponen di-mount ulang
    refetchOnWindowFocus: false, // Tidak refetch saat fokus kembali ke tab
    onError: (error) => {
      toast.error(
        <ToastContent
          title={"Terjadi kesalahan!"}
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

  const eventData = useMemo(() => {
    return data?.status == 200 ? data.data : {};
  }, [data]);

  return {
    eventData,
    isLoading,
    isPending,
    refetch,
  };
}

export function useAddEventMutation({ successAction }) {
  const addEventMutation = useMutation({
    mutationFn: (data) =>
      fetch({
        method: "post",
        url: `/events`,
        payload: data.payload,
        options: {
          excludeShowErrorStatusCode: [404],
        },
      }),
    onSuccess: (data) => {
      if (data?.statusCode === 200 || data?.statusCode === 201) {
        successAction();
        toast.success(<ToastContent title={"Event berhasil ditambahkan!"} />, {
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
        toast.warn(
          <ToastContent
            title={"Event gagal ditambahkan!"}
            description={`${data?.code}: ${data?.message}`}
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
          title={"Terjadi kesalahan!"}
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

  return { addEventMutation };
}

export function useEditEventMutation({ successAction }) {
  const editEventMutation = useMutation({
    mutationFn: (data) =>
      fetch({
        method: "patch",
        url: `/events`,
        payload: data.payload,
        options: {
          excludeShowErrorStatusCode: [404],
        },
      }),
    onSuccess: (data) => {
      if (data?.statusCode === 200 || data?.statusCode === 201) {
        successAction();
        toast.success(<ToastContent title={"Event berhasil diperbarui!"} />, {
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
        toast.warn(
          <ToastContent
            title={"Event gagal diperbarui!"}
            description={`${data?.code}: ${data?.message}`}
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
          title={"Terjadi kesalahan!"}
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

  return { editEventMutation };
}

export function useDeleteEventMutation({ successAction }) {
  const deleteEventMutation = useMutation({
    mutationFn: (data) =>
      fetch({
        method: "delete",
        url: `/events/${data.eventId}`,
        options: {
          excludeShowErrorStatusCode: [404],
        },
      }),
    onSuccess: (data) => {
      if (data?.statusCode === 200) {
        successAction();
        toast.success(<ToastContent title={"Event berhasil dihapus!"} />, {
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
        toast.warn(
          <ToastContent
            title={"Event gagal dihapus!"}
            description={`${data?.code}: ${data?.message}`}
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
          title={"Terjadi kesalahan!"}
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

  return { deleteEventMutation };
}
