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
        $result = $this->developerService->getAllDevelopers();
        return response()->json($result['data'] ?? ['message' => $result['message']], $result['status']);
    }

    public function store(DeveloperRequest $request)
    {
        $result = $this->developerService->create($request->only(['nivel_id', 'nome', 'sexo', 'data_nascimento', 'idade', 'hobby']));
        return response()->json($result['data'] ?? ['message' => $result['message']], $result['status']);
    }

    public function show(string $id)
    {
        {
            $result = $this->developerService->findById($id);
            return response()->json($result['data'] ?? ['message' => $result['message']], $result['status']);
        }
    }

    public function update(DeveloperRequest $request, string $id)
    {
        $result = $this->developerService->update($id, $request->only(['nivel_id', 'nome', 'sexo', 'data_nascimento', 'idade', 'hobby']));
        return response()->json($result['data'] ?? ['message' => $result['message']], $result['status']);
    }

    public function destroy(string $id)
    {
        $result = $this->developerService->delete($id);
        return response()->json(['message' => $result['message']], $result['status']);
    }
}
