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
  add_theme_support('post-thumbnails');
  add_theme_support('automatic-feed-links');
  add_theme_support('title-tag');
  add_theme_support('custom-logo',array(
    "width"=>400,
    "height"=>100,
    "flex-width"=>true,
    "flex-height"=>true,
    "header-text"=>array("site-title"),
  ));
}
}
add_action('after_setup_theme','abs_setup');

function abs_scripts(){
  wp_enqueue_script('main',get_theme_file_uri().'/js/main.js',array('jquery'));
  wp_enqueue_script('modernizr',get_theme_file_uri().'/js/modernizr.js','','1',true);
  wp_enqueue_script('pace',get_theme_file_uri().'/js/pace.min.js','','1',true);
  wp_enqueue_script('plugins',get_theme_file_uri().'/js/plugins.js',array('jquery'),'2',true);
  
  wp_enqueue_style('style',get_stylesheet_uri());
  wp_enqueue_style('fonts',get_theme_file_uri().'/css/fonts.css',array('style'));
  wp_enqueue_style('main',get_theme_file_uri().'/css/main.css',array('style'));
  wp_enqueue_style('vendor',get_theme_file_uri().'/css/vendor.css',array('main'));
  wp_enqueue_style('micons',get_theme_file_uri().'/css/micons/micons.css');
  wp_enqueue_style('fntawsm',get_theme_file_uri().'/css/font-awesome/css/font-awesome.min.css');
}
add_action('wp_enqueue_scripts','abs_scripts');

function abs_nav_menu_register(){
  register_nav_menus(array(
    'top-menu'=>__('Top Menu')
  ))
}
add_action('init','abs_nav_menu_register')

?>
