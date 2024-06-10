<?php

namespace App\Services;

use App\Models\Level;
use Illuminate\Pagination\LengthAwarePaginator;

class LevelService
{
    public function __construct(private Level $levelModel) {}

    public function create(array $data): Level
    {
        return $this->levelModel->create($data);
    }

    public function findById(int $id): Level
    {
        return $this->levelModel->findOrFail($id);
    }

    public function getAllLevels(): LengthAwarePaginator
    {
        $levels = $this->levelModel->paginate(10);
        throw_unless($levels->total() > 0,'Não existem níveis cadastrados');
        return $levels;
    }

    public function update(int $id, array $data): Level
    {
        $level = $this->levelModel->findOrFail($id);
        $level->update($data);
        return $level;
    }

    public function delete(int $id): int
    {
        $level = $this->levelModel->findOrFail($id);
        throw_if($level->developers()->count() > 0,'Existem desenvolvedores');
        return $level->delete();
    }
}
