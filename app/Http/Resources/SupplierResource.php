<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierResource extends JsonResource {
    /**
    * Transform the resource into an array.
    *
    * @return array<string, mixed>
    */

    public function toArray( Request $request ): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'contact_person' => $this->contact_person,
            'phone' => $this->phone,
            'email' => $this->email,
            'status' => $this->status,
            'address' => $this->address,
            'created_at' => ( new Carbon( $this->created_at ) )->format( 'd, M, Y' ),
            'updated_at' => ( new Carbon( $this->updated_at ) )->diffForHumans(),
        ];

    }
}
