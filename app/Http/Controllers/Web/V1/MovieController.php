<?php

namespace App\Http\Controllers\Web\V1;

use App\Http\Controllers\Controller;
use App\Models\V1\Movie;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests\V1\MovieRequest;

class MovieController extends Controller
{
    public function __construct(protected Movie $movie = new Movie()) {
        $this->middleware('auth:sanctum')
            ->only(['search',]);
    }

    public function search(MovieRequest $request) {     
        $response = $this->movie->search(
            $request->input("query")
        );
        if (false === $response) {
            return response()->json([
                'data' => false,
            ], Response::HTTP_OK);    
        }
        return response()->json([
            'data' => json_decode(
                $response,
                true
            ),
        ], Response::HTTP_OK);
    }
}
