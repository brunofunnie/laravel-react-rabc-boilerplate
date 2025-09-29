import { cn } from "@/lib/utils";
import { Link as InertiaLink } from "@inertiajs/react";
import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "./button";

export default function Link({
    href,
    ...props
}: React.ComponentProps<typeof InertiaLink> & VariantProps<typeof buttonVariants>) {
    return (
        <Button asChild className={cn(buttonVariants({ variant: props.variant, size: props.size, className: props.className }))}>
            <InertiaLink href={href} {...props} />
        </Button>
    )
}