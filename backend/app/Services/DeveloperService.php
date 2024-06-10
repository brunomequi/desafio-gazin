<?php

namespace App\Services;

use App\Models\Developer;
use App\Models\Level;
use Exception;

class DeveloperService
{
    public function create(array $data)
    {
        try {
            return [
                'status' => 201,
                'data' => Developer::create($data)
            ];
        } catch (Exception $e) {
            return [
                'status' => 400,
                'message' => $e->getMessage()
            ];
        }
    }
}
