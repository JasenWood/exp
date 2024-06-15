import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((r) => r.text());

function useAPIWorkspaces() {
    function get() {
        const { data, error, isLoading } = useSWR("https://swr.vercel.app/zh-CN/docs/getting-started", fetcher)
        return { data, error, isLoading }
    }

    return { get }
}

export function useAPI() {
    const workspaces = useAPIWorkspaces()
    return { workspaces }
}

