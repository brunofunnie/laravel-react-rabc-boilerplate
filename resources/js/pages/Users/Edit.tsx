import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Edit',
        href: '/users',
    },
];

export default function Edit({ user, userRoles, roles }) {
    const { data, setData, errors, put } = useForm({
        name: user.name || '',
        email: user.email || '',
        roles: userRoles || [],
    });

    function handleCheckboxChange(roleName, checked) {
        if (checked) {
            setData('roles', [...data.roles, roleName]);
        } else {
            setData(
                'roles',
                data.roles.filter((r) => r !== roleName),
            );
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        put(route('users.update', user.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Users - Edit - ${user.name}`} />

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
                                <Link href={route('users.index')}>
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
                                        placeholder="Enter your name"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <label
                                        htmlFor="email"
                                        className="text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                                    >
                                        Email:
                                    </label>
                                    <input
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        name="email"
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <label
                                        htmlFor="password"
                                        className="text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                                    >
                                        Password:
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        name="password"
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Enter your password"
                                    />
                                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <label
                                        htmlFor="roles"
                                        className="text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                                    >
                                        Roles:
                                    </label>

                                    {roles.map((role) => (
                                        <label key={role} className="flex items-center space-x-2">
                                            <input
                                                id={role}
                                                value={role}
                                                onChange={(e) => handleCheckboxChange(role, e.target.checked)}
                                                checked={data.roles.includes(role)}
                                                type="checkbox"
                                                className="form-checkbox h-5 w-5 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-gray-800 capitalize">{role}</span>
                                        </label>
                                    ))}

                                    {errors.roles && <p className="mt-1 text-sm text-red-500">{errors.roles}</p>}
                                </div>

                                <Button type="submit">Submit</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
