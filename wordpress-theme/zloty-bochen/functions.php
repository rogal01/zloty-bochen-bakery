<?php

function zb_setup(): void {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');

    register_nav_menus([
        'primary' => __('Primary Menu', 'zloty-bochen'),
    ]);
}
add_action('after_setup_theme', 'zb_setup');

function zb_assets(): void {
    wp_enqueue_style('zloty-bochen-style', get_stylesheet_uri(), [], wp_get_theme()->get('Version'));
}
add_action('wp_enqueue_scripts', 'zb_assets');

function zb_register_post_types(): void {
    register_post_type('zb_cake', [
        'labels' => [
            'name' => __('Cakes', 'zloty-bochen'),
            'singular_name' => __('Cake', 'zloty-bochen'),
        ],
        'public' => true,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-food',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
    ]);

    register_post_type('zb_location', [
        'labels' => [
            'name' => __('Locations', 'zloty-bochen'),
            'singular_name' => __('Location', 'zloty-bochen'),
        ],
        'public' => true,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-location-alt',
        'supports' => ['title', 'editor', 'custom-fields'],
    ]);

    register_post_type('zb_inquiry', [
        'labels' => [
            'name' => __('Cake inquiries', 'zloty-bochen'),
            'singular_name' => __('Cake inquiry', 'zloty-bochen'),
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-email-alt2',
        'supports' => ['title', 'editor', 'custom-fields'],
    ]);
}
add_action('init', 'zb_register_post_types');

function zb_handle_inquiry(): void {
    if (!isset($_POST['zb_inquiry_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['zb_inquiry_nonce'])), 'zb_inquiry')) {
        wp_die(__('Invalid form submission.', 'zloty-bochen'));
    }

    $name = sanitize_text_field(wp_unslash($_POST['name'] ?? ''));
    $contact = sanitize_text_field(wp_unslash($_POST['contact'] ?? ''));
    $cake_size = sanitize_text_field(wp_unslash($_POST['cake_size'] ?? ''));
    $flavor = sanitize_text_field(wp_unslash($_POST['flavor'] ?? ''));
    $pickup_date = sanitize_text_field(wp_unslash($_POST['pickup_date'] ?? ''));
    $message = sanitize_textarea_field(wp_unslash($_POST['message'] ?? ''));

    $post_id = wp_insert_post([
        'post_type' => 'zb_inquiry',
        'post_status' => 'private',
        'post_title' => sprintf('Zapytanie: %s - %s', $name ?: 'Klient', $pickup_date ?: current_time('Y-m-d')),
        'post_content' => $message,
    ]);

    if (!is_wp_error($post_id) && $post_id) {
        update_post_meta($post_id, 'contact', $contact);
        update_post_meta($post_id, 'cake_size', $cake_size);
        update_post_meta($post_id, 'flavor', $flavor);
        update_post_meta($post_id, 'pickup_date', $pickup_date);
    }

    wp_safe_redirect(add_query_arg('sent', '1', wp_get_referer() ?: home_url('/')) . '#zapytanie');
    exit;
}
add_action('admin_post_zb_cake_inquiry', 'zb_handle_inquiry');
add_action('admin_post_nopriv_zb_cake_inquiry', 'zb_handle_inquiry');

function zb_demo_cakes(): array {
    return [
        ['title' => 'Royal Choco', 'text' => 'Czekoladowy mus, chrupka orzechowa i eleganckie wykończenie.'],
        ['title' => 'Pistacja', 'text' => 'Delikatny krem pistacjowy, biała czekolada i jasny biszkopt.'],
        ['title' => 'Rafaello', 'text' => 'Kokos, migdały i lekka śmietankowa struktura na rodzinne okazje.'],
    ];
}

function zb_demo_locations(): array {
    return [
        ['title' => 'Nowe Brzegi', 'text' => 'ul. Miodowa 12, główna pracownia i kawiarnia.'],
        ['title' => 'Słoneczna', 'text' => 'Rynek 4, cukiernia otwarta również w niedzielę.'],
        ['title' => 'Młynary', 'text' => 'ul. Zbożowa 8, punkt odbioru tortów.'],
    ];
}
