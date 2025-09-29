<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Models\User;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Users/Index', [
            'users' => User::with('roles')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create', [
            'roles' => Role::all()->pluck('name'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create(
            $request->only(['name', 'email'])
            +
            ['password' => Hash::make($request->password)]
        );

        $user->syncRoles($request->roles);

        return to_route('users.index');
    }

    public function show(string $id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('Users/Show', [
            'user' => $user
        ]);
    }

    public function edit(string $id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'userRoles' => $user->roles->pluck('name'),
            'roles' => Role::all()->pluck('name'),
        ]);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
        ]);

        $user = User::findOrFail($id);
        $user->update($request->only(['name', 'email']));

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
            $user->save();
        }

        $user->syncRoles($request->roles);

        return to_route('users.index');
    }

    public function destroy(string $id)
    {
        User::destroy($id);

        return to_route('users.index');
    }
}
