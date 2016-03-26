<?php

namespace Janne\Extras;

use Janne\Setup;

/**
 * Add <body> classes
 */
function body_class($classes) {
  // Add page slug if it doesn't exist
  if (is_single() || is_page() && !is_front_page()) {
    if (!in_array(basename(get_permalink()), $classes)) {
      $classes[] = basename(get_permalink());
    }
  }

  // Add class if sidebar is active
  if (is_page_template( 'template-sidebar.php' )) {
    $classes[] = 'sidebar-primary';
  } elseif (is_page_template( 'template-full-width.php' )) {
    $classes[] = 'full-width';
  }

  return $classes;
}
add_filter('body_class', __NAMESPACE__ . '\\body_class');

/**
 * Clean up the_excerpt()
 */
function excerpt_more() {
  return ' &hellip; <a href="' . get_permalink() . '">' . __('Continued', 'janne') . '</a>';
}
add_filter('excerpt_more', __NAMESPACE__ . '\\excerpt_more');
