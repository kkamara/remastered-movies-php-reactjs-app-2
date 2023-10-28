<?php

namespace App\Http\Controllers\Web\V1;

use App\Http\Controllers\Controller;
use App\Models\V1\Movie;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests\V1\MovieRequest;

class MovieController extends Controller
{
    public function __construct() {
        $this->middleware('auth:sanctum')
            ->only(['search',]);
    }

    public function search(MovieRequest $request) {     
        return response()->json([
            'data' => json_decode(
                (new Movie())->search(
                    $request->input("query")
                ),
                true
            ),
        ], Response::HTTP_CREATED);
    }
}
