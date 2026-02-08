import { Loader2Icon } from "lucide-react";

interface Props {
    title: string;
    description: string;
};

export const LoadingState = ({
    title,
    description
}: Props) => {
    return (
        <div className="py-4 px-8 flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-y-6 bg-card rounded-xl p-10 shadow-lg border">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
                    <Loader2Icon className="size-8 animate-spin text-primary relative" />
                </div>
                <div className="flex flex-col gap-y-2 text-center">
                    <h6 className="text-lg font-medium">{title}</h6>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
        </div>
    );
};
