<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
         $task = new Task;
         $task->taskName=$request->taskName;
         $task->description=$request->description;
         $task->user_id=$request->user_id;
         $task->task_id=$request->task_id;
         if($task->save()){
             $response['status'] = 1;
             $response['code'] = 200;
             $response['message'] = 'Uspešno ste dodali zaduženje';
 
             return response()->json($response);
         }else{
             $response['status'] = 2;
             $response['code'] = 400;
             $response['message'] = 'Došlo je do greške';
 
             return response()->json($response);
         }
 
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $task = Task::find($id);
        if(is_null($task)){

            $response['status'] = 2;
            $response['code'] = 404;
            $response['message'] = 'Nepostojeće zaduženje';

            return response()->json($response);
        }else{
            $task->update($request->all());

            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Uspešno ste izmenili podatke';

        return response()->json($response);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $task = Task::find($id);
        if(is_null($task)){

            $response['status'] = 2;
            $response['code'] = 404;
            $response['message'] = 'Nepostojeće zaduženje';

            return response()->json($response);
        }else{
            $task->delete();

            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Uspešno ste uklonili zaduženje';

        return response()->json($response);
        }
    }
}
