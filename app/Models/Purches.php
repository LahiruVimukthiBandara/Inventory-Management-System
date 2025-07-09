<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Purches extends Model {
    protected $fillable = [
        'supplier_id',
        'purchase_date',
        'status',
        'total_amount',
    ];

    public function purchesItems():HasMany {
        return $this->hasMany( PurchesItem::class );
    }

    public function supplier(): BelongsTo {
        return $this->belongsTo( Supplier::class );
    }
}
