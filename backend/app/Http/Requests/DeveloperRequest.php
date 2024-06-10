<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class DeveloperRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'nivel_id' => 'required|exists:niveis,id',
            'nome' => 'required|string|max:255',
            'sexo' => 'required|in:M,F',
            'data_nascimento' => 'date',
            'hobby' => 'nullable|string|max:255',
        ];
    }
    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message'   => 'Validation errors',
            'data'      => $validator->errors()
        ],400));
    }
}
