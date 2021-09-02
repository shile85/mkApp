<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use File;
use Storage;

class DocumentController extends Controller
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
    public function index($id)
    {
        $documents = Document::where('user_id', $id)->get();
        $documentsArr = array();
        foreach ($documents as $key => $document){
            $documentsArr[] = array(
                'id' => $document['id'],
                'category' => $document['category'],
                'documentPath' => $document['document_path'],
            );
        }

        return response()->json($documentsArr);
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
    public function store(Request $request, $id)
    {
        if($request->hasfile('document')){
            $completeFilename = $request->file('document')->getClientOriginalName();
            $fileNameOnly = pathinfo($completeFilename, PATHINFO_FILENAME);
            $extension = $request->file('document')->getClientOriginalExtension();
            if($extension != 'pdf'){
                $response['status'] = 2;
                $response['code'] = 404;
                $response['message'] = 'Dokument mora biti u pdf formatu';

                return response()->json($response);
            }
            $compDoc = str_replace(' ', '_', $fileNameOnly).'-'.rand().'_'.time().'.'.$extension;
            $upload = $request->file('document')->storeAs('public/documents', $compDoc);
            $path = 'documents/'. $compDoc; 
            $document = new Document;
            $document->document_path = $path;
            $document->category = $fileNameOnly;
            $document->user_id = $id;
            if($document->save()){
                $response['status'] = 1;
                $response['code'] = 200;
                $response['message'] = 'Uspešno ste dodali dokument';

                return response()->json($response);
            }else{
                $response['status'] = 2;
                $response['code'] = 400;
                $response['message'] = 'Došlo je do greške';

                return response()->json($response);
            }
            
            
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Document  $document
     * @return \Illuminate\Http\Response
     */
    public function show(Document $document)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Document  $document
     * @return \Illuminate\Http\Response
     */
    public function edit(Document $document)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Document  $document
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Document $document)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Document  $document
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $document = Document::find($id);
        if(is_null($document)){

            $response['status'] = 2;
            $response['code'] = 404;
            $response['message'] = 'Dokument ne postoji;';

            return response()->json($response);
        }else{
            $file = 'public/'.$document->document_path;
            Storage::delete($file);
            $document->delete();
            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Uspešno ste obrisali dokument';

            return response()->json($response);
        }
        
    }



}
