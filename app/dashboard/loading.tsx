import DashboardSkeleton from "../ui/skeletons";
//! Using this convention name, the page automatically falls back to this component while fetching data or content is loading
export default function Loading() {
    // return <div>Loading...</div>;
    return <DashboardSkeleton />
}