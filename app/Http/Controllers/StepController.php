<?php

namespace App\Http\Controllers;

use App\Models\Step;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StepController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @param \Illuminate\Http\Request $request
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request): Response
  {
    $taskSteps = Task::find($request->get('taskId'))->steps;
    return response($taskSteps, 200);
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
   * Store a newly created resource in storage.
   *
   * @param \Illuminate\Http\Request $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request): Response
  {
    $request->validate([
      'name' => 'string',
      'taskId' => 'int|exists:tasks,id'
    ]);
    $step = Step::create([
      'name' => $request->get('name'),
      'task_id' => $request->get('taskId'),
    ]);
    return response($step, 200);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param \Illuminate\Http\Request $request
   * @param \App\Models\Step $step
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, int $stepId): Response
  {
    $request->validate([
      'name' => 'string',
      'taskId' => 'int|exists:tasks,id'
    ]);
    $step = Step::find($stepId);
    $step->name = $request->get('name');
    $step->is_completed = !$step->is_completed;
    $step->update();
    return response(['updatedStep' => $step, 'message' => "Step $step->name updated successfully!"], 200);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param \App\Models\Step $step
   * @return \Illuminate\Http\Response
   */
  public function destroy(int $stepId): Response
  {
    $step = Step::find($stepId);
    $step->delete();
    return response(['deletedStepId' => $step->id, 'message' => "Step $step->name deleted successfully!"], 200);
  }
}
