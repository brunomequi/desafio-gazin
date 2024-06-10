<?php

namespace App\Http\Controllers;

use App\Http\Requests\LevelRequest;
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
        dd('Hora do show');
    }

    public function store(LevelRequest $request)
    {
        $result = $this->levelService->create($request->only(['nivel']));
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
