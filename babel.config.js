module.exports = {
    presets: [['@vue/app', { useBuiltIns: 'usage' }]],
    plugins: [
        [
            'component',
            {
                libraryName: 'mint-ui',
                style: true,
            },
        ],
    ],
};
