/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

module.exports = {
    title: 'My Site',
    tagline: 'The tagline of my site',
    url: 'https://your-docusaurus-test-site.com',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    favicon: 'img/favicon.ico',
    organizationName: 'facebook', // Usually your GitHub org/user name.
    projectName: 'docusaurus', // Usually your repo name.
    themeConfig: {
        navbar: {
            title: 'My Project',
            logo: {
                alt: 'My Project Logo',
                src: 'img/logo.svg'
            },
            items: [
                {
                    type: 'doc',
                    docId: 'doc1/doc1',
                    label: 'doc1',
                    position: 'left'
                },
                {
                    type: 'doc',
                    docId: 'doc2/doc1',
                    label: 'doc2',
                    position: 'left'
                }
            ]
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'Stack Overflow',
                            href: 'https://stackoverflow.com/questions/tagged/docusaurus'
                        },
                        {
                            label: 'Twitter',
                            href: 'https://twitter.com/docusaurus'
                        },
                        {
                            label: 'Discord',
                            href: 'https://discordapp.com/invite/docusaurus'
                        }
                    ]
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'Blog',
                            to: 'blog'
                        },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/facebook/docusaurus'
                        }
                    ]
                },
                {
                    title: 'Legal',
                    // Please do not remove the privacy and terms, it's a legal requirement.
                    items: [
                        {
                            label: 'Privacy',
                            href: 'https://opensource.facebook.com/legal/privacy/'
                        },
                        {
                            label: 'Terms',
                            href: 'https://opensource.facebook.com/legal/terms/'
                        }
                    ]
                }
            ],
            logo: {
                alt: 'Facebook Open Source Logo',
                src: 'img/logo.svg',
                href: 'https://opensource.facebook.com'
            },
            // Please do not remove the credits, help to publicize Docusaurus :)
            copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc. Built with Docusaurus.`
        }
    },
    plugins: [
        [
            require.resolve('@easyops-cn/docusaurus-search-local'),
            {
                // ... Your options.
                // `hashed` is recommended as long-term-cache of index file is possible.
                hashed: true,
                // For Docs using Chinese, The `language` is recommended to set to:
                // ```
                language: ['en', 'zh']
                // ```
                // When applying `zh` in language, please install `nodejieba` in your project.
            }
        ]
    ],
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js')
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css')
                },
                sidebarItemsGenerator: async function ({ defaultSidebarItemsGenerator, ...args }) {
                    return await defaultSidebarItemsGenerator(args)
                }
            }
        ]
    ]
}
