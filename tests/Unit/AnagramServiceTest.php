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

        $this->assertSame(
            $service->signature('test'),
            $service->signature('sest')
        );
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
            ['word' => 'test', 'signature' => $service->signature('test')],
            ['word' => 'rest', 'signature' => $service->signature('rest')],
            ['word' => 'stest', 'signature' => $service->signature('stest')],
        ]);

        $anagrams = $service->findAnagrams('test');

        $this->assertSame(['rest'], $anagrams);
    }
}
