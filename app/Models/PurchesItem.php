<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PurchesItem extends Model {
    protected $fillable = [
        'purches_id',
        'product_id',
        'quantity',
        'cost_price',
        'subtotal',
    ];

    public function purches():BelongsTo {
        return $this->belongsTo( Purches::class );
    }

    public function products():HasMany {
        return $this->hasMany( Product::class, 'id' );
    }
}
