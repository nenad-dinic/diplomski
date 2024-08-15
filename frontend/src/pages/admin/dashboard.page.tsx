import { AdminDashboardCard } from "@/components/blocks/cards/admin/dashboard.card";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Analytics } from "@/models/analytics.model";
import { AnalyticsService } from "@/services/analytics.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function AdminDashboardPage() {

    const [analytics, setAnalytics] = useState<Analytics | undefined>(undefined);

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    async function getAnalytics() {

        const analytics = await AnalyticsService.getAnalytics();

        if(analytics == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in analytics) {
            switch(analytics.status) {
                case 401:
                    logout();
                    break;
                case 403:
                    navigate("/");
                    break;
                default:
                    toast.toast({
                        title: "Error",
                        description: "An error occurred, please try again later",
                        variant: "destructive"
                    });
            }
        } else {
            setAnalytics(analytics);
        }

    }

    useEffect(() => {
        getAnalytics();
    }, []);

    return <div className="p-8">
        <div className="flex gap-8 mt-8 justify-center flex-wrap">
            <AdminDashboardCard title="Buildings" icon="ic:round-apartment" count={analytics?.buildings ?? 0}></AdminDashboardCard>
            <AdminDashboardCard title="Apartments" icon="material-symbols:doorbell-3p" count={analytics?.apartments ?? 0}></AdminDashboardCard>
            <AdminDashboardCard title="Residents" icon="ic:round-family-restroom" count={analytics?.residents ?? 0}></AdminDashboardCard>
            <AdminDashboardCard title="Completed Repairs" icon="mdi:tools" count={analytics?.completedRepairs ?? 0}></AdminDashboardCard>
        </div>
    </div>

}