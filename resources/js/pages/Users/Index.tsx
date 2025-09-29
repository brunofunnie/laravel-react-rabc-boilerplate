import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { usePermissions } from '@/hooks/use-permissions';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, router, Link } from '@inertiajs/react';
import { Edit, Trash, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

interface Props {
    users: User[];
}

export default function Index({ users }: Props) {
    const { can } = usePermissions();

    function handleDelete(id: number) {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(route('users.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="pt-4 pb-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 bg-white px-3 py-2 sm:px-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        Users
                                    </h3>
                                    {/* <p className="mt-1 max-w-2xl text-sm text-gray-500"></p> */}
                                </div>
                                {can('users.create') && (
                                    <Link href={route('users.create')}>
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="px-3 pt-2 pb-4">
                            <div className="mt-4 overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-700">
                                    <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Roles
                                            </th>
                                            <th scope="col" className="w-70 px-6 py-3">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(({ id, name, email, company, roles }: User) => (
                                            <tr key={id} className="border-b border-gray-200 odd:bg-white even:bg-gray-50">
                                                <td className="px-6 py-2 text-gray-600 dark:text-gray-300">{name}</td>
                                                <td className="px-6 py-2 text-gray-600 dark:text-gray-300">{email}</td>
                                                <td className="px-6 py-2 text-gray-600 dark:text-gray-300">
                                                    {roles?.map((role) => (
                                                        <span
                                                            key={role.name}
                                                            className="mr-1 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
                                                        >
                                                            {role.name}
                                                        </span>
                                                    ))}
                                                </td>
                                                <td className="space-x-1 px-6 py-2">
                                                    {can('users.edit') && (
                                                        <Link href={route('users.edit', id)}>
                                                            <Button>
                                                                <Edit />
                                                            </Button>
                                                        </Link>
                                                    )}
                                                    {can('users.delete') && (
                                                        <Button onClick={() => handleDelete(id)} variant={'destructive'}>
                                                            <Trash />
                                                        </Button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
