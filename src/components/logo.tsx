import Image from 'next/image';
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
    return (
        <div className={cn("relative", className)}>
            <Image
                src="/images/logo.png"
                alt="G-Electra Logo"
                fill
                className="object-contain"
            />
        </div>
    );
}
