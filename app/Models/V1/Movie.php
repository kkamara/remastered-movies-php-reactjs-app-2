<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;

class Movie extends Model
{
    use HasFactory;

    public function search(string $query) {
        try {
            $client = new Client();
            $response = $client->request(
                'GET', 
                'https://'.config("app.rapid_api_host").'/?s='.$query.'&r=json&page=1', 
                ['headers' => [
                    'X-RapidAPI-Host' => config('app.rapid_api_host'),
                    'X-RapidAPI-Key' => config("app.rapid_api_key"),
                ],
            ]);
            
            return $response->getBody();
        } catch (RequestException $exception) {
            Log::danger($exception->getMessage());
            return false;
        }
    }
}
