<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;

use Storage;

class CarController extends Controller
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
        $cars = Car::all();

        $carsMod = array();
        
        foreach ($cars as $key => $car) {
            if ($car['user_id']) {
                $carsMod[]= array(
                    'id' => $car['id'],
                    'model' => $car['model'],
                    'registration' => $car['registration'],
                    'user_id' => $car['user_id'],
                    'image_path' => $car['image_path'],
                    'document_path' => $car['document_path'],
                    'owner' => UserController::getUserName($car['user_id']),
                );
            }else{
                $carsMod[]= array(
                    'id' => $car['id'],
                    'model' => $car['model'],
                    'registration' => $car['registration'],
                    'user_id' => $car['user_id'],
                    'image_path' => $car['image_path'],
                    'document_path' => $car['document_path'],
                    'owner' => 'Slobodan',
                );
            }
        }
        return response()->json($carsMod,200);
    }

    public function getUserCar($id)
    {
        $car = Car::where('user_id', $id)->get();
        return response()->json($car,200);
    }

    public function getCarById($id){
        $car = Car::find($id);
        return response()->json($car,200);
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
        
        $car = new Car;
        $car->model=$request->model;
        $car->registration=$request->registration;
        $car->image_path='carImg/car.jpg';
        if($car->save()){
            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Uspe??no ste dodali automobil';

            return response()->json($response);
        }else{
            $response['status'] = 2;
            $response['code'] = 400;
            $response['message'] = 'Do??lo je do gre??ke';

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
    public function update(Request $request, $id)
    {
        $car = Car::find($id);
    
        $car->model=$request->model;
        $car->registration=$request->registration;
        $car->user_id=$request->user_id;
        
        if($car->update()){
            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Uspe??no ste izmenili automobil';

            return response()->json($response);
        }else{
            $response['status'] = 2;
            $response['code'] = 400;
            $response['message'] = 'Do??lo je do gre??ke';

            return response()->json($response);
        }

    }

    public function uploadCarImage(Request $request, $id){
        $car = Car::find($id);

        if($request->hasfile('image')){
            
            $img = 'public/'.$car->image_path;
            if ($img) {
                if ($img != 'public/carImg/car.jpg') {
                    Storage::delete($img);
                }
            }

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
            $imgPath = 'carImg/'. $compPic; 
            $car->image_path=$imgPath;

            $car->update();

            if($car->update()){
                $response['status'] = 1;
                $response['code'] = 200;
                $response['message'] = 'Uspe??no ste izmenili automobil';
    
                return response()->json($response);
            }
            
        }
    }

    public function uploadCarDocument(Request $request, $id){
        $car = Car::find($id);

        if($request->hasfile('document')){
            
            $doc = 'public/'.$car->document_path;
            if ($doc) {
                Storage::delete($doc);
            }
            

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
            $docPath = 'carDocuments/'. $compDoc; 
            $car->document_path=$docPath;

            $car->update();

            if($car->update()){
                $response['status'] = 1;
                $response['code'] = 200;
                $response['message'] = 'Uspe??no ste izmenili automobil';
    
                return response()->json($response);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $car = Car::find($id);
        if(is_null($car)){

            $response['status'] = 2;
            $response['code'] = 404;
            $response['message'] = 'Automobil nije registrovan';

            return response()->json($response);
        }else{
            $doc = 'public/'.$car->document_path;
            $img = 'public/'.$car->image_path;
            if ($doc) {
                Storage::delete($doc);
            }
            if ($img) {
                if ($img != 'public/carImg/car.jpg') {
                    Storage::delete($img);
                } 
            }
             $car->delete();

            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Uspe??no ste uklonili automobil';

        return response()->json($response);
        }
    }
}
