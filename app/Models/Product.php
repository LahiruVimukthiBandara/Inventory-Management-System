<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model {

    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'description',
        'sku',
        'brand_id',
        'category_id',
        'cost_price',
        'selling_price',
        'stock_quantity',
        'reorder_level',
        'status'
    ];

    public function brand():BelongsTo {
        return $this->belongsTo( Brand::class );
    }

    public function purches():BelongsTo {
        return $this->belongsTo( Purches::class );
    }

    public function sale():BelongsTo {
        return $this->belongsTo( Sale::class );
    }

    public function category():BelongsTo {
        return $this->belongsTo( Category::class );
    }

    public function saleItems(): HasMany {
        return $this->hasMany( SaleItem::class );
    }

    public function purchesItems(): HasMany {
        return $this->hasMany( PurchesItem::class );
    }
}
