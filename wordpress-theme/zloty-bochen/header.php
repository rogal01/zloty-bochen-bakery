<!doctype html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    <header class="zb-header">
      <a class="zb-brand" href="<?php echo esc_url(home_url('/')); ?>">
        <span><?php bloginfo('name'); ?></span>
        <small><?php bloginfo('description'); ?></small>
      </a>
      <nav class="zb-nav" aria-label="<?php esc_attr_e('Primary navigation', 'zloty-bochen'); ?>">
        <?php
        wp_nav_menu([
            'theme_location' => 'primary',
            'container' => false,
            'fallback_cb' => function () {
                echo '<ul><li><a href="#torty">Torty</a></li><li><a href="#lokalizacje">Lokalizacje</a></li><li><a href="#zapytanie">Zapytanie</a></li></ul>';
            },
        ]);
        ?>
      </nav>
    </header>
