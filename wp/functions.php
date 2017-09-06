<?php
/*
  add_theme_support('custom-header', array(
	'default-image'			=> get_template_directory_uri() . '/img/headers/default.jpg',
	'header-text'			=> false,
	'default-text-color'		=> '000',
	'width'				=> 1000,
	'height'			=> 198,
	'random-default'		=> false,
	'wp-head-callback'		=> $wphead_cb,
	'admin-head-callback'		=> $adminhead_cb,
	'admin-preview-callback'	=> $adminpreview_cb
  ));
*/
function abs_setup(){
if (function_exists('add_theme_support')){
  add_theme_support('menus');
  add_theme_support('post-thumbnails');
  add_theme_support('automatic-feed-links');
  add_theme_support('title-tag');
}
}
add_action('after_setup_theme','abs_setup');

function abs_scripts(){
  wp_enqueue_script();
  wp_enqueue_script();
  wp_enqueue_script();
  wp_enqueue_script();
  
  wp_enqueue_style();
  wp_enqueue_style();
  wp_enqueue_style();
  wp_enqueue_style();
}
add_action('wp_enqueue_scripts','abs_scripts');
?>
