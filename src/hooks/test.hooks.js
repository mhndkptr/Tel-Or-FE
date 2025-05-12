import { fetch } from "@/utils/baseFetch";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function useGetAllTestByOtherId(otherId) {
  const { data, isLoading, isPending, refetch } = useQuery({
    enabled: !!otherId,
    queryKey: ["getTestsByOtherId", otherId],
    queryFn: () =>
      fetch({
        method: "get",
        url: `/tests`,
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
      //   toast.error("Something went wrong!", {
      //     description: error.message ? error.message : "Terjadi kesalahan",
      //   });
    },
  });

  const tests = useMemo(() => {
    return data?.statusCode === 200 ? data.data : [];
  }, [data]);

  return {
    tests,
    isLoading,
    isPending,
    refetch,
  };
}

export function useAddTestMutation({ successAction }) {
  const addTestMutation = useMutation({
    mutationFn: (data) =>
      fetch({
        method: "post",
        url: `/test`,
        payload: data.payload,
        options: {
          excludeShowErrorStatusCode: [404],
        },
      }),
    onSuccess: (data) => {
      if (data?.statusCode === 200 || data?.statusCode === 201) {
        successAction();
        // toast.success("Test berhasil ditambahkan!");
      } else {
        // toast.error("Test gagal ditambahkan!", {
        //   description: data?.message ? data.message : "An unexpected error occurred",
        // });
      }
    },
    onError: (error) => {
      //   toast.error("Something went wrong!", {
      //     description: error?.message ? error.message : "An unexpected error occurred",
      //   });
    },
  });

  return { addTestMutation };
}

export function useEditTestMutation({ successAction }) {
  const editTestMutation = useMutation({
    mutationFn: (data) =>
      fetch({
        method: "put",
        url: `/test/${data.testId}`,
        payload: data.payload,
        options: {
          excludeShowErrorStatusCode: [404],
        },
      }),
    onSuccess: (data) => {
      if (data?.statusCode === 200 || data?.statusCode === 201) {
        successAction();
        // toast.success("Test berhasil diperbarui!");
      } else {
        // toast.error("Test gagal diperbarui!", {
        //   description: data?.message ? data.message : "An unexpected error occurred",
        // });
      }
    },
    onError: (error) => {
      //   toast.error("Something went wrong!", {
      //     description: error?.message ? error.message : "An unexpected error occurred",
      //   });
    },
  });

  return { editTestMutation };
}

export function useDeleteTestMutation({ successAction }) {
  const deleteTestMutation = useMutation({
    mutationFn: (data) =>
      fetch({
        method: "delete",
        url: `/test/${data.testId}`,
        options: {
          excludeShowErrorStatusCode: [404, 400],
        },
      }),
    onSuccess: (data) => {
      if (data?.statusCode === 200) {
        successAction();
        // toast.success(`Test berhasil dihapus!`);
      } else {
        // toast.error("Test gagal dihapus!", {
        //   description: data?.message ? data.message : "An unexpected error occurred",
        // });
      }
    },
    onError: (error) => {
      //   toast.error("Something went wrong!", {
      //     description: error?.message ? error.message : "An unexpected error occurred",
      //   });
    },
  });

  return { deleteTestMutation };
}
