<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
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
            'title' => $this->name,
            'description' => $this->description,
            'image' => $this->projectImage(),
            'demoLink' => $this->demo_link,
            'githubLink' => $this->github_link,
            'tags' => $this->tags,
            'featured' => $this->featured,
            'details' => $this->details,
        ];
    }

    /**
     * Prepare the resource for serialization.
     *
     * @return array<string, mixed>
     */
    public function with($request): array
    {
        return [
            // 'status' => 'success',
            // 'message' => 'Project retrieved successfully',
        ];
    }


    /**
     * Prepare the resource for serialization.
     *
     * @return array<string, mixed>
     */
    public function additional($request): array
    {
        return [
            'status' => 'success',
            'message' => 'Project retrieved successfully',
        ];
    }
}