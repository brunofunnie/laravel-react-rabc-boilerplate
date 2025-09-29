import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Role Create',
        href: '/roles',
    },
];

type EditProps = {
    role: {
        id: number | string;
        name: string;
    };
    rolePermissions: string[];
    permissions: string[];
};

export default function Edit({ role, rolePermissions, permissions }: EditProps) {
    const { data, setData, errors, put } = useForm({
        name: role.name || '',
        permissions: rolePermissions || [],
    });

    function handleCheckboxChange(permissionName: string, checked: boolean) {
        if (checked) {
            setData('permissions', [...data.permissions, permissionName]);
        } else {
            setData(
                'permissions',
                data.permissions.filter((p) => p !== permissionName),
            );
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        put(route('roles.update', { role: role.id }));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User Edit - ${role.name}`} />

            <div className="pt-4 pb-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 bg-white px-3 py-2 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        User Edit - {data.name}
                                    </h3>
                                    {/* <p className="mt-1 max-w-2xl text-sm text-gray-500"></p> */}
                                </div>
                                <Link href={route('roles.index')}>
                                    <Button variant='outline'>
                                        Back
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="px-3 pt-2 pb-4">
                            <form onSubmit={handleSubmit} className="mx-auto mt-4 max-w-md space-y-6">
                                <div className="grid gap-2">
                                    <label
                                        htmlFor="name"
                                        className="text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                                    >
                                        Name:
                                    </label>
                                    <input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        name="name"
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Enter name"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <label
                                        htmlFor="permissions"
                                        className="text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                                    >
                                        Permissions:
                                    </label>

                                    {permissions.map((permission) => (
                                        <label key={permission} className="flex items-center space-x-2">
                                            <input
                                                id={permission}
                                                value={permission}
                                                checked={data.permissions.includes(permission)}
                                                onChange={(e) => handleCheckboxChange(permission, e.target.checked)}
                                                type="checkbox"
                                                className="form-checkbox h-5 w-5 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-gray-800 capitalize">{permission}</span>
                                        </label>
                                    ))}

                                    {errors.permissions && <p className="mt-1 text-sm text-red-500">{errors.permissions}</p>}
                                </div>

                                <Button type="submit">Save</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
