<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class RegisterController extends Controller
{
  /*
  |--------------------------------------------------------------------------
  | Register Controller
  |--------------------------------------------------------------------------
  |
  | This controller handles the registration of new users as well as their
  | validation and creation. By default this controller uses a trait to
  | provide this functionality without requiring any additional code.
  |
  */

  /**
   * Create a new user instance after a valid registration.
   *
   * @param array $data
   * @return \Illuminate\Http\JsonResponse
   */
  protected function create(Request $request): JsonResponse
  {
    try {
      $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        'password' => ['required', 'string', 'min:8', 'confirmed'],
      ]);
      $registeredUser = User::create([
        'name' => $request->get('name'),
        'email' => $request->get('email'),
        'password' => Hash::make($request->get('password')),
      ]);

      if ($registeredUser) {
        return response()->json(['Successful registration! You can login now!']);
      }
    } catch (ValidationException $validationException) {
      return response()->json(Arr::flatten($validationException->errors(), 5));
    } catch (Exception $exception) {
      return response()->json([$exception->getMessage()]);
    }
    return response()->json(['Something went wrong please contact the developers!']);
  }
}
