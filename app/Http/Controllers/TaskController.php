<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TaskList;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class TaskController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @param \Illuminate\Http\Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function index(Request $request): \Illuminate\Http\JsonResponse
  {
    $tasks = Task::where([
      'list_id' => $request->get('listId'),
      'user_id' => $request->user()->id
    ])->with('steps')->paginate(10);

    return response()->json($tasks);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param \Illuminate\Http\Request $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request): \Illuminate\Http\Response
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
  public function update(Request $request, int $taskId): \Illuminate\Http\Response
  {
    try {
      $request->validate([
        'title' => 'required|string',
        'subtitle' => 'nullable|string',
        'notes' => 'nullable|string',
        'due_date' => 'nullable|string',
        'files' => 'nullable',
      ]);

      $task = Task::where('id', $taskId)->first();
      $task->title = $request->get('title');
      $task->subtitle = $request->get('subtitle');
      $task->notes = $request->get('notes');
      $task->due_date = Carbon::parse($request->get('due_date'));
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
  public function destroy(int $taskId): \Illuminate\Http\Response
  {
    try {
      $task = Task::find($taskId);
      $task->steps()->delete();
      $task->delete();
      $list = TaskList::find($task->list_id);
      $tasks = $list->tasks()->where('user_id', auth()->user()->id)->paginate(10);
      return response(['tasks' => $tasks, 'message' => "Task $task->title, deleted successfully!", 'type' => 'success'], 200);
    } catch (\Exception $exception) {
      return response(['message' => $exception->getMessage(), 'type' => 'danger'], 500);
    }
  }

  /**
   * @param int $taskId
   * @return \Illuminate\Http\Response
   */
  public function toggleFavorite(int $taskId): \Illuminate\Http\Response
  {
    try {
      $task = Task::find($taskId);
      $task->is_favorite = !$task->is_favorite;
      $task->update();
      return response(['task_id' => $task->id]);
    } catch (\Exception $exception) {
      return response(['message' => $exception->getMessage(), 'type' => 'danger']);
    }
  }

  /**
   * @param int $taskId
   * @return \Illuminate\Http\Response
   */
  public function toggleCompleted(int $taskId): \Illuminate\Http\Response
  {
    try {
      $task = Task::find($taskId);
      $task->is_completed = !$task->is_completed;
      $task->update();
      return response(['task_id' => $task->id]);
    } catch (\Exception $exception) {
      return response(['message' => $exception->getMessage(), 'type' => 'danger']);
    }
  }
}
