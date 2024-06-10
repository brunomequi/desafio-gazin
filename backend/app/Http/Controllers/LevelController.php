<?php

namespace App\Http\Controllers;

use App\Http\Requests\LevelRequest;
use App\Models\Level;
use App\Services\LevelService;
use Illuminate\Http\Request;

class LevelController extends Controller
{
    protected $levelService;

    public function __construct(LevelService $levelService)
    {
        $this->levelService = $levelService;
    }

    public function index()
    {
        $result = $this->levelService->getAllLevels();
        return response()->json($result['data'] ?? ['message' => $result['message']], $result['status']);
    }

    public function store(LevelRequest $request)
    {
        $result = $this->levelService->create($request->only(['nivel']));
        return response()->json($result['data'] ?? ['message' => $result['message']], $result['status']);
    }

    public function show(string $id)
    {
        $result = $this->levelService->findById($id);
        return response()->json($result['data'] ?? ['message' => $result['message']], $result['status']);
    }

    public function update(LevelRequest $request, string $id)
    {
        $result = $this->levelService->update($id, $request->only(['nivel']));
        return response()->json($result['data'] ?? ['message' => $result['message']], $result['status']);
    }

    public function destroy(string $id)
    {
        $result = $this->levelService->delete($id);
        return response()->json(['message' => $result['message']], $result['status']);
    }
}
