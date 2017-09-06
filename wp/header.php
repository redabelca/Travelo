<!DOCTYPE html>
<!--[if IE 8 ]><html class="no-js oldie ie8" lang="en"> <![endif]-->
<!--[if IE 9 ]><html class="no-js oldie ie9" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!-->
<html class="no-js" <?php language_attributes(); ?>>
<!--<![endif]-->

<head>

  <!--- basic page needs
   ================================================== -->
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="description" content="<?php bloginfo('description'); ?>">

  <!-- mobile specific metas
   ================================================== -->
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- favicons
	================================================== -->
  <!--<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
  <link rel="icon" href="favicon.ico" type="image/x-icon">-->
  <?php wp_head(); ?>
</head>

<body id="top">

  <!-- header 
   ================================================== -->
  <header class="short-header">

    <div class="gradient-block"></div>

    <div class="row header-content">

      <div class="logo">
        <a href="<?php echo esc_url(home_url('/')); ?>"><?php if(function_exists('the_custom_logo')){the_custom_logo()}; ?></a>
      </div>

      <!--<nav id="main-nav-wrap">
        <ul class="main-navigation sf-menu">
          <li class="current"><a href="index.html" title="">Home</a></li>
          <li class="has-children">
            <a href="single-standard.html" title="">Blog</a>
            <ul class="sub-menu">
              <li><a href="single-video.html">Video Post</a></li>
              <li><a href="single-audio.html">Audio Post</a></li>
            </ul>
          </li>
          <li><a href="style-guide.html" title="">Styles</a></li>
        </ul>
      </nav>-->
      <!-- end main-nav-wrap -->
      <?
      php wp_nav_menu(array(
        'menu_class'=>'main-navigation sf-menu',
        'container'=>'nav',
        'container_id'=>'main-nav-wrap',
        'theme_location'=>'top-menu'
      )); 
      ?>

      <div class="search-wrap">

        <form role="search" method="get" class="search-form" action="#">
          <label>
            <span class="hide-content">Search for:</span>
            <input type="search" class="search-field" placeholder="Type Your Keywords" value="" name="s" title="Search for:" autocomplete="off">
          </label>
          <input type="submit" class="search-submit" value="Search">
        </form>

        <a href="#" id="close-search" class="close-btn">Close</a>

      </div>
      <!-- end search wrap -->

      <div class="triggers">
        <a class="search-trigger" href="#"><i class="fa fa-search"></i></a>
        <a class="menu-toggle" href="#"><span>Menu</span></a>
      </div>
      <!-- end triggers -->

    </div>

  </header>
  <!-- end header -->
