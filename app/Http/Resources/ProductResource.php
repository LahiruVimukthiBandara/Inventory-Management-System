<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource {
    /**
    * Transform the resource into an array.
    *
    * @return array<string, mixed>
    */

    public function toArray( Request $request ): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'image'=> $this->image,
            'description'=> $this->description,
            'sku'=> $this->sku,
            'brand'=> new BrandResource( $this->brand ),
            'category'=> new CategoryResource( $this->category ),
            'purchesItems'=> new PurchesItemResource( $this->purchesItems ),
            'saleItems'=> new SaleItemsResource( $this->saleItems ),
            'cost_price'=> $this->cost_price,
            'selling_price'=> $this->selling_price,
            'stock_quantity'=> $this->stock_quantity,
            'reorder_level'=> $this->reorder_level,
            'status' => $this->status,
            'created_at' => ( new Carbon( $this->created_at ) )->format( 'd,M,Y' ),
            'updated_at' => ( new Carbon( $this->updated_at ) )->diffForHumans(),
        ];
    }
}
