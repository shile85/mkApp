<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Fasades\Hash;
use App\Models\User;
use App\Models\Document;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTExceptions;

class UserController extends Controller
{
    public function register(Request $request){

        $user = User::where('email', $request['email'])->first();

        if($user){
            $response['status'] = 0;
            $response['message'] = 'Email already exists';
            $response['code'] = 409;
        }else{
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'roleId' => $request->roleId,
                'first_name' => $request->firstName,
                'last_name' => $request->lastName,
                'position' => $request->position,
                'address' => $request->address,
                'city' => $request->city,
                'status' => '1',
                'telephone' => $request->telephone,
                'businessPhone' => $request->businessPhone,
                'birthDay' => $request->birthDay,
                'image' => 'profileImg/default.png'
                

            ]);
            $response['status'] = 1;
            $response['message'] = 'User registration successful';
            $response['code'] = 201;
        }

        

        return response()->json($response);

    }

    public function login(Request $request){
        $credentials = $request->only('email', 'password');
        try{
            if(!JWTAuth::attempt($credentials)){
                $response['status'] = 0;
                $response['code'] = 401;
                $response['data'] = null;
                $response['message'] = 'Email or password is incorrect';
                return response()->json($response);
            }
        }catch(JWTException $e){
            $response['data'] = null;
            $response['code'] = 500;
            $response['message'] = 'Could not create token';
            return response()->json($response);
        }

        

        $user = auth()->user();
        $data['token'] = auth()->claims([
            'roleId' => $user->roleId,
            'firstName' => $user->first_name,
            'lastName' => $user->last_name,
            'image' => $user->image,
            'userId' => $user->id
        ])->attempt($credentials);

        $response['data'] = $data;
        $response['status'] = 1;
        $response['code'] = 200;
        $response['message'] = 'Login seccessful';

        return response()->json($response);

    }

    public function getUsers(){
        return response()->json(User::all(),200);
    }

    public function getActiveUsers(){
        $users = User::where('status', '1') -> get();
        return response()->json($users,200);
    }

    public function getUserById($id){
        $user = User::find($id);
        if(is_null($user)){
            return response()->json(['message' => 'Korisnik nije registrovan'], 404);
        }
        return response()->json($user, 200);
    }

    public function updateUser(Request $request, $id){
        $user = User::find($id);
        if(is_null($user)){

            $response['status'] = 2;
            $response['code'] = 404;
            $response['message'] = 'Korisnik nije registrovan';

            return response()->json($response);
        }else{
            $user->update($request->all());

            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Uspešno ste izmenili podatke';

        return response()->json($response);
        }
        
    }

    public function storePicture(Request $request, $id){

        if($request->hasfile('image')){
            $completeFilename = $request->file('image')->getClientOriginalName();
            $fileNameOnly = pathinfo($completeFilename, PATHINFO_FILENAME);
            $extension = $request->file('image')->getClientOriginalExtension();
            $compPic = str_replace(' ', '_', $fileNameOnly).'-'.rand().'_'.time().'.'.$extension;
            $upload = $request->file('image')->storeAs('public/profileImg', $compPic);
            $path = 'profileImg/'. $compPic; 
            $user = User::find($id);
            $user->image = $path;
            if($user->save()){
                $response['status'] = 1;
                $response['code'] = 200;
                $response['message'] = 'Uspešno ste izmenili sliku';

                return response()->json($response);
            }else{
                $response['status'] = 2;
                $response['code'] = 400;
                $response['message'] = 'Došlo je do greške';

                return response()->json($response);
            }

        }

    }

    public function deleteUser(Request $request, $id){
        $user = User::find($id);
        if(is_null($user)){
            return response()->json(['message' => 'Korisnik nije registrovan'], 404);
        }
        $user->delete();
        return response()->json(['message' => 'Korisnik uspešno obrisan'], 200);
    }

    public function softDeleteUser(Request $request, $id){

        $user = User::find($id);
        if(is_null($user)){

            $response['status'] = 2;
            $response['code'] = 404;
            $response['message'] = 'Korisnik nije registrovan';

            return response()->json($response);
        }else{
            $user->status = '0';
            $user->save();

            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Uspešno ste uklonili korisnika';

        return response()->json($response);
        }

    }

    

    
}
