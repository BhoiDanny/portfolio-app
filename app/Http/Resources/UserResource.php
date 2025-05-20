<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{

  //? disable data wrap 
  public static $wrap = null;


  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this?->id,
      'name' => $this?->name,
      'email' => $this?->email,
      'bio' => $this?->bio,
      'occupation' => $this?->occupation,
      'avatar' => $this?->avatar(),
      'resume_url' => $this?->resume(),
      //'created_at ' => $this->created_at?->format('Y-m-d'),
      //'updated_at' => $this->updated_at?->format('Y-m-d'),
    ];
  }
}
