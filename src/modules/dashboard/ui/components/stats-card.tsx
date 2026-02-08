import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: number | string;
    subtitle?: string;
    icon: LucideIcon;
    variant?: "default" | "primary" | "success" | "warning" | "info";
    className?: string;
}

const variantStyles = {
    default: "bg-card",
    primary: "bg-gradient-to-br from-violet-500 to-purple-600 text-white",
    success: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white",
    warning: "bg-gradient-to-br from-amber-500 to-orange-600 text-white",
    info: "bg-gradient-to-br from-blue-500 to-cyan-600 text-white",
};

export const StatsCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    variant = "default",
    className,
}: StatsCardProps) => {
    const isColored = variant !== "default";

    return (
        <Card className={cn(
            "hover-lift overflow-hidden border-0",
            variantStyles[variant],
            className
        )}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className={cn(
                            "text-sm font-medium",
                            isColored ? "text-white/80" : "text-muted-foreground"
                        )}>
                            {title}
                        </p>
                        <p className="text-3xl font-bold">{value}</p>
                        {subtitle && (
                            <p className={cn(
                                "text-xs",
                                isColored ? "text-white/70" : "text-muted-foreground"
                            )}>
                                {subtitle}
                            </p>
                        )}
                    </div>
                    <div className={cn(
                        "p-3 rounded-full",
                        isColored ? "bg-white/20" : "bg-muted"
                    )}>
                        <Icon className="h-6 w-6" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};