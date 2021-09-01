<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
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
        return response()->json(Project::all(),200);
    }

    public function getProjectById($id){
        $project = Project::find($id);
        $project['projectManagerName'] = UserController::getUserName($project['projectManagerId']);
        $project['companyName'] = CompanyController::getCompanyName($project['company_id']);
        return response()->json($project,200);
    }

    public function getActiveProjects(){
        $projects = Project::where('active', '1') -> get();
        $projectMod = array();
        
        foreach ($projects as $key => $project) {
            $projectsMod[]= array(
                'id' => $project['id'],
                'name' => $project['projectName'],
                'projectManagerId' => $project['projectManagerId'],
                'projectManager' => UserController::getUserName($project['projectManagerId']),
                'projectManagerPhoto' => UserController::getUserPhoto($project['projectManagerId']),
                'company' => CompanyController::getCompanyName($project['company_id']),
                'budget' => $project['budget'],
                'spent' => $project['spent'],
                'start' => $project['start'],
                'end' => $project['end'],
                'tasks' => TaskController::getAllProjectTasks($project['id']),
            );
        }
        
        return response()->json($projectsMod,200);
    }

    public function getArchivedProjects(){
        $projects = Project::where('active', '0') -> get();
        $projectMod = array();
        
        foreach ($projects as $key => $project) {
            $projectsMod[]= array(
                'id' => $project['id'],
                'name' => $project['projectName'],
                'projectManagerId' => $project['projectManagerId'],
                'projectManager' => UserController::getUserName($project['projectManagerId']),
                'projectManagerPhoto' => UserController::getUserPhoto($project['projectManagerId']),
                'company' => CompanyController::getCompanyName($project['company_id']),
                'budget' => $project['budget'],
                'spent' => $project['spent'],
                'start' => $project['start'],
                'end' => $project['end'],
                'tasks' => TaskController::getAllProjectTasks($project['id']),
            );
        }
        
        return response()->json($projectsMod,200);
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
        $project = new Project;
        $project->projectManagerId=$request->userId;
        $project->projectName=$request->projectName;
        $project->company_id=$request->companyId;
        $project->desc=$request->desc;
        $project->budget=$request->budget;
        $project->spent=$request->spent;
        $project->start=$request->start;
        $project->end=$request->end;
        if($project->save()){
            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Uspešno ste dodali projekat';

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
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $project = Project::find($id);
        if(is_null($project)){

            $response['status'] = 2;
            $response['code'] = 404;
            $response['message'] = 'Nepostojeci projekat';

            return response()->json($response);
        }else{
            $project->update($request->all());

            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Uspešno ste izmenili podatke';

        return response()->json($response);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $project = Project::find($id);
        
        if(is_null($project)){

            $response['status'] = 2;
            $response['code'] = 404;
            $response['message'] = 'Projekat nije registrovan';

            return response()->json($response);
        }else{

            TaskController::deleteProjectTasks($id);
            $project->delete();

            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Uspešno ste arhivirali projekat';

        return response()->json($response);
        }
    }

    public function delete($id){
        

        $project = Project::find($id);
        if(is_null($project)){

            $response['status'] = 2;
            $response['code'] = 404;
            $response['message'] = 'Projekat nije registrovan';

            return response()->json($response);
        }else{
            $project->active = '0';
            $project->save();

            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Uspešno ste arhivirali projekat';

        return response()->json($response);
        }
    }

    public function activateProject(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        if(is_null($project)){

            $response['status'] = 2;
            $response['code'] = 404;
            $response['message'] = 'Kompanija nije registrovan';

            return response()->json($response);
        }else{
            $project->active = '1';
            $project->save();

            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Uspešno aktivirali projekat';

        return response()->json($response);
        }
    }

    public static function getProjectName($id){
        $project = Project::findOrFail($id);
        $projectName = $project['projectName'];
        return $projectName;
    }
}
