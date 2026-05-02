<?php get_header(); ?>

<main class="zb-section">
  <?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>
      <article class="zb-card">
        <h1><?php the_title(); ?></h1>
        <?php the_content(); ?>
      </article>
    <?php endwhile; ?>
  <?php else : ?>
    <article class="zb-card">
      <h1>Złoty Bochen</h1>
      <p>Activate the front page template to see the full bakery theme demo.</p>
    </article>
  <?php endif; ?>
</main>

<?php get_footer(); ?>
