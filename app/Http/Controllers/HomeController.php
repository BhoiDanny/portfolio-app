<?php

namespace App\Http\Controllers;

use App\Http\Resources\AboutResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\About; 

class HomeController extends Controller
{
   public function home()
   {
      return Inertia::render('portfolio', [
        'about' => new AboutResource(About::first()),
        
      ]);
   }
}