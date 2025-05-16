<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExperienceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'job_title' => $this->job_title,
            'company' => $this->company,
            'location' => $this->location,
            'start_date' => $this->start_date->format('Y-m-d'),
            'end_date' => $this?->end_date?->format('Y-m-d'),
            'description' => $this?->description,
            'website' => $this?->website,
            'logo' => $this->experienceLogo(),
            'achievements' => $this?->achievements,
            'type' => $this?->type,
            'published' => $this?->published,
            'created_at' => $this?->created_at,
            'updated_at' => $this?->updated_at,
        ];
    }
}
