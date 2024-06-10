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
    public function findById($id)
    {
        try {
            $level = Level::findOrFail($id);
            return [
                'status' => 200,
                'data' => $level
            ];
        } catch (Exception $e) {
            return [
                'status' => 404,
                'message' => 'Level not found'
            ];
        }
    }

    public function getAllLevels()
    {
        try {
            $levels = Level::all();
            return [
                'status' => 200,
                'data' => $levels
            ];
        } catch (Exception $e) {
            return [
                'status' => 500,
                'message' => 'Error fetching levels'
            ];
        }
    }
    public function update($id, array $data)
    {
        try {
            $level = Level::findOrFail($id);
            $level->update($data);
            return [
                'status' => 200,
                'data' => $level
            ];
        } catch (Exception $e) {
            return [
                'status' => 400,
                'message' => $e->getMessage()
            ];
        }
    }
    public function delete($id)
    {
        try {
            $level = Level::findOrFail($id);
            $level->delete();
            return [
                'status' => 200,
                'message' => 'Level deleted successfully'
            ];
        } catch (Exception $e) {
            return [
                'status' => 400,
                'message' => 'Há desenvolvedores atrelados ao nível'
            ];
        }
    }
}

