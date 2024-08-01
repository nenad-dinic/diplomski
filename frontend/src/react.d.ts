import { ForwardedRef } from "react";

declare module "react" {
    function forwardRef<T, P extends object>(
        render: (props : P, ref : ForwardedRef<T>) => ReactElement | null
    ): (props : P & RefAttributes<T>) => ReactElement | null;
}