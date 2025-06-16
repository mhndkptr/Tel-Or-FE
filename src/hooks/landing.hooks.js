import { fetch } from "@/utils/baseFetch";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "react-toastify";

export function useGetLandingPage() {
  const { data, isLoading, isPending, refetch } = useQuery({
    queryKey: ["getLandingPage"],
    queryFn: () =>
      fetch({
        method: "get",
        url: `/landing`,
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

  const landingPageData = useMemo(() => {
    return  data || {};
  }, [data]);

  return {
    landingPageData,
    isLoading,
    isPending,
    refetch,
  };
}

