<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sale extends Model {
    protected $fillable = [
        'customer_id',
        'sale_date',
        'status',
        'total_amount',
    ];

    public function saleItems():HasMany {
        return $this->hasMany( SaleItem::class );
    }

    public function customer():BelongsTo {
        return $this->belongsTo( Customer::class );
    }

    public function products():HasMany {
        return $this->hasMany( Product::class );
    }
}
