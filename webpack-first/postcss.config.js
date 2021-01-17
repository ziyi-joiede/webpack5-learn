module.exports = {
    plugins: function() {
        return [
            require('autoprefixer')({
                "overrideBrowserslist": [
                    ">0.25%",
                    "not dead"
                ]
            })
        ]
    }
}