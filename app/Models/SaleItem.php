<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SaleItem extends Model {
    protected $fillable = [
        'sale_id',
        'product_id',
        'quantity',
        'selling_price',
        'sub_total',
    ];

    public function sale():BelongsTo {
        return $this->belongsTo( Sale::class );
    }

    public function product(): BelongsTo {
        return $this->belongsTo( Product::class );
    }

}
