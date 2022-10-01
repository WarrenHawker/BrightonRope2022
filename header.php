<!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo("charset"); ?>"> 
        <meta name="viewport" content="width=device-width", initial-scale="1";>
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
        <?php header('Access-Control-Allow-Origin: *');?>
        <?php wp_head();?>
        
    </head>

   

    <body <?php body_class('no-js'); ?>>

    <header>
        <nav class="top-nav">
            <div id="hamburger">&#9776;</div>
                <div class='logo-container'>
                    <?php if( has_custom_logo() ):  ?>
                        <?php 
                            $custom_logo_id = get_theme_mod( 'custom_logo' );
                            $custom_logo_data = wp_get_attachment_image_src( $custom_logo_id , 'full' );
                            $custom_logo_url = $custom_logo_data[0];
                        ?>

                        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" 
                        title="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>" 
                        rel="home">

                            <img src="<?php echo esc_url( $custom_logo_url ); ?>" 
                                alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>"/>

                        </a>
                    <?php else: ?>
                        <div class="site-name"><?php bloginfo( 'name' ); ?></div>
                    <?php endif; ?>
                </div>  
                    <?php 
                        wp_nav_menu( array(
                            'theme_location' => 'header'
                        ));
                    ?>
        </nav>
    </header>