<?php
$submitted = $_SERVER['REQUEST_METHOD'] === 'POST';

function field(string $name): string {
    return htmlspecialchars(trim($_POST[$name] ?? ''), ENT_QUOTES, 'UTF-8');
}

$summary = null;

if ($submitted) {
    $summary = [
        'name' => field('name'),
        'contact' => field('contact'),
        'cake_size' => field('cake_size'),
        'flavor' => field('flavor'),
        'pickup_date' => field('pickup_date'),
        'message' => field('message'),
    ];
}
?>
<!doctype html>
<html lang="pl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Złoty Bochen | PHP inquiry form</title>
    <meta name="description" content="Server-rendered PHP cake inquiry form demo for a fictional bakery.">
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <main class="shell">
      <section class="intro">
        <p class="label">PHP shared-hosting demo</p>
        <h1>Zapytanie o tort bez ciężkiej aplikacji.</h1>
        <p>
          Ten wariant pokazuje prostą ścieżkę dla klienta, który ma klasyczny hosting PHP.
          Formularz renderuje potwierdzenie na serwerze i nie zapisuje danych.
        </p>
      </section>

      <section class="panel" aria-labelledby="form-title">
        <div>
          <h2 id="form-title">Formularz zapytania</h2>
          <p>Wypełnij dane testowe, aby zobaczyć serwerowe potwierdzenie.</p>
        </div>

        <form method="post" action="">
          <label>
            Imię i nazwisko
            <input name="name" required value="<?= $summary['name'] ?? '' ?>" placeholder="Anna Kowalska">
          </label>
          <label>
            Telefon lub e-mail
            <input name="contact" required value="<?= $summary['contact'] ?? '' ?>" placeholder="+48 500 700 900">
          </label>
          <label>
            Wielkość tortu
            <select name="cake_size">
              <option <?= ($summary['cake_size'] ?? '') === '1.2 kg' ? 'selected' : '' ?>>1.2 kg</option>
              <option <?= ($summary['cake_size'] ?? '') === '2.0 kg' ? 'selected' : '' ?>>2.0 kg</option>
              <option <?= ($summary['cake_size'] ?? '') === '3.0 kg' ? 'selected' : '' ?>>3.0 kg</option>
            </select>
          </label>
          <label>
            Smak
            <select name="flavor">
              <option <?= ($summary['flavor'] ?? '') === 'Royal Choco' ? 'selected' : '' ?>>Royal Choco</option>
              <option <?= ($summary['flavor'] ?? '') === 'Pistacja' ? 'selected' : '' ?>>Pistacja</option>
              <option <?= ($summary['flavor'] ?? '') === 'Rafaello' ? 'selected' : '' ?>>Rafaello</option>
              <option <?= ($summary['flavor'] ?? '') === 'Bueno' ? 'selected' : '' ?>>Bueno</option>
            </select>
          </label>
          <label>
            Data odbioru
            <input name="pickup_date" type="date" required value="<?= $summary['pickup_date'] ?? '' ?>">
          </label>
          <label>
            Wiadomość
            <textarea name="message" rows="5" placeholder="Napis na torcie, okazja, preferencje dekoracji"><?= $summary['message'] ?? '' ?></textarea>
          </label>
          <button type="submit">Wyślij zapytanie demo</button>
        </form>

        <?php if ($summary): ?>
          <aside class="result" role="status" aria-live="polite">
            <h2>Zapytanie przyjęte w trybie demo</h2>
            <dl>
              <div><dt>Klient</dt><dd><?= $summary['name'] ?></dd></div>
              <div><dt>Kontakt</dt><dd><?= $summary['contact'] ?></dd></div>
              <div><dt>Tort</dt><dd><?= $summary['cake_size'] ?>, <?= $summary['flavor'] ?></dd></div>
              <div><dt>Odbiór</dt><dd><?= $summary['pickup_date'] ?></dd></div>
              <div><dt>Uwagi</dt><dd><?= $summary['message'] ?: 'Brak dodatkowych uwag' ?></dd></div>
            </dl>
          </aside>
        <?php endif; ?>
      </section>
    </main>
  </body>
</html>
