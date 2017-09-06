<?php get_header();?>

<!-- masonry
   ================================================== -->
<section id="bricks">
  <div class="row masonry">
    <div class="bricks-wrapper">
      <div class="grid-sizer"></div>

    <?php if(have_posts()){while(have_posts()){the_post(); ?>
      <article class="brick entry format-standard animate-this">
        <?php get_template_part('loop',get_post_format()); ?>
      </article>
<?php
  }
}else{?>
      <article>
        <h2>
          <?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?>
        </h2>
      </article>
<?php}
?>
    </div>
  </div>
  
  <?php 
  the_posts_pagination(array());
  ?>
</section>

<?php get_footer(); ?>
