<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
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
        return response()->json(Company::all(),200);
    }
    
    public function getActiveCompanies(){
        $companies = Company::where('active', '1') -> get();
        return response()->json($companies,200);
    }

    public function getArchivedCompanies(){
        $companies = Company::where('active', '0') -> get();
        return response()->json($companies,200);
    }

    public function getCompanyById($id)
    {
        $company = Company::find($id);
        if(is_null($company)){
            return response()->json(['message' => 'Korisnik nije registrovan'], 404);
        }
        return response()->json($company, 200);
    }

    public static function getCompanyName($id){

        $company = Company::findOrFail($id);
        $companyName = $company['name'];
        return $companyName;
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
        $company = new Company;
        $company->name = $request->name;
        
        if($company->save()){
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
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function show(Company $company)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function edit(Company $company)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Company $company)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $company = Company::find($id);
        if(is_null($company)){

            $response['status'] = 2;
            $response['code'] = 404;
            $response['message'] = 'Kompanija nije registrovana';

            return response()->json($response);
        }else{
            $company->delete();

            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Uspešno ste uklonili kompaniju';

        return response()->json($response);
        }
        
    }

    public function delete(Request $request, $id)
    {
        $company = Company::findOrFail($id);

        if(is_null($company)){

            $response['status'] = 2;
            $response['code'] = 404;
            $response['message'] = 'Kompanija nije registrovana';

            return response()->json($response);
        }else{
            $company->active = '0';
            $company->save();

            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Uspešno ste uklonili kompaniju';

        return response()->json($response);
        }
    }

    public function activateCompany(Request $request, $id)
    {
        $company = Company::findOrFail($id);

        if(is_null($company)){

            $response['status'] = 2;
            $response['code'] = 404;
            $response['message'] = 'Kompanija nije registrovan';

            return response()->json($response);
        }else{
            $company->active = '1';
            $company->save();

            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Uspešno aktivirali kompaniju';

        return response()->json($response);
        }
    }

    
}
