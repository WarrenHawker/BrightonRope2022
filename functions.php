<?php
//LIVE WEBSITE FILE
if(!defined('ABSPATH') ) EXIT; //Exit if accessed directly
$roots_includes = array(
  '/functions/custom-post-types.php',
  '/functions/contact-form.php',
  '/functions/events/event-admin.php',
  '/functions/events/event-database.php',
);

foreach($roots_includes as $file){
  if(!$filepath = locate_template($file)) {
    trigger_error("Error locating `$file` for inclusion!", E_USER_ERROR);
  }

  require_once $filepath;
}
unset($file, $filepath);


function my_remove_admin_menus() {
    remove_menu_page( 'edit-comments.php' );
}
add_action('admin_menu', 'my_remove_admin_menus');

function remove_comment_support() {
    remove_post_type_support( 'post', 'comments' );
    remove_post_type_support( 'page', 'comments' );
}
add_action('init', 'remove_comment_support', 100);

function mytheme_admin_bar_render() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('comments');
}
add_action('wp_before_admin_bar_render', 'mytheme_admin_bar_render');

function brighton_rope_styles() {
  wp_enqueue_style(
    'website-stylesheet',
    get_stylesheet_uri(),
    array(),
    '1.0',
    'all'
  );
};
add_action('wp_enqueue_scripts', 'brighton_rope_styles');

function brighton_rope_scripts() {
  wp_enqueue_script(
    'index.js',
    get_stylesheet_directory_uri() . '/build/frontend/index.js',
    array('jquery'),
    '1.0.0',
    true
  );  
};
add_action('wp_enqueue_scripts', 'brighton_rope_scripts');

function brighton_rope_theme_setup() {
  add_theme_support('title-tag');
  add_theme_support('custom-logo');
  add_theme_support('widgets');

  register_nav_menus( array( 
    'header' => 'Display this menu in the Header',
  ));
};
add_action('after_setup_theme', 'brighton_rope_theme_setup');

function brighton_rope_sidebars() {
  register_sidebar( array(
		'name'          => 'Footer Section One',
		'id'            => 'footer-section-one',
		'description'   => 'Widgets added here will appear inside the first section of the footer',
		'before_widget' => '',
    'before_title' => '',
  ));

  register_sidebar( array(
		'name'          => 'Footer Section Two',
		'id'            => 'footer-section-two',
		'description'   => 'Widgets added here will appear inside the second section of the footer',
		'before_widget' => '',
    'before_title' => '',
  ));

  register_sidebar( array(
		'name'          => 'Footer Section Three',
		'id'            => 'footer-section-three',
		'description'   => 'Widgets added here will appear inside the third section of the footer',
		'before_widget' => '',
    'before_title'  => '',
  ));

  register_sidebar( array(
    'name'          => 'Homepage Sidebar',
    'id'            => 'homepage-sidebar',
    'description'   => 'Widgets added here will appear on the homepage',
    'before_widget' => '',
    'before_title'  => '',
  ));
};
add_action( 'widgets_init', 'brighton_rope_sidebars' );

//font awesome kit setup
if (! function_exists('fa_custom_setup_kit') ) {
  function fa_custom_setup_kit($kit_url = '') {
    foreach ( [ 'wp_enqueue_scripts', 'admin_enqueue_scripts', 'login_enqueue_scripts' ] as $action ) {
      add_action(
        $action,
        function () use ( $kit_url ) {
          wp_enqueue_script( 'font-awesome-kit', $kit_url, [], null );
        }
      );
    }
  }
}
fa_custom_setup_kit('https://kit.fontawesome.com/0de87d0496.js');

function brighton_rope_admin_styles() {
  wp_enqueue_style(
    'admin-main-stylesheet',
    get_stylesheet_directory_uri() . '/styles/backend/admin-styles.css',
    array(),
    '1.0',
  );
}
add_action( 'admin_enqueue_scripts', 'brighton_rope_admin_styles' );

function brighton_rope_admin_scripts() {
  wp_register_script( 
    'admin', 
    get_stylesheet_directory_uri() . '/build/backend/admin.js', 
    array( 'jquery' ),
    '1.0.0',
    true 
  );

  $script_data_array = array(
    'ajaxurl' => admin_url( 'admin-ajax.php' ),
  );

  wp_localize_script('admin', 'ajaxData', $script_data_array);
  wp_enqueue_script( 'admin' );
}
add_action( 'admin_enqueue_scripts', 'brighton_rope_admin_scripts' );