<?php

namespace Tests\Unit;

use App\Models\Word;
use App\Services\AnagramService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AnagramServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_generates_consistent_signatures(): void
    {
        $service = new AnagramService();

        $this->assertSame('estt', $service->signature('test'));
    }

    public function test_normalizes_words(): void
    {
        $service = new AnagramService();

        $this->assertSame('test', $service->makeParseable('    TEsT   '));
    }

    public function test_finds_anagrams_in_database(): void
    {
        $service = new AnagramService();

        Word::insert([
            ['word' => 'rest', 'signature' => $service->signature('rest')],
            ['word' => 'erst', 'signature' => $service->signature('erst')],
            ['word' => 'test', 'signature' => $service->signature('test')],
        ]);

        $anagrams = $service->findAnagrams('rest');

        $this->assertSame(['erst'], $anagrams);
    }
}
