<?php

namespace App\Http\Controllers;

use App\Http\Requests\LevelRequest;
use App\Models\Level;
use Illuminate\Http\Request;

class LevelController2 extends Controller
{

    public function index()
    {
        dd('Hora do show');
    }

    public function store(LevelRequest $request)
    {
        try {
            $result = Level::create($request->only(['nivel']));
            $status = 201;
        }catch (\Exception $exception){
          $result = ['message' => $exception->getMessage()];
          $status = $exception->getMessage();
        }
    return response()->json($result,$status);
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
