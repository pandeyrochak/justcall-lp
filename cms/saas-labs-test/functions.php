<?php
function saas_test_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'saas_test_setup');

add_action('rest_api_init', function() {
    register_rest_field('page', 'acf', [
        'get_callback' => function($post_array) {
            return get_fields($post_array['id']);
        },
        'update_callback' => null,
        'schema'          => null,
    ]);
});

// Post Type to store emails
add_action('init', function() {
    register_post_type('submission', array(
        'labels' => array('name' => 'Submissions', 'singular_name' => 'Submission'),
        'public' => false, // Hide from search engines
        'show_ui' => true,  // Show in WordPress Admin sidebar
        'capability_type' => 'post',
        'capabilities' => array('create_posts' => false), // Prevent manual creation
        'map_meta_cap' => true,
        'supports' => array('title', 'custom-fields'),
    ));
});

// API Endpoint to receive the form
add_action('rest_api_init', function () {
    register_rest_route('saas/v1', '/submit-form', array(
        'methods' => 'POST',
        'callback' => 'handle_form_submission',
        'permission_callback' => '__return_true', // In production, add a secret token check here
    ));
});

// save email method
function handle_form_submission($request) {
    $email = sanitize_email($request->get_param('email'));

    if (!is_email($email)) {
        return new WP_Error('invalid_email', 'Please provide a valid email', array('status' => 400));
    }

    // Insert the submission as a new post
    $post_id = wp_insert_post(array(
        'post_type'   => 'submission',
        'post_title'  => $email,
        'post_status' => 'publish',
    ));

    if ($post_id) {
        return rest_ensure_response(array('success' => true, 'message' => 'Email captured!'));
    }

    return new WP_Error('save_error', 'Could not save submission', array('status' => 500));
}

function trigger_nextjs_revalidation($post_id) {
    if (get_post_status($post_id) !== 'publish') return;

    $nextjs_url = 'https://justcall-lp.vercel.app/api/revalidate';
    $secret = 'justcalllandingpageupdatesecret';
    
    // URL to hit (Targeting the homepage/landing page)
    $webhook_url = add_query_arg([
        'secret' => $secret
    ], $nextjs_url);

    // Send the request (non-blocking)
    wp_remote_get($webhook_url, [
        'timeout' => 5,
        'blocking' => false, // Don't slow down the WP save process
    ]);
}

// Fire the function whenever a post/page is saved
add_action('wp_after_insert_post', 'trigger_nextjs_revalidation', 10, 1);