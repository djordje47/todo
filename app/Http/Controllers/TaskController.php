<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TaskList;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class TaskController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request)
  {
    $tasks = Task::where([
      'list_id' => $request->get('listId'),
      'user_id' => $request->user()->id
    ])->paginate(10);

    return response()->json($tasks);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param \Illuminate\Http\Request $request
   * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse|\Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $currentUserId = $request->user()->id;
    $listId = $request->get('listId');
    $list = TaskList::find($listId);
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
      return response([
        'tasks' => $list->tasks()->where('user_id', $currentUserId)->paginate(10),
        'message' => "Task $newTask->title created successfully!"
      ], 200);
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
  public function update(Request $request, int $taskId)
  {
    try {
      $request->validate([
        'title' => 'required|string',
        'subtitle' => 'nullable|string',
        'notes' => 'nullable|string',
        'files' => 'nullable',
      ]);

      $task = Task::where('id', $taskId)->first();
      $task->title = $request->get('title');
      $task->subtitle = $request->get('subtitle');
      $task->notes = $request->get('notes');
      $task->save();
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
  public function destroy(int $taskId)
  {
    try {
      $task = Task::find($taskId);
      $task->delete();
      $list = TaskList::find($task->list_id);
      $tasks = $list->tasks()->where('user_id', auth()->user()->id)->paginate(10);
      return response(['tasks' => $tasks, 'message' => "Task $task->title, deleted successfully!", 'type' => 'success'], 200);
    } catch (\Exception $exception) {
      return response(['message' => $exception->getMessage(), 'type' => 'danger'], 500);
    }
  }
}
