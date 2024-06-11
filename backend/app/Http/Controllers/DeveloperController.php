<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeveloperRequest;
use App\Http\Resources\DeveloperResource;
use App\Services\DeveloperService;
use Exception;
use Illuminate\Http\JsonResponse;


class DeveloperController extends Controller
{
    public function __construct(private DeveloperService $developerService)
    {}

    public function index(): JsonResponse
    {

        try {
            $developers = $this->developerService->getAllDevelopers();
            $result = [
                'data' => DeveloperResource::collection($developers),
                'meta' => [
                    'total' => $developers->total(),
                    'per_page' => $developers->perPage(),
                    'current_page' => $developers->currentPage(),
                    'last_page' => $developers->lastPage(),
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

    public function store(DeveloperRequest $request): JsonResponse
    {
        try {
            $result = $this->developerService->create($request->only([
                'nivel_id',
                'nome',
                'sexo',
                'data_nascimento',
                'hobby',
            ]));
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
            $result = $this->developerService->findById($id);
            $status = 200;
        } catch (Exception $e) {
            $result = [
                'message' => $e->getMessage()
            ];

            $status = 400;
        }

        return response()->json($result, $status);
    }

    public function update(DeveloperRequest $request, string $id): JsonResponse
    {
        try {
            $result = $this->developerService->update($id, $request->only([
                'nivel_id',
                'nome',
                'sexo',
                'data_nascimento',
                'hobby',
            ]));
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
            $this->developerService->delete($id);
            $result = [
                'message' => 'Desenvolvedor removido com sucesso'
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
