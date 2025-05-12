import request from "./baseRequest";

/**
 * Melakukan permintaan HTTP menggunakan metode yang ditentukan dan mengelola kes alahan yang mungkin terjadi.
 *
 * @param {Object} data - Data untuk permintaan.
 * @param {string} data.url - URL untuk permintaan (required).
 * @param {string} data.method - Metode HTTP yang digunakan (required, contoh: 'GET', 'POST').
 * @param {Object} [data.payload={}] - Payload untuk permintaan, jika ada (default: {}).
 * @param {Object} [data.options] - Opsi tambahan untuk permintaan.
 * @param {Array<number>} [data.options.excludeShowErrorStatusCode] - Daftar status code yang tidak akan ditampilkan sebagai kesalahan.
 * @param {Array<number>} [data.options.returnDataWhenError] - Daftar status code yang akan mengembalikan data.
 * @returns {Promise<Object>} - Mengembalikan data dari respons.
 * @throws {Error} - Melempar kesalahan jika permintaan gagal.
 */
export const fetch = async (data) => {
  try {
    const payload = data.payload || {};
    const response = await request[data.method.toLowerCase()](data.url, payload);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Something went wrong!";
    const statusCode = error.response?.status;

    if (
      data.options &&
      data.options.excludeShowErrorStatusCode &&
      !data.options.excludeShowErrorStatusCode.includes(statusCode)
    ) {
      //   toast.error("Error!", {
      //     description: errorMessage ? errorMessage : "Terjadi kesalahan",
      //   });
    }

    if (data.options && data.options.returnDataWhenError && data.options.returnDataWhenError.includes(statusCode)) {
      return error.response?.data;
    }

    throw new Error(errorMessage);
  }
};
