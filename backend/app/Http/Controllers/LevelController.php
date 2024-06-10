<?php

namespace App\Http\Controllers;

use App\Http\Requests\LevelRequest;
use App\Http\Resources\LevelResource;
use App\Services\LevelService;
use Exception;
use Illuminate\Http\JsonResponse;

class LevelController extends Controller
{

    public function __construct(private LevelService $levelService)
    {}

    public function index(): JsonResponse
    {

        try {
            $levels = $this->levelService->getAllLevels();
            $result = [
             'data' => LevelResource::collection($levels),
             'meta' => [
                 'total' => $levels->total(),
                 'per_page' => $levels->perPage(),
                 'current_page' => $levels->currentPage(),
                 'last_page' => $levels->lastPage(),
              ]
            ];

            $status = 200;
        } catch (Exception $e) {
            $result = [
                'message' => $e->getMessage()
            ];

            $status = 404;
        }

        return response()->json($result, $status);
    }

    public function store(LevelRequest $request): JsonResponse
    {
        try {
            $result = $this->levelService->create($request->only(['nivel']));
            $status = 201;
        } catch (Exception $e) {
            $result = [
                'message' => $e->getMessage()
            ];

            $status = 400;
        }

        return response()->json($result, $status);
    }

    public function show(int $id): JsonResponse
    {
        try {
            $result = $this->levelService->findById($id);
            $status = 200;
        } catch (Exception $e) {
            $result = [
                'message' => $e->getMessage()
            ];

            $status = 400;
        }

        return response()->json($result, $status);
    }

    public function update(LevelRequest $request, string $id): JsonResponse
    {
        try {
            $result = $this->levelService->update($id, $request->only(['nivel']));
            $status = 200;
        } catch (Exception $e) {
            $result = [
                'message' => $e->getMessage()
            ];

            $status = 400;
        }

        return response()->json($result, $status);
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $this->levelService->delete($id);
            $result = [
                'message' => 'Level removido com sucesso'
            ];
            $status = 204;
        } catch (Exception $e) {
            $result = [
                'message' => $e->getMessage()
            ];

            $status = 400;
        }

        return response()->json($result, $status);
    }
}
