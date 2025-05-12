/**
 * Mengenkripsi string dengan mengubahnya menjadi format Base64 yang aman untuk URL.
 *
 * @param {string} value - String yang akan dienkripsi.
 * @returns {string} - String yang telah dienkripsi dalam format Base64 yang aman untuk URL.
 *
 * @example
 * encrypt_it("Hello World!"); // Mengembalikan "SGVsbG8gV29ybGQh"
 */
export function encryptIt(value) {
  // Encode string to Base64 and make it URL-safe
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Mendekripsi string yang telah dienkripsi dalam format Base64 yang aman untuk URL.
 *
 * @param {string} encryptedValue - String yang telah dienkripsi dalam format Base64 yang aman untuk URL.
 * @returns {string} - String asli sebelum dienkripsi.
 *
 * @example
 * decrypt_it("SGVsbG8gV29ybGQh"); // Mengembalikan "Hello World!"
 */
export function decryptIt(encryptedValue) {
  // Decode URL-safe Base64 back to original Base64
  const base64 = encryptedValue.replace(/-/g, "+").replace(/_/g, "/");
  return atob(base64);
}
