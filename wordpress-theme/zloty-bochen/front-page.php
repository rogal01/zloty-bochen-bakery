<?php get_header(); ?>

<main>
  <section class="zb-hero">
    <div class="zb-hero-content">
      <p class="zb-label">WordPress theme demo</p>
      <h1>Edytowalna strona piekarni dla klienta, który zna WordPressa.</h1>
      <p>
        Ten wariant pokazuje tę samą markę jako motyw WordPress: właściciel może edytować treści,
        dodawać torty i odbierać zapytania bez dotykania kodu.
      </p>
      <a class="zb-button" href="#zapytanie">Zapytaj o tort</a>
    </div>
  </section>

  <section id="torty" class="zb-section">
    <p class="zb-label">Custom post type</p>
    <h2>Torty z panelu WordPress</h2>
    <div class="zb-grid">
      <?php
      $cakes = new WP_Query([
          'post_type' => 'zb_cake',
          'posts_per_page' => 3,
      ]);

      if ($cakes->have_posts()) :
          while ($cakes->have_posts()) :
              $cakes->the_post();
              ?>
              <article class="zb-card">
                <h3><?php the_title(); ?></h3>
                <p><?php echo esc_html(wp_trim_words(get_the_excerpt() ?: get_the_content(), 24)); ?></p>
              </article>
              <?php
          endwhile;
          wp_reset_postdata();
      else :
          foreach (zb_demo_cakes() as $cake) :
              ?>
              <article class="zb-card">
                <h3><?php echo esc_html($cake['title']); ?></h3>
                <p><?php echo esc_html($cake['text']); ?></p>
              </article>
              <?php
          endforeach;
      endif;
      ?>
    </div>
  </section>

  <section id="lokalizacje" class="zb-section">
    <p class="zb-label">Editable locations</p>
    <h2>Punkty odbioru</h2>
    <div class="zb-grid">
      <?php
      $locations = new WP_Query([
          'post_type' => 'zb_location',
          'posts_per_page' => 3,
      ]);

      if ($locations->have_posts()) :
          while ($locations->have_posts()) :
              $locations->the_post();
              ?>
              <article class="zb-card">
                <h3><?php the_title(); ?></h3>
                <p><?php echo esc_html(wp_trim_words(get_the_content(), 26)); ?></p>
              </article>
              <?php
          endwhile;
          wp_reset_postdata();
      else :
          foreach (zb_demo_locations() as $location) :
              ?>
              <article class="zb-card">
                <h3><?php echo esc_html($location['title']); ?></h3>
                <p><?php echo esc_html($location['text']); ?></p>
              </article>
              <?php
          endforeach;
      endif;
      ?>
    </div>
  </section>

  <section id="zapytanie" class="zb-section zb-split">
    <div>
      <p class="zb-label">WordPress database</p>
      <h2>Zapytania trafiają do panelu admina.</h2>
      <p>
        Formularz zapisuje zgłoszenia jako prywatne wpisy typu “Cake inquiries”.
        To pokazuje praktyczne użycie bazy WordPressa bez budowania osobnego pluginu.
      </p>
      <?php if (isset($_GET['sent'])) : ?>
        <p class="zb-notice">Dziękujemy. Zapytanie demo zostało zapisane w WordPressie.</p>
      <?php endif; ?>
    </div>

    <div class="zb-form-wrap">
      <form class="zb-form" method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
        <input type="hidden" name="action" value="zb_cake_inquiry">
        <?php wp_nonce_field('zb_inquiry', 'zb_inquiry_nonce'); ?>
        <label>
          Imię i nazwisko
          <input name="name" required placeholder="Anna Kowalska">
        </label>
        <label>
          Telefon lub e-mail
          <input name="contact" required placeholder="+48 500 700 900">
        </label>
        <label>
          Wielkość tortu
          <select name="cake_size">
            <option>1.2 kg</option>
            <option>2.0 kg</option>
            <option>3.0 kg</option>
          </select>
        </label>
        <label>
          Smak
          <select name="flavor">
            <option>Royal Choco</option>
            <option>Pistacja</option>
            <option>Rafaello</option>
            <option>Bueno</option>
          </select>
        </label>
        <label>
          Data odbioru
          <input type="date" name="pickup_date" required>
        </label>
        <label>
          Wiadomość
          <textarea name="message" rows="5" placeholder="Okazja, napis, preferencje dekoracji"></textarea>
        </label>
        <button type="submit">Zapisz zapytanie</button>
      </form>
    </div>
  </section>
</main>

<?php get_footer(); ?>
