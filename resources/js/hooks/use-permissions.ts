import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';

export interface AuthData {
    permissions: string[];
    roles?: string[];
    user?: {
        id: number;
        name: string;
        email: string;
    };
}

export interface UsePermissions {
    can: (permission: string) => boolean;
    hasRole: (role: string) => boolean;
    hasAnyRole: (roles: string[]) => boolean;
    hasAllRoles: (roles: string[]) => boolean;
    permissions: string[];
    roles: string[];
    user: AuthData['user'];
}

export function usePermissions(): UsePermissions {
    const { auth } = usePage().props as unknown as {
        auth: AuthData;
    };

    return useMemo(() => {
        const permissions = auth.permissions ?? [];
        const roles = auth.roles ?? [];

        return {
            can: (permission: string) => permissions.includes(permission),
            hasRole: (role: string) => roles.includes(role),
            hasAnyRole: (checkRoles: string[]) => checkRoles.some((role) => roles.includes(role)),
            hasAllRoles: (checkRoles: string[]) => checkRoles.every((role) => roles.includes(role)),
            permissions,
            roles,
            user: auth.user,
        };
    }, [auth.user, auth.permissions, auth.roles]);
}
