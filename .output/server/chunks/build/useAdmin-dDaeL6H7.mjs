import { u as useState } from './state-_I5XcLqc.mjs';
import { n as navigateTo } from './server.mjs';
import { u as useFetch } from './fetch-BwSn-eTT.mjs';

function useAdminAuth() {
  const authenticated = useState("admin-authenticated", () => false);
  const loading = useState("admin-auth-loading", () => false);
  async function fetchAuth() {
    loading.value = true;
    try {
      const data = await $fetch("/api/auth/me");
      authenticated.value = data.authenticated;
    } catch {
      authenticated.value = false;
    } finally {
      loading.value = false;
    }
  }
  async function login(password) {
    await $fetch("/api/auth/login", { method: "POST", body: { password } });
    authenticated.value = true;
  }
  async function logout() {
    await $fetch("/api/auth/logout", { method: "POST" });
    authenticated.value = false;
    await navigateTo("/admin/login");
  }
  return { authenticated, loading, fetchAuth, login, logout };
}
function useGallery() {
  const { data, pending, refresh, error } = useFetch("/api/gallery", {
    key: "public-gallery",
    default: () => [],
    server: true,
    lazy: false
  }, "$_IoVs9nbOG");
  return { gallery: data, pending, refresh, error };
}
function formatAdminDate(iso) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export { useAdminAuth as a, formatAdminDate as f, useGallery as u };
//# sourceMappingURL=useAdmin-dDaeL6H7.mjs.map
