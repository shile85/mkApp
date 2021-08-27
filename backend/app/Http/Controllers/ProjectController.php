<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
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
        // dd($request->projectManagerId);  
        $project = new Project;
        $project->projectManagerId=$request->projectManagerId;
        // dd($project->projectManagerId); 
        $project->projectName=$request->projectName;
        $project->company_id=$request->company_id;
        $project->desc=$request->desc;
        $project->budget=$request->budget;
        $project->spent=$request->spent;
        $project->start=$request->start;
        $project->end=$request->end;
        // dd($project);
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
        //
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
            return response()->json(['message' => 'Prjekat nije registrovan'], 404);
        }
        $project->delete();
        return response()->json(['message' => 'Projekat uspešno obrisan'], 200);
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
}
