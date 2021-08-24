<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
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
        if($request->hasfile('image')){
            $imgCompleteFilename = $request->file('image')->getClientOriginalName();
            $imgFileNameOnly = pathinfo($imgCompleteFilename, PATHINFO_FILENAME);
            $imgExtension = $request->file('image')->getClientOriginalExtension();
            if($imgExtension != "jpg"){
                $response['status'] = 2;
                $response['code'] = 404;
                $response['message'] = 'Dokument mora biti u jpg, bmp ili png formatu';

                return response()->json($response);
            }
            $compPic = str_replace(' ', '_', $imgFileNameOnly).'-'.rand().'_'.time().'.'.$imgExtension;
            $imgUpload = $request->file('image')->storeAs('public/carImg', $compPic);
            $imgPath = 'profileImg/'. $compPic; 
        }
        if($request->hasfile('document')){
            $docCompleteFilename = $request->file('document')->getClientOriginalName();
            $docFileNameOnly = pathinfo($docCompleteFilename, PATHINFO_FILENAME);
            $docExtension = $request->file('document')->getClientOriginalExtension();
            if($docExtension != 'pdf'){
                $response['status'] = 2;
                $response['code'] = 404;
                $response['message'] = 'Dokument mora biti u pdf formatu';

                return response()->json($response);
            }
            $compDoc = str_replace(' ', '_', $docFileNameOnly).'-'.rand().'_'.time().'.'.$docExtension;
            $docUpload = $request->file('document')->storeAs('public/carDocuments', $compDoc);
            $docPath = 'documents/'. $compDoc; 
        }
        $car = new Car;
        $car->model=$request->model;
        $car->registration=$request->registration;
        $car->user_id=$request->user_id;
        $car->image_path=$imgPath;
        $car->document_path=$docPath;
        if($car->save()){
            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Uspešno ste dodali automobil';

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
     * @param  \App\Models\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function show(Car $car)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function edit(Car $car)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Car $car)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function destroy(Car $car)
    {
        //
    }
}
