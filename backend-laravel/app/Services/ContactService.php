<?php

namespace App\Services;
use App\Models\Contact;

class ContactService{


    public function getContacts($user_id){
        $contacts = Contact::all()->where('user_id', '=', $user_id)->values();
        return response()->json($contacts);

    }

    public function storeContact($request){
        $contact=Contact::create([
            'user_id'=> $request ->user_id,
            'name'=>    $request ->name,
            'title' =>    $request ->title,
            'profilePic' =>   $request ->profilePic,
            'address' =>    $request ->address,
            'phone' =>    $request ->phone,
            'email' =>    $request ->email,
        ]);
        return response()->json($contact);
    }

    public function updateContact($request,$id){
        $contact=Contact::findOrFail($id)->update([
            'name'=> $request -> name,
            'title' =>    $request ->title,
            'profilePic' =>    $request ->profilePic,
            'address' =>    $request ->address,
            'phone' =>    $request ->phone,
            'email' =>    $request ->email,
        ]);

    }

    public function deleteContact($id){
        $contact=Contact::find($id)->delete();

    }


}