<?php
require __DIR__.'/vendor/autoload.php';
$app = require __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
\App\Models\Word::limit(5)->get()->each(function ($w) {
    echo $w->word,'|',$w->signature,PHP_EOL;
});
?>
