<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{

    // public function __construct()
    // {
    //     $this->middleware('auth:api');
    // }

    
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

    public function getAllUserTasks($id){
        $tasks = Task::where('user_id', $id)->get();
        $tasksMod = array();
        foreach ($tasks as $key => $task) {
            switch ($task['status']) {
                case '1':
                    $task['status'] = 'Dodeljeno';
                    $task['statusClass'] = 'btn btn-primary';
                    break;
                case '2':
                    $task['status'] = 'U toku';
                    $task['statusClass'] = 'btn btn-warning';
                    break;
                case '3':
                    $task['status'] = 'Završen';
                    $task['statusClass'] = 'btn btn-success';
                    break;
                default:
                    $task['status'] = 'Greška';
                    $task['statusClass'] = 'btn btn-danger';
                    break;
            }
            $tasksMod[] = array(
                'id' => $task['id'],
                'taskName' => $task['taskName'],
                'description' => $task['description'],
                'userId' => $task['user_id'],
                'projectId' => $task['project_id'],
                'userPhoto' => UserController::getUserPhoto($task['user_id']),
                'userName' => UserController::getUserName($task['user_id']),
                'status' => $task['status'],
                'statusClass' => $task['statusClass'],
                'projectManagerId' => ProjectController::getProjectManagerIdByProjectId($task['project_id']),
            );
         }   
        return response()->json($tasksMod,200);
    }
    public static function getAllProjectTasks($id){
        $query = ['project_id' => $id];
        $tasks = Task::where($query)->get();
        $tasksMod = array();
        foreach ($tasks as $key => $task) {
            switch ($task['status']) {
                case '1':
                    $task['status'] = 'Dodeljeno';
                    $task['statusClass'] = 'btn btn-primary';
                    break;
                case '2':
                    $task['status'] = 'U toku';
                    $task['statusClass'] = 'btn btn-warning';
                    break;
                case '3':
                    $task['status'] = 'Završen';
                    $task['statusClass'] = 'btn btn-success';
                    break;
                default:
                    $task['status'] = 'Greška';
                    $task['statusClass'] = 'btn btn-danger';
                    break;
            }
            $tasksMod[] = array(
                'id' => $task['id'],
                'taskName' => $task['taskName'],
                'description' => $task['description'],
                'userId' => $task['user_id'],
                'projectId' => $task['project_id'],
                'userPhoto' => UserController::getUserPhoto($task['user_id']),
                'userName' => UserController::getUserName($task['user_id']),
                'status' => $task['status'],
                'statusClass' => $task['statusClass'],
                'projectManagerId' => ProjectController::getProjectManagerIdByProjectId($task['project_id']),
            );
         }   
        return $tasksMod;
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
         $task->user_id=$request->userId;
         $task->project_id=$request->projectId;
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

    public static function deleteProjectTasks($id){
        $tasks = Task::where('project_id', $id)->get();
        foreach ($tasks as $key => $task) {
            $task->delete();
         } 

    }

    public function delete($id){
        

        $task = Task::find($id);
        if(is_null($task)){

            $response['status'] = 2;
            $response['code'] = 404;
            $response['message'] = 'Zaduženje nije registrovano';

            return response()->json($response);
        }else{
            $project->active = '0';
            $project->save();

            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Uspešno ste arhivirali zaduženje';

        return response()->json($response);
        }
    }

    public function activateTask(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        if(is_null($task)){

            $response['status'] = 2;
            $response['code'] = 404;
            $response['message'] = 'Zaduženje nije registrovano';

            return response()->json($response);
        }else{
            $project->active = '1';
            $project->save();

            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Uspešno aktivirali zaduženje';

        return response()->json($response);
        }
    }

    public function getTaskById($id){
        $task = Task::find($id);
        $task['projectName'] = ProjectController::getProjectName($task['project_id']);
        $task['userName'] = UserController::getUserName($task['user_id']);
        $task['userPhoto'] = UserController::getUserPhoto($task['user_id']);
        $task['projectManagerId'] = ProjectController::getProjectManagerIdByProjectId($task['project_id']);
        switch ($task['status']) {
            case '1':
                $task['status'] = 'Dodeljen';
                $task['statusClass'] = 'primary';
                break;
            case '2':
                $task['status'] = 'U toku';
                $task['statusClass'] = 'warning';
                break;
            case '3':
                $task['status'] = 'Završen';
                $task['statusClass'] = 'success';
                break;
            default:
                $task['status'] = 'Dodeljen';
                $task['statusClass'] = 'primary';
                break;
        }
        
        return response()->json($task,200);
    }

    public function changeTaskStatus($id){
        $task = Task::find($id);
        $taskStatus = $task['status'];
        switch ($taskStatus) {
            case '1':
                $task['status'] = '2';
                break;
            case '2':
                $task['status'] = '3';
                break;
            case '3':
                $task['status'] = '2';
                break;
            default:
            $task['status'] = '1';
                break;
        }

        $task->update();
    }

    public static function getProjectProgress($id){
        $queryAll = ['project_id' => $id];
        $tasksAll = Task::where($queryAll)->get();
        $queryDone = ['project_id' => $id, 'status'=>'3'];
        $tasksDone = Task::where($queryDone)->get();
       
        $tasksAllCount = count($tasksAll);
        $tasksDoneCount = count($tasksDone);

        if (!empty($tasksDoneCount)) {
            $procent = ($tasksDoneCount*100)/$tasksAllCount;
            $procent = round($procent);
        }else{
            $procent = 0;
        }
        

        return $procent;
    }




}
