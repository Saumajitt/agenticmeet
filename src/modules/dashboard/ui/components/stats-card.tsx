import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: number | string;
    subtitle?: string;
    icon: LucideIcon;
    iconColor?: string;
}

export const StatsCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    iconColor = "text-primary",
}: StatsCardProps) => {
    return (
        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <p className="text-3xl font-bold">{value}</p>
                        {subtitle && (
                            <p className="text-xs text-muted-foreground">{subtitle}</p>
                        )}
                    </div>
                    <div className={cn("p-3 rounded-full bg-muted", iconColor)}>
                        <Icon className="h-6 w-6" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};