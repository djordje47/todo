<?php

namespace App\Http\Controllers;

use App\Models\TaskList;
use Illuminate\Http\Request;

class TaskListController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function index($userId)
  {
    $lists = TaskList::where('user_id', $userId)->paginate(10);
    return response()->json($lists);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param \Illuminate\Http\Request $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    //
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
