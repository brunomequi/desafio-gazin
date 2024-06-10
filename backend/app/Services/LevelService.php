<?php

namespace App\Services;

use App\Models\Level;
use Exception;

class LevelService
{
    public function create(array $data)
    {
        try {
            return [
                'status' => 201,
                'data' => Level::create($data)
            ];
        } catch (Exception $e) {
            return [
                'status' => 400,
                'message' => $e->getMessage()
            ];
        }
    }
}

