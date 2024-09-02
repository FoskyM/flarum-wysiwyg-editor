<?php

/*
 * This file is part of foskym/flarum-wysiwyg-editor.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoskyM\WysiwygEditor;

use Flarum\Extend;
use s9e\TextFormatter\Configurator;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),
    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Formatter)
        ->configure(function (Configurator $config) {
            $config->javascript->exports = ['parse', 'preview', 'tagsConfig', 'xsl', 'xslt'];
            // $tags = [];
            // foreach ($config->tags as $tagName => $tag) {
            //     $tags[$tagName] = $tag->template->__toString();
            // }
        }),
];
