// ✅ File: user.hooks.js
import { fetch } from "@/utils/baseFetch";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "react-toastify";

export function useGetAllUsers() {
  const { data, isLoading, isPending, refetch } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: () =>
      fetch({
        method: "get",
        url: `/users`,
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
      toast.error("Gagal mengambil data user!", {
        description: error?.message || "Terjadi kesalahan",
      });
    },
  });

  const users = useMemo(() => {
    if (data?.status !== 200) return [];

    const rawUsers = data?.data || [];
    return rawUsers.map((user) => ({
      id: user.userId,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    }));
  }, [data]);

  return {
    users,
    isLoading,
    isPending,
    refetch,
  };
}

export function useAddUserMutation({ successAction }) {
  const addUserMutation = useMutation({
    mutationFn: (data) =>
      fetch({
        method: "post",
        url: `/users`,
        payload: data.payload,
        options: {
          excludeShowErrorStatusCode: [400, 404],
        },
      }),
    onSuccess: (data) => {
      if (data?.status === 200 || data?.status === 201) {
        toast.success("User berhasil ditambahkan!");
        successAction();
      } else {
        toast.error("Gagal menambahkan user!", {
          description: data?.message || "Terjadi kesalahan",
        });
      }
    },
    onError: (error) => {
      toast.error("Gagal menambahkan user!", {
        description: error?.message || "Terjadi kesalahan",
      });
    },
  });

  return { addUserMutation };
}

export function useEditUserMutation({ successAction }) {
  const editUserMutation = useMutation({
    mutationFn: (data) =>
      fetch({
        method: "put",
        url: `/users/${data.userId}`,
        payload: data.payload,
        options: {
          excludeShowErrorStatusCode: [400, 404],
        },
      }),
    onSuccess: (data) => {
      if (data?.status === 200 || data?.status === 201) {
        toast.success("User berhasil diperbarui!");
        successAction();
      } else {
        toast.error("Gagal memperbarui user!", {
          description: data?.message || "Terjadi kesalahan",
        });
      }
    },
    onError: (error) => {
      toast.error("Gagal memperbarui user!", {
        description: error?.message || "Terjadi kesalahan",
      });
    },
  });

  return { editUserMutation };
}

export function useDeleteUserMutation({ successAction }) {
  const deleteUserMutation = useMutation({
    mutationFn: (data) =>
      fetch({
        method: "delete",
        url: `/users/${data.userId}`,
        options: {
          excludeShowErrorStatusCode: [400, 404],
        },
      }),
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast.success("User berhasil dihapus!");
        successAction();
      } else {
        toast.error("Gagal menghapus user!", {
          description: data?.message || "Terjadi kesalahan",
        });
      }
    },
    onError: (error) => {
      toast.error("Gagal menghapus user!", {
        description: error?.message || "Terjadi kesalahan",
      });
    },
  });

  return { deleteUserMutation };
}
