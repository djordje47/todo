<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class TaskController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param \Illuminate\Http\Request $request
   * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse|\Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $currentUserId = auth()->user()->id;
    $listId = $request->get('listId');
    try {
      $request->validate([
        'title' => 'required|string',
        'subtitle' => 'nullable|string',
        'notes' => 'nullable|string',
        'files' => 'nullable',
      ]);

      $newTask = Task::create([
        'title' => $request->get('title'),
        'subtitle' => $request->get('subtitle'),
        'notes' => $request->get('notes'),
        'user_id' => $currentUserId,
        'list_id' => $listId,
      ]);
      return $this->listTasks($listId);
    } catch (\Illuminate\Validation\ValidationException $validationException) {
      $validationErrors = Arr::flatten($validationException->errors());
      return response($validationErrors, 403);
    } catch (\Exception $exception) {
      return response($exception->getMessage(), 500);
    }
  }

  /**
   * Display the specified resource.
   *
   * @param \App\Models\Task $task
   * @return \Illuminate\Http\Response
   */
  public function show(Task $task)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param \Illuminate\Http\Request $request
   * @param \App\Models\Task $task
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request)
  {
    try {
      $request->validate([
        'title' => 'required|string',
        'subtitle' => 'nullable|string',
        'notes' => 'nullable|string',
        'files' => 'nullable',
      ]);

      $task = Task::where('id', $request->get('id'))->first();
      $task->title = $request->get('title');
      $task->subtitle = $request->get('subtitle');
      $task->notes = $request->get('notes');
      $task->save();
      $taskList = $this->listTasks($task->list_id);
      return response(['updatedTask' => $task, 'message' => 'Task updated successfully!'], 200);
    } catch (\Illuminate\Validation\ValidationException $validationException) {
      $validationErrors = Arr::flatten($validationException->errors());
      return response($validationErrors, 403);
    } catch (\Exception $exception) {
      return response($exception->getMessage(), 500);
    }

  }

  /**
   * Remove the specified resource from storage.
   *
   * @param \App\Models\Task $task
   * @return \Illuminate\Http\Response
   */
  public function destroy(Task $task)
  {
    //
  }

  public function listTasks(int $listId): \Illuminate\Http\JsonResponse
  {
    $userId = auth()->user()->id;
    $tasks = Task::where([
      'list_id' => $listId,
      'user_id' => $userId
    ])->paginate(10);

    return response()->json($tasks);
  }
}
