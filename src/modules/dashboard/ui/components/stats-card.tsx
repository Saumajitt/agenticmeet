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

// Vision UI Style Variants
const variantStyles = {
    default: "vision-card",
    primary: "bg-gradient-to-br from-[#0075FF] to-[#7928CA] text-white",
    success: "bg-gradient-to-br from-[#01B574] to-[#0075FF] text-white",
    warning: "bg-gradient-to-br from-[#FFB547] to-[#FF6B6B] text-white",
    info: "bg-gradient-to-br from-[#7928CA] to-[#FF0080] text-white",
};

// Vision UI Icon Background Colors
const iconBgStyles = {
    default: "bg-[#0075FF]",
    primary: "bg-white/20",
    success: "bg-white/20",
    warning: "bg-white/20",
    info: "bg-white/20",
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
            "hover-lift overflow-hidden border-0 rounded-[20px]",
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
                        "p-3 rounded-xl",
                        iconBgStyles[variant]
                    )}>
                        <Icon className="h-6 w-6 text-white" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
