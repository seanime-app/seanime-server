import { useServerMutation } from "@/api/client/requests"
import { RemoveFileCacheBucket_Variables } from "@/api/generated/endpoint.types"
import { API_ENDPOINTS } from "@/api/generated/endpoints"
import { toast } from "sonner"

export function useGetFileCacheTotalSize() {
    return useServerMutation<boolean>({
        endpoint: API_ENDPOINTS.FILECACHE.GetFileCacheTotalSize.endpoint,
        method: API_ENDPOINTS.FILECACHE.GetFileCacheTotalSize.methods[0],
        mutationKey: [API_ENDPOINTS.FILECACHE.GetFileCacheTotalSize.key],
    })
}

export function useRemoveFileCacheBucket(onSuccess?: () => void) {
    return useServerMutation<boolean, RemoveFileCacheBucket_Variables>({
        endpoint: API_ENDPOINTS.FILECACHE.RemoveFileCacheBucket.endpoint,
        method: API_ENDPOINTS.FILECACHE.RemoveFileCacheBucket.methods[0],
        mutationKey: [API_ENDPOINTS.FILECACHE.RemoveFileCacheBucket.key],
        onSuccess: async () => {
            toast.success("Cache cleared")
            onSuccess?.()
        },
    })
}

