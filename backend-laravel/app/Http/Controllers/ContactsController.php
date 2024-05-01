<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Contact;
use App\Services\ContactService;

class ContactsController extends Controller
{


    public function index($user_id){
        $getcontacts=(new ContactService)->getContacts($user_id);
        return $getcontacts;
    }

    public function create(Request $request){
        $validated = $request->validate([
            'name' => 'required|max:255',
            'title' => 'required|max:255',
            'phone' => 'required|max:255',
            'email' => 'required|email',
        ]);
        $uploadcontact=(new ContactService)->storeContact($request);
        return  $uploadcontact;
    }

    
    public function update(Request $request,$id){
        $validated = $request->validate([
            'name' => 'required|max:255',
            'title' => 'required|max:255',
            'phone' => 'required|max:255',
            'email' => 'required|email',
           
        ]);
        $updatecontact=(new ContactService)->updateContact($request,$id);
        return $updatecontact;
    }

    public function delete($id){
        $deletecontact=(new ContactService)->deleteContact($id);
        return response()->json($deletecontact);
    }
}
