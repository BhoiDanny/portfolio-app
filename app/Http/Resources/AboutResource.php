<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AboutResource extends JsonResource
{

    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->title,
            'description' => $this->description,
            'profile_picture' => $this->profile_picture_url,
            'statistics' => $this->statistics,
            'social_links' => $this->social_links,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'location' => $this->location,
            'trusted_by' => $this->trusted_by ? collect($this->trusted_by)->map(function ($item) {
                return [
                    'name' => $item['name'] ?? '',
                    'logo' => isset($item['logo']) ? asset('storage/' . $item['logo']) : null,
                    'url' => $item['url'] ?? '',
                ];
            }) : [],
            // trusted_by logo 
        ];
    }
}
