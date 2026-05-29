import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export function useDeveloper(id) {
    return useQuery({
        queryKey: ["developer", id],
        queryFn: () => axiosInstance.get(`/users/${id}`).then(r => r.data),
        enabled: !!id,
    });
}