import ToastContent from "@/components/_shared/toast/ToastContent";
import { fetch } from "@/utils/baseFetch";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";

// Helper to display toast
function showToast(type, title, description = "") {
  const fn = type === "success" ? toast.success : type === "warn" ? toast.warn : toast.error;
  fn(<ToastContent title={title} description={description} />, {
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

// === GET ALL ===
export function useGetAllOrmawa() {
  const { data, isLoading, isPending, refetch, isError } = useQuery({
    queryKey: ["getAllOrmawa"],
    queryFn: () =>
      fetch({
        method: "get",
        url: `/ormawa`,
        options: {
          excludeShowErrorStatusCode: [404],
          returnDataWhenError: [404],
        },
      }),
    retry: false,
    staleTime: 300000,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onError: (error) => {
      showToast("error", "Terjadi kesalahan!", error?.message || "Unknown error");
    },
  });

  const ormawaData = useMemo(() => {
    return data?.status === 200 ? data.data : [];
  }, [data]);

  return { ormawaData, isLoading, isPending, isError, refetch };
}

// === GET BY ID ===
export function useGetOrmawaById(ormawaId) {
  const { data, isLoading, isPending, refetch, isError } = useQuery({
    enabled: !!ormawaId,
    queryKey: ["getOrmawaById", ormawaId],
    queryFn: () =>
      fetch({
        method: "get",
        url: `/ormawa/${ormawaId}`,
        options: {
          excludeShowErrorStatusCode: [404],
          returnDataWhenError: [404],
        },
      }),
    retry: false,
    staleTime: 300000,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onError: (error) => {
      showToast("error", "Terjadi kesalahan!", error?.message || "Unknown error");
    },
  });

  const ormawaData = useMemo(() => {
    if (data?.status === 200 && data.data) {
      return {
        ...data.data,
        name: data.data.ormawaName,
      };
    }
    return null;
  }, [data]);

  return { ormawaData, isLoading, isPending, isError, refetch };
}

// === ADD ===
export function useAddOrmawaMutation({ successAction }) {
  return useMutation({
    mutationFn: (data) =>
      fetch({
        method: "post",
        url: `/ormawa`,
        payload: data.payload,
      }),
    onSuccess: (data) => {
      if ([200, 201].includes(data?.statusCode || data?.status)) {
        showToast("success", "Ormawa berhasil ditambahkan!");
        successAction?.();
      } else {
        showToast("warn", "Ormawa gagal ditambahkan!", `${data?.code || ""}: ${data?.message || ""}`);
      }
    },
    onError: (error) => {
      showToast("error", "Terjadi kesalahan!", error?.message || "Unknown error");
    },
  });
}

// === EDIT ===
export function useEditOrmawaMutation({ successAction }) {
  return useMutation({
    mutationFn: ({ id, payload }) =>
      fetch({
        method: "put",
        url: `/ormawa/${id}`,
        payload,
      }),
    onSuccess: (data) => {
      if ([200, 201].includes(data?.statusCode || data?.status)) {
        showToast("success", "Ormawa berhasil diperbarui!");
        successAction?.();
      } else {
        showToast("warn", "Ormawa gagal diperbarui!", `${data?.code || ""}: ${data?.message || ""}`);
      }
    },
    onError: (error) => {
      showToast("error", "Terjadi kesalahan!", error?.message || "Unknown error");
    },
  });
}

// === DELETE ===
export function useDeleteOrmawaMutation({ successAction }) {
  return useMutation({
    mutationFn: ({ ormawaId }) =>
      fetch({
        method: "delete",
        url: `/ormawa/${ormawaId}`,
      }),
    onSuccess: (data) => {
      if ([200].includes(data?.statusCode || data?.status)) {
        showToast("success", "Ormawa berhasil dihapus!");
        successAction?.();
      } else {
        showToast("warn", "Ormawa gagal dihapus!", `${data?.code || ""}: ${data?.message || ""}`);
      }
    },
    onError: (error) => {
      showToast("error", "Terjadi kesalahan!", error?.message || "Unknown error");
    },
  });
}
