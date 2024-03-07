<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Contact;

class ContactsController extends Controller
{
    //

    


    public function index($user_id){
        $contacts = Contact::all()->where('user_id', '=', $user_id)->values();
        return response()->json($contacts);
    }

    public function create(Request $request){
        $contact=Contact::create([
            'user_id'=> $request ->user_id,
            'name'=>    $request ->name,
            'title' =>    $request ->title,
            'profilePic' =>    $request ->profilePic,
            'address' =>    $request ->address,
            'phone' =>    $request ->phone,
            'email' =>    $request ->email,

            
        ]);
        return response()->json($contact);
    }

    /* public function edit($id){
        $contact=Contact::find($id);
        return response()->json($contact);
    } */

    public function update(Request $request,$id){
        $contact=Contact::findOrFail($id)->update([
            'name'=> $request -> name,
            'title' =>    $request ->title,
            'profilePic' =>    $request ->profilePic,
            'address' =>    $request ->address,
            'phone' =>    $request ->phone,
            'email' =>    $request ->email,
        ]);
        return $contact;
    }

    public function delete($id){
        $contact=Contact::find($id)->delete();
        return response()->json($contact);

    }
}
