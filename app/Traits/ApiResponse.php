<?php

namespace App\Traits;
/*
|--------------------------------------------------------------------------
| Api Response Trait
|--------------------------------------------------------------------------
|
| This trait will be used for any response we sent to clients.
|
*/

use Illuminate\Http\JsonResponse;

trait ApiResponse
{
  protected function success($data, string $message = null, int $code = 200): JsonResponse
  {
    return response()->json([
      'status' => 'Success',
      'message' => $message,
      'data' => $data
    ], $code);
  }

  protected function error(string $message = null, int $code = 500, $data = null)
  {
    return response()->json([
      'status' => 'Error',
      'message' => $message,
      'data' => $data
    ], $code);
  }
}