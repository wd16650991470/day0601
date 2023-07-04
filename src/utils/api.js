import api from "./http"

export const getLogin = (params) => api.post("/api/sys/login", params)
