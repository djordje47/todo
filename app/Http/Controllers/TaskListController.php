<?php

namespace App\Http\Controllers;

use App\Models\TaskList;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TaskListController extends Controller
{
  /**
   * @param int $userId
   * @return \Illuminate\Http\Response
   */
  public function index(int $userId): \Illuminate\Http\Response
  {
    $lists = TaskList::where('user_id', $userId)->orderBy('id', 'desc')->get();
    return response(['userLists' => $lists], 200);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param \Illuminate\Http\Request $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request): \Illuminate\Http\Response
  {
    try {
      $request->validate([
        'listName' => 'string',
      ]);
      $userId = $request->user()->id;
      $newList = TaskList::create([
        'name' => $request->get('listName'),
        'user_id' => $request->user()->id,
        'subtitle' => null,
        'description' => null,
        'thumbnail' => null,
      ]);
      $userLists = TaskList::where('user_id', $userId)->orderBy('id', 'desc')->get();
      return response([
        'taskLists' => $userLists,
        'message' => "New list $newList->name created successfully!"
      ], 200);
    } catch (ValidationException $validationException) {
      response($validationException->errors(), 400);
    } catch (\Exception $exception) {
      response($exception->getMessage(), 500);
    }
  }

  /**
   * Display the specified resource.
   *
   * @param \App\Models\TaskList $taskList
   * @return \Illuminate\Http\Response
   */
  public function show(int $listId)
  {
    $tasks = [];
    $userId = auth()->user()->id;
    $list = TaskList::where([
      'user_id' => $userId,
      'id' => $listId
    ])->first();
    if ($list->tasks->count()) {
      $tasks = $list->tasks()->where('user_id', $userId)->paginate(10);
    }
    return response(['activeList' => $list, 'tasks' => $tasks], 200);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param \Illuminate\Http\Request $request
   * @param \App\Models\TaskList $taskList
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, TaskList $taskList)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param \App\Models\TaskList $taskList
   * @return \Illuminate\Http\Response
   */
  public function destroy(TaskList $taskList)
  {
    //
  }
}
