<?php

/*
    Plugin Name: Quiz Block
    Description: A Gutenberg Block which allows to a Quiz and show it on the front-end.
    Version: 1.0
    Author: lilKriT
    Author URI: https://lilkrit.dev
*/

if (!defined("ABSPATH")) exit;

class QuizBlock
{
    function __construct()
    {
        add_action("init", array($this, "adminAssets"));
    }

    function adminAssets()
    {
        wp_register_script("quizBlockType", plugin_dir_url(__FILE__) . "build/index.js", array('wp-blocks', "wp-element"));
        // namespace and block name, array of options
        register_block_type("quizplugin/quizblock", array(
            "editor_script" => "quizBlockType",
            "render_callback" => array($this, "blockHTML")
        ));
    }

    function blockHTML($attributes)
    {
        ob_start(); ?>
        <p>Today the sky is <?php echo esc_html($attributes["skyColor"]) ?> and the grass is <?php echo esc_html($attributes["grassColor"]) ?>!?</p>
<?php return ob_get_clean();
    }
}

$quizBlock = new QuizBlock();
