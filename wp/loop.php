<div class="entry-thumb">
  <a href="<?php the_permalink(); ?>" class="thumb-link">
    <?php the_post_thumbnail(); ?>
  </a>
</div>
<div class="entry-text">
  <div class="entry-header">

    <div class="entry-meta">
      <span class="cat-links">
        <a href="#">Design</a>
        <a href="#">Photography</a>
      </span>
    </div>
    
    <h1 class="entry-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
    
  </div>
  <div class="entry-excerpt">
    <?php the_excerpt(); ?>
  </div>
</div>