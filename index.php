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
        // importing css, you also have to add it in "register_block_type"
        wp_register_style("quizCSS", plugin_dir_url(__FILE__) . "build/index.css");

        // wp-editor is for TextControl
        wp_register_script("quizBlockType", plugin_dir_url(__FILE__) . "build/index.js", array('wp-blocks', "wp-element", "wp-editor"));
        // namespace and block name, array of options
        // If you use block.json, instead point to the folder
        register_block_type("quizplugin/quizblock", array(
            "editor_script" => "quizBlockType",
            "editor_style" => "quizCSS",
            "render_callback" => array($this, "blockHTML")
        ));
        // Much simpler with block.json ;)
    }

    function blockHTML($attributes)
    {
        // We load the CSS for the block here - this way, it will only load if we actually use it.
        if (!is_admin()) {
            wp_enqueue_script("quizFrontEnd", plugin_dir_url(__FILE__) . "build/frontend.js", array('wp-element'), "1.0", true);
            wp_enqueue_style("quizFrontEndStyles", plugin_dir_url(__FILE__) . "build/frontend.css");
        }

        ob_start(); ?>
        <div class="paying-attention-update-me">
            <pre style="display: none;"><?php echo wp_json_encode($attributes); ?></pre>
        </div>
<?php return ob_get_clean();
    }
}

$quizBlock = new QuizBlock();
