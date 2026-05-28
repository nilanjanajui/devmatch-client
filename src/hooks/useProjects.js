import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

// Fetch single project by ID
export function useProject(id) {
    return useQuery({
        queryKey: ["project", id],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/projects/${id}`);
            return data;
        },
        enabled: !!id,
    });
}

// Fetch all projects with optional filters
export function useProjects(filters = {}) {
    return useQuery({
        queryKey: ["projects", filters],
        queryFn: async () => {
            const { data } = await axiosInstance.get("/projects", { params: filters });
            return data;
        },
    });
}

// Submit an application
export function useApply() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload) => {
            const { data } = await axiosInstance.post("/applications", payload);
            return data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["project", variables.projectId] });
        },
    });
}