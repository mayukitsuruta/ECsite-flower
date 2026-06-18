<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('order_number')->unique();
            $table->enum('status', ['pending', 'confirmed', 'ready', 'completed', 'cancelled'])->default('pending');
            $table->unsignedInteger('subtotal');
            $table->unsignedInteger('total');
            $table->enum('fulfillment_type', ['pickup', 'delivery'])->default('pickup');
            $table->string('pickup_store')->nullable();
            $table->dateTime('pickup_at')->nullable();
            $table->string('recipient_name');
            $table->string('recipient_phone');
            $table->text('delivery_address')->nullable();
            $table->text('message_card')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
