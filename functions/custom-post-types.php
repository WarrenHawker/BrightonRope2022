<?php function brightonRopePostTypes() {
    register_post_type('event', array(
        'public' => true,
        'capability_type' => 'event',
        'map_meta_cap' => true,
        'supports' => array('title', 'editor', 'excerpt'),
        'has_archive' => true,
        'rewrite' => array('slug' => 'events'),
        'show_in_rest' => true, 
        //true uses new block editor, false uses classic editor
        'menu_icon' => 'dashicons-calendar-alt', 
        'labels' => array(
            'name' => 'Events',
            'add_new_item' => 'Add New Event',
            'edit_item' => 'Edit Event',
            'all_items' => 'All Events', 
            'singular_name' => 'Event'
        )
    )  );

    register_post_type('teachers', array(
        'public' => true,
        'capability_type' => 'teacher',
        'map_meta_cap' => true,
        'supports' => array('title', 'editor'),
        'show_in_rest' => true, 
        //true uses new block editor, false uses classic editor
        'menu_icon' => 'dashicons-groups', 
        'labels' => array(
            'name' => 'Teachers',
            'add_new_item' => 'Add New Teacher',
            'edit_item' => 'Edit Teacher',
            'all_items' => 'All Teachers', 
            'singular_name' => 'Teacher'
        )
    )  );

    register_post_type('venue', array(
        'public' => true,
        'capability_type' => 'venue',
        'map_meta_cap' => true,
        'supports' => array('title', 'editor', 'excerpt'),
        'has_archive' => true,
        'rewrite' => array('slug' => 'venues'),
        'show_in_rest' => true, 
        //true uses new block editor, false uses classic editor
        'menu_icon' => 'dashicons-location', 
        'labels' => array(
            'name' => 'Venues',
            'add_new_item' => 'Add New Venue',
            'edit_item' => 'Edit Venue',
            'all_items' => 'All Venues', 
            'singular_name' => 'Venue'
        )
    )  );
}