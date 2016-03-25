<form role="search" method="get" class="search-form form-inline" action="<?= esc_url(home_url('/')); ?>">
  <label class="sr-only"><?php _e('Search for:', 'janne'); ?></label>
  <div class="input-group">
    <input type="search" value="<?= get_search_query(); ?>" name="s" class="search-field form-control" placeholder="<?php _e('Search', 'janne'); ?> <?php bloginfo('name'); ?>" required>
    
  </div>
</form>
