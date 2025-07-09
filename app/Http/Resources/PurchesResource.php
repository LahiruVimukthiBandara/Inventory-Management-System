<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PurchesResource extends JsonResource {
    /**
    * Transform the resource into an array.
    *
    * @return array<string, mixed>
    */

    public function toArray( Request $request ): array {
        return [
            'id' => $this->id,
            'supplier' => new SupplierResource( $this->supplier ),
            'purchesItems' => new PurchesItemResource( $this->purchesItems ),
            'purchase_date' => ( new Carbon( $this->purchase_date ) )->format( 'd,M,Y' ),
            'status' => $this->status,
            'total_amount' => $this->total_amount,
            'created_at' => ( new Carbon( $this->created_at ) )->format( 'd,M,Y' ),
            'updated_at' => ( new Carbon( $this->updated_at ) )->diffForHumans(),
        ];
    }
}
