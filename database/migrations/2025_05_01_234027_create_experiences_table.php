<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('job_title');
            $table->string('company');
            $table->string('location')->nullable()->default('Remote');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->text('description')->nullable();    
            $table->string('website')->nullable();
            $table->string('logo')->nullable();
            $table->json('achievements')->nullable();
            $table->enum('type', ['job', 'internship', 'volunteer'])->default('job');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};