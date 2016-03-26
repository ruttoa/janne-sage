<div class="entry-content">
  <?php the_content(); ?>
</div>
<footer>
<?php wp_link_pages(['before' => '<nav class="page-nav"><p>' . __('Pages:', 'janne'), 'after' => '</p></nav>']); ?>
</footer>