<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeveloperRequest;
use App\Services\DeveloperService;
use Illuminate\Http\Request;

class DeveloperController extends Controller
{
    protected $developerService;

    public function __construct(DeveloperService $developerService)
    {
        $this->developerService = $developerService;
    }

    public function index()
    {
        dd('Hora do show');
    }

    public function store(DeveloperRequest $request)
    {
        $result = $this->developerService->create($request->only(['nivel_id', 'nome', 'sexo', 'data_nascimento', 'idade', 'hobby']));
        return response()->json($result['data'] ?? ['message' => $result['message']], $result['status']);
    }

    public function show(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
