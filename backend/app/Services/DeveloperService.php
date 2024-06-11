<?php

namespace App\Services;

use App\Models\Developer;
use Carbon\Carbon;
use Illuminate\Pagination\LengthAwarePaginator;

class DeveloperService
{
    public function __construct(private Developer $developerModel) {}

    public function create(array $data): Developer
    {
        $data['idade'] = $this->getAge($data['data_nascimento']);
        return $this->developerModel->create($data);
    }

    public function findById(int $id): Developer
    {
        return $this->developerModel->findOrFail($id);
    }

    public function getAllDevelopers(): LengthAwarePaginator
    {
        $developers = $this->developerModel->paginate(10);
        throw_unless($developers->total() > 0,'Não existem desenvolvedores cadastrados');
        return $developers;
    }

    public function update(int $id, array $data): Developer
    {
        $developer = $this->developerModel->findOrFail($id);
        $data['idade'] = $this->getAge($data['data_nascimento']);
        $developer->update($data);
        return $developer;
    }

    public function delete(int $id): int
    {
        $developer = $this->developerModel->findOrFail($id);
        return $developer->delete();
    }


    private function getAge(string $birthDate): int
    {
        $birthDate = Carbon::parse($birthDate);
        return $birthDate->age;

    }
}
