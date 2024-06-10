<?php

namespace App\Services;

use App\Models\Developer;
use Exception;

class DeveloperService
{
    public function create(array $data)
    {
        try {
            $developer = Developer::create($data);
            return [
                'status' => 201,
                'data' => $developer
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
            $developer = Developer::findOrFail($id);
            return [
                'status' => 200,
                'data' => $developer
            ];
        } catch (Exception $e) {
            return [
                'status' => 404,
                'message' => 'Developer not found'
            ];
        }
    }

    public function getAllDevelopers()
    {
        try {
            $developers = Developer::all();
            return [
                'status' => 200,
                'data' => $developers
            ];
        } catch (Exception $e) {
            return [
                'status' => 500,
                'message' => 'Error fetching developers'
            ];
        }
    }

    public function update($id, array $data)
    {
        try {
            $developer = Developer::findOrFail($id);
            $developer->update($data);
            return [
                'status' => 200,
                'data' => $developer
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
            $developer = Developer::findOrFail($id);
            $developer->delete();
            return [
                'status' => 200,
                'message' => 'Developer deleted successfully'
            ];
        } catch (Exception $e) {
            return [
                'status' => 400,
                'message' => $e->getMessage()
            ];
        }
    }
}
